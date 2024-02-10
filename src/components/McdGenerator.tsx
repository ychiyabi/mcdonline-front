import axios from "axios";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import interact from 'interactjs';
import Entity from "./mcdElements/Entity";
import Relation from './mcdElements/Relation';
import style from '@/styles/Home.module.css';

function McdGenerator() {


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
            console.log(res.data);
            setEntites(res.data);
            organiserMcd();

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

    const calculateCenter = (div) => {
        var rect = div.getBoundingClientRect();
        var centerX = rect.left + rect.width / 2;
        var centerY = rect.top + rect.height / 2;
        return { x: centerX, y: centerY };
    }

    const organiserMcd = () => {
        entites.forEach(element => {
            element.relations.forEach(relation => {
                var rel = calculateCenter(document.getElementById('relation-' + relation.id));
                var ent = calculateCenter(document.getElementById('entity-' + element.id));
                var line = document.getElementById("line-" + element.id + "-" + relation.id);
                line.setAttribute("x1", ent.x);
                line.setAttribute("y1", ent.y);
                line.setAttribute("x2", rel.x);
                line.setAttribute("y2", rel.y);
                console.log(line);

            });
        })
    }

    useEffect(() => {
        interact('.draggable').draggable({
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
                    position.x += event.dx;
                    position.y += event.dy;

                    organiserMcd();
                    event.target.style.transform =
                        `translate(${position.x}px, ${position.y}px)`;




                },
                onend: () => {

                },
            }
        });

    }, []);


    return (
        <>

            <div className="container-fluid w-50 mx-auto mt-5">


                <div className="d-flex flex-row justify-content-center my-3">

                    <button type="button" className="btn btn-success btn-lg mx-2" onClick={generateMcdDialog}>Créer un nouveau MCD</button>
                    <button type="button" className="btn btn-warning btn-lg mx-2">Modifier un MCD existant</button>



                </div>
            </div>
            <div className="card border-0 w-75 mx-auto">
                <div className="card-header">
                    <div className="d-flex flex-row justify-content-between">
                        <h5 className="card-title">{mcd_name}</h5>
                        <div className="d-flex flex-row">
                            <a href="#" className="btn btn-info mx-2" onClick={generateEntityDialog}>Entité</a>
                            <a href="#" className="btn btn-primary mx-2" onClick={createRelationDialog}>Relation</a>
                        </div>

                    </div>

                </div>
                <div className="card-body">

                    {entites.map((item) => (
                        <>
                            {console.log(item.relations.name)}

                            <div className="draggable" key={item.id} id={'entity-' + item.id}>
                                <Entity name={item.name} />
                            </div>
                            {item.relations.map((relationship) => (
                                <>
                                    <div className="draggable" key={relationship.id} id={'relation-' + relationship.id}>
                                        <Relation name={relationship.name} />

                                    </div>
                                    <svg className='svgContainer'><line id={"line-" + item.id + "-" + relationship.id} x1="3" y1="20" x2="30" y2="50" stroke="black" /></svg >
                                </>
                            ))}

                        </>
                    ))}

                </div>
            </div >



        </>
    )
}
export default McdGenerator;