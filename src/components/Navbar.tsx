function Navbar() {

    return (
        <>

            <nav className="navbar navbar-light customized-navbar">
                <div className="container-fluid">
                    <span className="navbar-brand mb-0 h1 text-white">Mcd Online</span>
                    <a href="http://localhost:8080/oauth2/authorization/google">Authenticate</a>
                </div>
            </nav>
        </>
    )
}
export default Navbar;