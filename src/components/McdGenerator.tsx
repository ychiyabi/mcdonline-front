import axios from "axios";
import { useState } from "react";
function McdGenerator() {


    const [mcd_name, setMcdName] = useState("");
    const [mcd_uid, setMcdUid] = useState("");

    const generateMcd = () => {
        var data = new FormData();
        data.append('mcd_name', mcd_name);
        axios.post("http://localhost:8080/generateMcd", data, {
            headers: {
                'Content-Type': 'application/json',
            }
        }).then((res) => {
            console.log(res);
            setMcdUid(res.data);
            localStorage.setItem('mcd_uid', mcd_uid);
        }).catch(error => {

        })
    }

    const handleChange = (e) => {
        setMcdName(e.target.value);
    }

    return (
        <>
            <input type="text" className="form-control" onChange={handleChange} />
            <button type="button" className="btn btn-primary" onClick={generateMcd}>Generate</button>

        </>
    )
}
export default McdGenerator;