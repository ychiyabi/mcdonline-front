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
            generateAttribut(nom_attribut);

        }
    }

    const generateAttribut = (nom_attribut: any) => {
        var data = new FormData();
        data.append("nom", nom_attribut);
        data.append("id_entite", props.id);
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