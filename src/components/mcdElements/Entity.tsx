import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import AttributDialog from "../Dialogs/AttributDialog";
import { useState } from "react";
function Entity(props) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true);

    }



    const generateAttribut = (nom_attribut: any, is_primary: any) => {
        var data = new FormData();
        data.append("nom", nom_attribut);
        data.append("id_entite", props.id);
        data.append('is_primary', is_primary)
        console.log(props.id);
        axios.post(process.env.NEXT_PUBLIC_API_URI + "/insertAttribut", data, {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true
        }).then((res) => {
            console.log(res.data);
            props.updator();
            props.updatemyaprent();
        })
            .catch((res) => {
                console.log(res.data);
            })
    }



    return (
        <>
            <AttributDialog onConfirm={generateAttribut} show={show} handleClose={handleClose} />
            <div className="header h4 text-white">{props.name}

            </div>
            <div className="row">
                {<div className="col">
                    <ul>
                        {props.attributs.map((attr) =>
                            <li key={attr.id}>{attr.name}</li>
                        )}
                    </ul>
                    <div className="ms-2 mb-3 cursor-pointer"><a onClick={(e) => { e.stopPropagation(); handleShow(); }}><FontAwesomeIcon icon={faPlus} />{"<<Ajouter attribut>>"}</a></div>
                </div>}
            </div >
        </>
    )
}
export default Entity;