import axios from "axios";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import interact from 'interactjs';
import Entity from "./mcdElements/Entity";

function McdGenerator() {


    const [mcd_name, setMcdName] = useState("");
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

    const getEntitesByMcd = () => {
        const mcd = localStorage.getItem("mcd_uid");
        axios.get("http://localhost:8080/getEntitesByMcd?mcd_uid=" + mcd).then(res => {
            console.log(res.data);
            setEntites(res.data);
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
                    position.x += event.dx
                    position.y += event.dy


                    event.target.style.transform =
                        `translate(${position.x}px, ${position.y}px)`
                },
                onend: () => {
                    // Handle drag end if needed
                },
            }
        })
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
                            <a href="#" className="btn btn-primary mx-2">Relation</a>
                        </div>

                    </div>

                </div>
                <div className="card-body">

                    {entites.map((item) => (
                        <div className="draggable" key={item.id}>
                            <Entity name={item.name} />
                        </div>
                    ))}

                </div>
            </div>



        </>
    )
}
export default McdGenerator;