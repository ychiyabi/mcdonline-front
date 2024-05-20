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
    useEffect(() => {
        listMcd();
        EmailConnected();
    }, [])
    return (
        <>

            <nav className="navbar navbar-light customized-navbar">
                <div className="container-fluid">
                    <div className="btn-group">
                        <button type="button" className="btn btn-danger dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                            Action
                        </button>
                        <ul className="dropdown-menu">
                            <li><a className="dropdown-item" href="#">{email}</a></li>
                            <li><hr className="dropdown-divider" /></li>
                            <li><h6 className="ms-5">Mes MCD</h6></li>
                            {list.map(function (data) {
                                return (<li><a className="dropdown-item" href="#">{data.name}</a></li>)
                            })}

                            <li><hr className="dropdown-divider" /></li>
                            <li><a className="dropdown-item" href="#">Logout</a></li>
                        </ul>
                    </div>
                    <span className="navbar-brand mb-0 h1 text-white">Mcd Online</span>
                    <a href="http://localhost:8080/oauth2/authorization/google">Authenticate</a>
                </div>
            </nav>
        </>
    )
}
export default Navbar;