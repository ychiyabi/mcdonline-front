import axios from "axios";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from "@fortawesome/free-solid-svg-icons";
function McdDetails() {

    const [relations, setRelations] = useState([]);
    const [entites, setEntites] = useState([]);


    const getRelationsByMcd = () => {
        const mcd = localStorage.getItem("mcd_uid");
        axios.get("http://localhost:8080/getRelationsByMcd?mcd_uid=" + mcd).then(res => {
            console.log(res.data);
            setRelations(res.data);
        })
    }

    const getEntitesByMcd = () => {
        const mcd = localStorage.getItem("mcd_uid");
        axios.get("http://localhost:8080/getEntitesByMcd?mcd_uid=" + mcd).then(res => {
            console.log(res.data);
            setEntites(res.data);

        })
    }

    const deleteRelation = (id: Number) => {
        axios.get("http://localhost:8080/deleteRelation?id=" + id).then(res => {
            console.log(res.data);
            getRelationsByMcd();
        })
    }

    const deleteEntity = (id: Number) => {
        axios.get("http://localhost:8080/deleteEntity?id=" + id).then(res => {
            console.log(res.data);
            getEntitesByMcd();
        })
    }

    useEffect(() => {
        getRelationsByMcd();
        getEntitesByMcd();
    }, []);
    return (
        <>
            <ul>
                {relations.map((element) => (
                    <li key={element.id} className="h5 text-white">
                        {element.name}<span className="mx-2 text-danger" onClick={(e) => { e.stopPropagation(); deleteRelation(element.id) }}>
                            <FontAwesomeIcon icon={faTrash} />
                        </span>
                    </li>
                ))}
            </ul >

            <ul>
                {entites.map((element) => (
                    <li key={element.id} className="h5 text-white">
                        {element.name}<span className="mx-2 text-danger" onClick={(e) => { e.stopPropagation(); deleteEntity(element.id) }}>
                            <FontAwesomeIcon icon={faTrash} />
                        </span>
                    </li>
                ))}
            </ul>
        </>
    )

}
export default McdDetails;