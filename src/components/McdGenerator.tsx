import axios from "axios";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import interact from 'interactjs';
import Entity from "./mcdElements/Entity";
import Relation from './mcdElements/Relation';
import style from '@/styles/Home.module.css';

function McdGenerator({ updator, statesended }) {


    const [mcd_name, setMcdName] = useState("");
    const [relation_name, setRelationName] = useState("");
    const [mcd_uid, setMcdUid] = useState("");
    const [entity_name, setEntityName] = useState("");
    const [entity_id, setEntityId] = useState("");
    const position = { x: 0, y: 0 }
    const [entites, setEntites] = useState([]);

    const generateMcd = (mcd_nom) => {
        setMcdName(mcd_nom);
        var data = new FormData();
        data.append('mcd_name', mcd_nom);
        axios.post("http://localhost:8080/generateMcd", data, {
            headers: {
                'Content-Type': 'application/json',
            }
        }).then((res) => {
            console.log(res.data);
            setMcdUid(res.data);
            localStorage.setItem('mcd_uid', res.data);
        }).catch(error => {

        })
    }

    const createEntity = (entity) => {
        // Perform localStorage action
        const mcd = localStorage.getItem("mcd_uid");
        var data = new FormData();
        data.append("entity", entity);
        data.append("mcd", mcd);
        axios.post("http://localhost:8080/insertEntity", data, {
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => {
            console.log(res.data);
            getEntitesByMcd();
        })
    }

    const createRelation = (name: string, entity_one: string, entity_two: string, card_one: string, card_two: string) => {
        var data = new FormData();
        const mcd = localStorage.getItem("mcd_uid");
        data.append('mcd_uid', mcd);
        data.append('name', name);
        data.append('entity_one', entity_one);
        data.append('entity_two', entity_two);
        data.append('car_one', card_one);
        data.append('car_two', card_two);
        axios.post("http://localhost:8080/insertRelation", data, {
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => {
            console.log(res.data);
        })
    }

    const handleChangeRelationName = (e) => {
        setRelationName(e.target.value);
    }

    const createRelationDialog = () => {
        var entitesString = "";
        entites.forEach(element => {
            entitesString += "<option value='" + element.id + "'>" + element.name + "</option>";
            console.log(element);
        });
        Swal.fire({
            title: 'Création relation',
            width: 950,
            html: `
            <div class="d-flex flex-row w-50 my-4 mx-auto">
                <label class="w-50 mt-2">Nom de la relation</label>
                <input type="text" class="form-control w-50" id="relationName"/>
                </div>
            <div class="row my-4">
            <div class="col"><label class="mt-2">Cardinalité Entité une</label></div>
            <div class="col"><select id="cardOne" class="form-select"><option value="1,1">1,1</option><option>1,n</option><option>0,n</option></select></div>
            <div class="col"><label class="mt-2">Enité une</label></div>    
            <div class="col"><select id="entiteOne" class="form-select">`+ entitesString + `</select></div>
                </div>
                <div class="row my-4">
            <div class="col"><label class="mt-2">Cardinalité Entité deux</label></div>
            <div class="col"><select id="cardTwo" class="form-select"><option value="1,1">1,1</option><option>1,n</option><option>0,n</option></select></div>
            <div class="col"><label class="mt-2">Enité deux</label></div>    
            <div class="col"><select id="entiteTwo" class="form-select">`+ entitesString + `</select></div>
                </div>
            </div>`,
            showCancelButton: true,
            confirmButtonText: 'Créer',
        }).then((result) => {
            if (result.isConfirmed) {
                var relation = document.getElementById('relationName').value;
                var entity_one = document.getElementById('entiteOne').value;
                var entity_two = document.getElementById('entiteTwo').value;
                var card_one = document.getElementById('cardOne').value;
                var card_two = document.getElementById('cardTwo').value;
                createRelation(relation, entity_one, entity_two, card_one, card_two);
                Swal.fire({
                    title: "La relation a été créé avec succès",
                    text: "Relation " + relation + "Créer",
                    icon: "success"
                });

                getEntitesByMcd();

            }
        });

    }

    const getEntitesByMcd = () => {
        const mcd = localStorage.getItem("mcd_uid");
        axios.get("http://localhost:8080/getEntitesByMcd?mcd_uid=" + mcd).then(res => {

            setEntites(res.data);
            console.log(entites);
            updator();

        })
    }

    const generateMcdDialog = async () => {
        const { value: mcd_nom } = await Swal.fire({
            title: "Saisir le nom du MCD",
            input: "text",
            inputLabel: "Nom du MCD",
            inputPlaceholder: "Ex: Modéle de données de la banque"
        });
        if (mcd_nom) {
            Swal.fire({
                title: "Le MCD a été créé avec succès",
                text: mcd_nom,
                icon: "success"
            });
            generateMcd(mcd_nom);

        }
    }

    const generateEntityDialog = async () => {
        const { value: entity_nom } = await Swal.fire({
            title: "Saisir le nom de l'entité",
            input: "text",
            inputLabel: "Nom de l'entité",
            inputPlaceholder: "Ex: Personne"
        });
        if (entity_nom) {
            Swal.fire({
                title: "Entité a été créé avec succès",
                text: entity_nom,
                icon: "success"
            });
            createEntity(entity_nom);
        }
    }



    useEffect(() => {
        interact('.draggableEntity').draggable({
            inertia: true,
            modifiers: [
                interact.modifiers.restrictRect({
                    restriction: 'parent',
                    endOnly: true
                })
            ],
            listeners: {
                start(event) {

                    console.log(event.type, event.target)
                    console.log(event.target.style.transform);
                    const matrix = new DOMMatrix(event.target.style.transform);
                    position.x = matrix.m41;
                    position.y = matrix.m42;

                },
                move(event) {
                    const target = event.target;
                    const x = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx;
                    const y = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;

                    target.style.transform = `translate(${x}px, ${y}px)`;
                    target.setAttribute("data-x", x);
                    target.setAttribute("data-y", y);

                    var myentity = target;
                    var selectortwo = `[data-entityone="${target.getAttribute('data-myid')}"]`;
                    var selectorone = `[data-entitytwo="${target.getAttribute('data-myid')}"]`;
                    var elems = new Set([
                        ...document.querySelectorAll(selectorone),
                        ...document.querySelectorAll(selectortwo)
                    ]);

                    elems.forEach(element => {
                        var myrelation = element;
                        console.log(myrelation);
                        var myline = document.getElementById('line-' + target.getAttribute('data-myid') + "-" + myrelation.getAttribute("data-relation"));
                        updateLinePosition(myentity, myrelation, myline);
                    });






                },
                onend: () => {

                },
            }
        });

        interact('.draggableRelation').draggable({
            inertia: true,
            modifiers: [
                interact.modifiers.restrictRect({
                    restriction: 'parent',
                    endOnly: true
                })
            ],
            listeners: {
                start(event) {

                    console.log(event.type, event.target)
                    console.log(event.target.style.transform);
                    const matrix = new DOMMatrix(event.target.style.transform);
                    position.x = matrix.m41;
                    position.y = matrix.m42;

                },
                move(event) {
                    const target = event.target;
                    const x = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx;
                    const y = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;

                    target.style.transform = `translate(${x}px, ${y}px)`;
                    target.setAttribute("data-x", x);
                    target.setAttribute("data-y", y);
                    var myrelation = target;
                    var myentity1 = document.getElementById('entity-' + target.getAttribute("data-entityone"));
                    var myentity2 = document.getElementById('entity-' + target.getAttribute("data-entitytwo"));
                    var myline1 = document.getElementById('line-' + target.getAttribute("data-entityone") + "-" + target.getAttribute("data-relation"));
                    var myline2 = document.getElementById('line-' + target.getAttribute("data-entitytwo") + "-" + target.getAttribute("data-relation"));
                    updateLinePosition(myentity2, myrelation, myline2);
                    updateLinePosition(myentity1, myrelation, myline1);



                },
                onend: () => {

                },
            }
        });

        const updateLinePosition = (entity, relation, lineRelated) => {
            const entity1Rect = relation.getBoundingClientRect();
            const entity2Rect = entity.getBoundingClientRect();
            const line = lineRelated;

            const entity1CenterX = entity1Rect.left + entity1Rect.width / 2;
            const entity1CenterY = entity1Rect.top + entity1Rect.height / 2;
            const entity2CenterX = entity2Rect.left + entity2Rect.width / 2;
            const entity2CenterY = entity2Rect.top + entity2Rect.height / 2;

            const dx = entity2CenterX - entity1CenterX;
            const dy = entity2CenterY - entity1CenterY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const angle = Math.atan2(dy, dx) * 180 / Math.PI;

            // Adjust the line position to touch the edges of the entities
            let entity1EdgeX = entity1CenterX;
            let entity1EdgeY = entity1CenterY;
            let entity2EdgeX = entity2CenterX;
            let entity2EdgeY = entity2CenterY;

            // Check if the line touches both entities
            const lineTouchesEntity1 = isLineTouchingEntity(entity1CenterX, entity1CenterY, entity1Rect.width, entity1Rect.height, entity2CenterX, entity2CenterY, line);
            const lineTouchesEntity2 = isLineTouchingEntity(entity2CenterX, entity2CenterY, entity2Rect.width, entity2Rect.height, entity1CenterX, entity1CenterY, line);

            if (!lineTouchesEntity1 && !lineTouchesEntity2) {
                // Move the entities closer together
                const newDistance = Math.min(entity1Rect.width / 2 + entity2Rect.width / 2, entity1Rect.height / 2 + entity2Rect.height / 2);
                const newDx = dx * newDistance / distance;
                const newDy = dy * newDistance / distance;
                entity1EdgeX += newDx / 2;
                entity1EdgeY += newDy / 2;
                entity2EdgeX -= newDx / 2;
                entity2EdgeY -= newDy / 2;
            }

            line.style.width = `${distance}px`;
            line.style.transform = `rotate(${angle}deg)`;
            line.style.left = `${entity1EdgeX - 500}px`;
            line.style.top = `${entity1EdgeY - 200}px`;
        };

        const isLineTouchingEntity = (entityCenterX, entityCenterY, entityWidth, entityHeight, lineX, lineY, line) => {
            const entityLeft = entityCenterX - entityWidth / 2;
            const entityRight = entityCenterX + entityWidth / 2;
            const entityTop = entityCenterY - entityHeight / 2;
            const entityBottom = entityCenterY + entityHeight / 2;

            const lineLeft = Math.min(entityLeft, entityRight);
            const lineRight = Math.max(entityLeft, entityRight);
            const lineTop = Math.min(entityTop, entityBottom);
            const lineBottom = Math.max(entityTop, entityBottom);

            return lineX >= lineLeft && lineX <= lineRight && lineY >= lineTop && lineY <= lineBottom;
        };

        getEntitesByMcd();

    }, [statesended]);


    return (
        <>
            <div className="container-fluid w-50 mx-auto mt-5">


                <div className="d-flex flex-row justify-content-center my-3">

                    <button type="button" className="btn btn-success btn-lg mx-2" onClick={generateMcdDialog}>Créer un nouveau MCD</button>
                    <button type="button" className="btn btn-warning btn-lg mx-2">Modifier un MCD existant</button>



                </div>
            </div>

            <div className="card">
                <div className="card-header">
                    <div className="d-flex flex-row">
                        <a href="#" className="btn btn-info mx-2" onClick={generateEntityDialog}>Entité</a>
                        <a href="#" className="btn btn-primary mx-2" onClick={createRelationDialog}>Relation</a>
                        <h5 className="card-title">{mcd_name}</h5>
                    </div>
                </div>




                <div style={{ position: "relative" }}>

                    {entites.map((item) => (
                        <>
                            {console.log(item.relations.name)}

                            <div className="draggableEntity" key={item.id} id={'entity-' + item.id}
                                data-myid={item.id} style={{
                                    width: "100px",

                                    backgroundColor: "green",
                                    zIndex: 2001,
                                    cursor: "move",
                                }}
                            >
                                <Entity name={item.name} id={item.id} attributs={item.attributs} />
                            </div>
                            {item.relations.map((relationship) => (
                                <>
                                    <div className="draggableRelation" data-entitytwo={relationship.idEntityTwo} data-entityone={relationship.idEntityOne} key={relationship.id} data-relation={relationship.id} data-entity={item.id} id={'relation-' + item.id}
                                        style={{
                                            width: "100px",
                                            height: "50px",
                                            backgroundColor: "green",
                                            zIndex: 2001,
                                            cursor: "move",
                                        }}
                                    >
                                        <Relation name={relationship.name} />

                                    </div>
                                    <div
                                        id={"line-" + relationship.idEntityOne + "-" + relationship.id}

                                        style={{
                                            position: "absolute",
                                            height: "2px",
                                            backgroundColor: "black",
                                            transformOrigin: "left center",
                                            zIndex: 9,
                                        }}
                                    ></div>
                                    <div
                                        id={"line-" + relationship.idEntityTwo + "-" + relationship.id}

                                        style={{
                                            position: "absolute",
                                            height: "2px",
                                            backgroundColor: "black",
                                            transformOrigin: "left center",
                                            zIndex: 9,
                                        }}
                                    ></div>
                                </>
                            ))}

                        </>
                    ))}

                </div>


            </div>


        </>
    )
}
export default McdGenerator;