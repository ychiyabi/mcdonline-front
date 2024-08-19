import axios from "axios";
import { useEffect } from "react";
import Image from 'next/image'
import { Card } from "react-bootstrap/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
function Main({ etatDeRetour }) {



    const isAuthenticated = () => {
        axios.get(process.env.NEXT_PUBLIC_API_URI + "/getGoogleUser", { withCredentials: true, }).then(res => {
            etatDeRetour(true);
        })
            .catch(error => {
                etatDeRetour(false);
            })
    }


    useEffect(() => {
        isAuthenticated();
    }, [])
    return (
        <>
            <div className="dflex justify-content-center mt-5">
                <div className="card w-25 mx-auto mt-5 ">


                    <div className="card-body">
                        <h3 className="card-title">MCDONLINE</h3>
                        <h5 className="card-subtitle mb-2 text-muted mb-3">Cette application est en Beta test</h5>
                        <p>Simple application permettant la création des modèles conceptuel de données</p>
                        <p>En utilisant votre compte google vous pouvez commencer en cliquant sur le button ci-dessous</p>
                        <a href={process.env.NEXT_PUBLIC_API_URI + "/oauth2/authorization/google"} className="btn btn-success btn-lg text-white mx-auto mt-2">Créer MCD <FontAwesomeIcon className="mx-2" icon={faGoogle} /></a>
                    </div>
                </div>
            </div >
        </>
    )
}
export default Main;