import axios from "axios";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faXmark } from "@fortawesome/free-solid-svg-icons";
import ConfirmationModal from "./Dialogs/ConfirmationModal";
function McdDetails({ updator, statesended }) {

    const [relations, setRelations] = useState([]);
    const [entites, setEntites] = useState([]);
    const [show, setShow] = useState(false);
    const [functionExcute, setFunctionExecute] = useState("");
    const [idElement, setIdEelement] = useState(0);
    const [messageConfirm, setMessageConfirm] = useState("");

    const handleClose = () => setShow(false);
    const handleShow = (id: any, fonction: string, message: string) => {
        setShow(true);
        setFunctionExecute(fonction);
        setIdEelement(id);
        setMessageConfirm(message);

    }

    const onConfirm = () => {

        switch (functionExcute) {
            case "deleteRelation":
                deleteRelation(idElement);
            case "deleteEntity":
                deleteEntity(idElement);
            case "deleteAttribut":
                deleteAttribut(idElement);
        }
        handleClose();
    }

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
            <ConfirmationModal onConfirm={onConfirm} show={show} handleClose={handleClose} message={messageConfirm} />
            <div className="h4 text-white d-flex justify-content-center mb-2 mt-3">Liste associations</div>
            <ul>
                {relations.map((element) => (
                    <li key={element.id} className="h5 text-white">
                        {element.name}<span className="mx-2 text-danger" onClick={(e) => { e.stopPropagation(); handleShow(element.id, "deleteRelation", "Voulez-vous supprimer l'association " + element.name + ""); }}>
                            <FontAwesomeIcon className="cursor-pointer" icon={faTrash} />
                        </span>
                    </li>
                ))}
            </ul >
            <hr className="text-white" />

            <div className="h4 text-white d-flex justify-content-center mb-2">Liste entité</div>
            <ul>
                {entites.map((element) => (
                    <li key={element.id} className="h5 text-white">
                        {element.name}<span className="mx-2 text-danger" onClick={(e) => { e.stopPropagation(); handleShow(element.id, "deleteEntity", "Voulez-vous supprimer l'entité " + element.name + ""); }}>
                            <FontAwesomeIcon className="cursor-pointer" icon={faTrash} />
                        </span>
                        {
                            element.attributs.map((attr) =>
                                <>
                                    <h6>{attr.name}<small className="mx-2 text-warning" onClick={(e) => { e.stopPropagation(); handleShow(attr.id, "deleteAttribut", "Voulez-vous supprimer l'attribut " + attr.name + ""); }}><FontAwesomeIcon className="cursor-pointer" icon={faXmark} /></small></h6 >
                                </>
                            )}

                    </li >
                ))
                }
            </ul >
        </>
    )

}
export default McdDetails;