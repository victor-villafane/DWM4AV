import { Link } from "react-router"
import { useRol, useUsuario } from "../contexts/SessionContext"

const NavBar = () => {

    const usuario = useUsuario()
    const rol = useRol()
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">Navbar</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                        {
                            usuario
                                ? <li className="nav-item">
                                    <Link className="nav-link" to="/logout">Logout</Link>
                                    { rol == "admin" && <Link className="nav-link" to="/usuarios">Usuarios</Link>}
                                </li>
                                : <>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/login">Login</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/registro">Registro</Link>
                                    </li>
                                </>
                        }
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default NavBar