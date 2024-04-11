import axios from "axios";
import { useState, useEffect } from "react";
import interact from 'interactjs';
import Entity from "./mcdElements/Entity";

function EntityGenerator() {

    const [entity_name, setEntityName] = useState("");
    const [entity_id, setEntityId] = useState("");
    const position = { x: 0, y: 0 }
    const [entites, setEntites] = useState([]);

    const handleChange = (e) => {
        setEntityName(e.target.value);
    }
    const createEntity = () => {
        // Perform localStorage action
        const mcd = localStorage.getItem("mcd_uid");
        var data = new FormData();
        data.append("entity", entity_name);
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

    const createAttribute = () => {
        var data = new FormData();
        data.append("entite", entity_id);
        data.append("type", "Entier");
        data.append("name", "id");
        axios.post("http://localhost:8080/insertAttribut", data, {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true
        }).then(res => {

            console.log(res.data);
        })
    }




    useEffect(() => {
        interact('.draggable').draggable({
            listeners: {
                start(event) {
                    console.log(event.type, event.target)
                },
                move(event) {
                    position.x += event.dx
                    position.y += event.dy

                    event.target.style.transform =
                        `translate(${position.x}px, ${position.y}px)`
                },
            }
        })
    }, []);






    return (
        <>
            <input type="text" className="form-control" onChange={handleChange} />
            <button type="button" className="btn btn-primary" onClick={createEntity}>Generate</button>
            <button type="button" className="btn btn-primary" onClick={createAttribute}>Generate attribut</button>



            {entites.map((item) => (
                <div className="draggable" key={item.id}>
                    <Entity name="etudiant" />
                </div>
            ))}



        </>
    )
}
export default EntityGenerator;