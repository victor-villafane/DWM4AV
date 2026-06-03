import { useContext } from "react"
import { Link } from "react-router"
import { Session } from "../contexts/SessionContext"

const NavBar = () => {
    // TODO Esto deberia ser un estado
    const session = JSON.parse(localStorage.getItem("session"))
    const usuario = useContext(Session)
    console.log(usuario.usuario)
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
                            usuario.usuario
                                ? <li className="nav-item">
                                    <Link className="nav-link" to="/logout">Logout</Link>
                                </li>
                                : <li className="nav-item">
                                    <Link className="nav-link" to="/login">Login</Link>
                                </li>
                        }
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default NavBar