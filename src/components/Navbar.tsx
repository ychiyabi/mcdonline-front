import axios from "axios";
import { useEffect, useState } from "react";
function Navbar() {

    const [list, setList] = useState([]);
    const [email, setEmail] = useState("");
    const listMcd = () => {
        axios.get(process.env.NEXT_PUBLIC_API_URI + "/getListMcd", { withCredentials: true, }).then(res => {
            console.log(res);
            setList(res.data);
        })
            .catch(error => {
                console.log("error");
            })
    }
    const EmailConnected = () => {
        axios.get(process.env.NEXT_PUBLIC_API_URI + "/getUserEmail", { withCredentials: true, }).then(res => {
            console.log(res);
            setEmail(res.data);
        })
            .catch(error => {
                console.log("error");
            })
    }

    const handleClickElement = (event) => {
        const slug = event.target.getAttribute('data-slug');
        getMcdBySlug(slug);
    }
    const getMcdBySlug = (slug) => {
        axios.get(process.env.NEXT_PUBLIC_API_URI + "/getMcdBySlug?slug=" + slug, { withCredentials: true, }).then(res => {
            console.log(res);
            localStorage.setItem('mcd_uid', res.data.uuid);
            window.location.reload();

        })
            .catch(error => {
                console.log("error");
            })
    }
    useEffect(() => {
        listMcd();
        EmailConnected();
    }, [])
    return (
        <>

            <nav className="navbar navbar-light customized-navbar">
                <div className="container-fluid">

                    <span className="navbar-brand mb-0 h1 text-white">Mcd Online</span>
                    <a href="http://localhost:8080/oauth2/authorization/google">Authenticate</a>

                    <div className="btn-group mx-5">
                        <button type="button" className="btn customized-navbar dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                            Mon compte
                        </button>
                        <ul className="dropdown-menu">
                            <li><a className="dropdown-item" href="#">{email}</a></li>
                            <li><hr className="dropdown-divider" /></li>
                            <li><h6 className="ms-5">Mes MCD</h6></li>
                            {list.map(function (data) {
                                return (<li><a className="dropdown-item" onClick={handleClickElement} data-slug={data.slug} href="#">{data.name}</a></li>)
                            })}

                            <li><hr className="dropdown-divider" /></li>
                            <li><a className="dropdown-item" href="#">Se déconnecter</a></li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}
export default Navbar;