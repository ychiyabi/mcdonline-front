import axios from "axios";
import { useEffect } from "react";
import Carousel from 'react-bootstrap/Carousel';
import Image from 'next/image'
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
            <div className="dflex justify-content-center">
                <Carousel>
                    <Carousel.Item>
                        <Image
                            src="/caroussel.png"
                            width={1000}
                            height={500}
                            alt="Picture of the author"
                        />
                        <Carousel.Caption>
                            <h3>First slide label</h3>
                            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </div>
        </>
    )
}
export default Main;