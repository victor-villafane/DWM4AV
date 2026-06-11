import { Outlet } from "react-router"
import NavBar from "./NavBar"

const Layout = () => {
    return (
        <div className="container-fluid" >
            <NavBar />
            <Outlet />
        </div>
    )
}

export default Layout