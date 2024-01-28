import axios from "axios";
import { useState } from "react";
function EntityGenerator() {

    const [entity_name, setEntityName] = useState("");
    const mcd = localStorage.getItem("mcd_uid");
    const handleChange = (e) => {
        setEntityName(e.target.value);
    }
    const createEntity = () => {
        var data = new FormData();
        data.append("entity", entity_name);
        data.append("mcd", mcd);
        axios.post("http://localhost:8080/insertEntity", data, {
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => {

            console.log(res.data);

        })
    }


    return (
        <>
            <input type="text" className="form-control" onChange={handleChange} />
            <button type="button" className="btn btn-primary" onClick={createEntity}>Generate</button>
        </>
    )
}
export default EntityGenerator;