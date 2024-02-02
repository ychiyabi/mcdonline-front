import axios from "axios";
import { useState } from "react";
function Entity(props){

    const [name,setName]=useState("");
    axios.get("http://localhost:8080/getEntityById/"+props.id, {
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => {
            setName(res.data.name);
            console.log(res.data);
        })

    return(
        <>
         {props.name} 
        <hr/>
        <div className="row">
            <div className="col">
                Attribue
            </div>
        </div>
        </>
    )
}
export default Entity;