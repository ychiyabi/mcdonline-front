import axios from "axios";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faXmark } from "@fortawesome/free-solid-svg-icons";
function McdDetails({ updator, statesended }) {

    const [relations, setRelations] = useState([]);
    const [entites, setEntites] = useState([]);


    const getRelationsByMcd = () => {
        const mcd = localStorage.getItem("mcd_uid");
        axios.get("http://localhost:8080/getRelationsByMcd?mcd_uid=" + mcd, { withCredentials: true, }).then(res => {
            console.log(res.data);
            setRelations(res.data);
        })
    }

    const getEntitesByMcd = () => {
        const mcd = localStorage.getItem("mcd_uid");
        axios.get("http://localhost:8080/getEntitesByMcd?mcd_uid=" + mcd, { withCredentials: true, }).then(res => {
            console.log(res.data);
            setEntites(res.data);

        })
    }

    const deleteRelation = (id: Number) => {
        axios.get("http://localhost:8080/deleteRelation?id=" + id, { withCredentials: true, }).then(res => {
            console.log(res.data);
            getRelationsByMcd();
            updator();
        })
    }

    const deleteEntity = (id: Number) => {
        axios.get("http://localhost:8080/deleteEntity?id=" + id, { withCredentials: true, }).then(res => {
            console.log(res.data);
            getEntitesByMcd();
            updator();
        })
    }

    const deleteAttribut = (id: Number) => {
        axios.get("http://localhost:8080/deleteAttribut?id=" + id, { withCredentials: true, }).then(res => {
            console.log(res.data);
            getEntitesByMcd();
            updator();
        })
    }

    useEffect(() => {

        getRelationsByMcd();
        getEntitesByMcd();
    }, [statesended]);
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
                        {element.attributs.map((attr) =>
                            <>
                                <h6>{attr.name}<small className="mx-2 text-warning" onClick={(e) => { e.stopPropagation(); deleteAttribut(attr.id) }}><FontAwesomeIcon icon={faXmark} /></small></h6>
                            </>
                        )}

                    </li>
                ))}
            </ul>
        </>
    )

}
export default McdDetails;