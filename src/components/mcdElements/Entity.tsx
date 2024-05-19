import axios from "axios";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import AttributDialog from "../Dialogs/AttributDialog";
import { useState } from "react";
function Entity(props) {
    const [show, setShow] = useState(false);
    const [functionExcute, setFunctionExecute] = useState("");
    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true);

    }




    const createAttributDialog = async () => {
        Swal.fire({
            title: "Nom de l'attribut",
            html: `
            <div class='row'><div class='col-8'>L'attribut est une clé primaire ?</div>
            <div class='col-3'><div class='form-check form-switch'><input id='isPrimary' class='form-check-input' type='checkbox' role='switch' value='1'/></div>
            </div>
            <div class='col-8'>Libellé attribut </div><div class='col'><input id="attributValue" type="text" class="form-control w-50" id="relationName"/></div>
            </div>`,
            showCancelButton: true,
            confirmButtonText: 'Créer',
        }).then((result) => {
            if (result.isConfirmed) {
                var checkbox = document.getElementById('isPrimary');
                var attribut = document.getElementById('attributValue').value;
                var primaryValue = 0;
                if (checkbox.checked) {
                    primaryValue = 1;
                }
                else {
                    primaryValue = 0;
                }
                console.log(primaryValue);
                generateAttribut(attribut, primaryValue);
            }

        });
    }



    const generateAttribut = (nom_attribut: any, is_primary: any) => {
        var data = new FormData();
        data.append("nom", nom_attribut);
        data.append("id_entite", props.id);
        data.append('is_primary', is_primary)
        console.log(props.id);
        axios.post("http://localhost:8080/insertAttribut", data, {
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