import axios from "axios";
import { useState } from "react";
function Entity(props) {


    return (
        <>
            {props.name}
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