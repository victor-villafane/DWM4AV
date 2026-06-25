import { Outlet } from "react-router"
import NavBar from "./NavBar"
import { Bounce, ToastContainer } from 'react-toastify';

const Layout = () => {
    return (
        <div className="container-fluid" >
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
            />
            <NavBar />
            <Outlet />
        </div>
    )
}

export default Layout