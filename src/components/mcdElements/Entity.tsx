import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
function Entity(props) {

    const [attributes, setAttributes] = useState([]);

    const getAllAttributes = () => {
        axios.get(`http://localhost:8080/api/entities/${props.id}/attributes`)
            .then(response => {
                setAttributes(response.data);
            })
    }

    const createAttributDialog = async () => {
        const { value: nom_attribut } = await Swal.fire({
            title: "Nom de l'attribut",
            input: "text",
            html: "<div class='row'><div class='col-8'>L'attribut est une clé primaire ?</div><div class='col-3'><div class='form-check form-switch'><input id='isPrimary' class='form-check-input' type='checkbox' role='switch' value='1'/></div></div></div>",
            inputPlaceholder: "Ex: Num_etudiant"
        });
        if (nom_attribut) {
            Swal.fire({
                title: "Le MCD a été créé avec succès",
                text: nom_attribut,
                icon: "success"
            });
            var checkbox = document.getElementById('isPrimary').value;
            console.log(checkbox);
            generateAttribut(nom_attribut, checkbox);

        }
    }

    const generateAttribut = (nom_attribut: any, is_primary: any) => {
        var data = new FormData();
        data.append("nom", nom_attribut);
        data.append("id_entite", props.id);
        data.append('is_primary', is_primary)
        axios.post("http://localhost:8080/insertAttribut", data).then((res) => {
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
                <div className="col">
                    Attribue
                </div>
            </div>
        </>
    )
}
export default Entity;