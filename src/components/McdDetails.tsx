import axios from "axios";
import { useEffect, useState } from "react";
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

    useEffect(() => {
        getRelationsByMcd();
        getEntitesByMcd();
    }, [])
    return (
        <>
            <ul>
                {relations.map((element) => (
                    <li className="h5 text-white">
                        {element.name}
                    </li>
                ))}
            </ul>

            <ul>
                {entites.map((element) => (
                    <li className="h5 text-white">
                        {element.name}
                    </li>
                ))}
            </ul>
        </>
    )

}
export default McdDetails;