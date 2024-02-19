import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
function Entity(props) {

    const [attributes, setAttributes] = useState([]);

    const getAllAttributes = async () => {
        axios.get('http://localhost:8080/getEntityById?id=' + props.id)
            .then(response => {
                setAttributes(response.data);
                console.log(response.data);
                console.log(attributes);

            })
    }

    const createAttributDialog = async () => {
        const { value: nom_attribut } = await Swal.fire({
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
            }
        }).then((res) => {
            console.log(res.data);
        })
            .catch((res) => {
                console.log(res.data);
            })
    }

    useEffect(() => {
        getAllAttributes();
    }, []);

    return (
        <>
            {props.name} <a onClick={createAttributDialog}>Add attribut</a>
            <hr />
            <div className="row">
                {/* <div className="col">
                    <ul>
                        {attributes.attributs.map((attr) =>
                            <li>{attr.name}</li>
                        )}
                    </ul>
                </div> */}
            </div>
        </>
    )
}
export default Entity;