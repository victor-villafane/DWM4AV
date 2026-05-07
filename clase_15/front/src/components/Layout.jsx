import { Link, Outlet } from "react-router"

const Layout = () => {
    return (
        <>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/dogs">Dogs</Link>
                <Link to="/app">App</Link>
            </nav>
            <Outlet />
            <footer></footer>
        </>
    )
}

export default Layout