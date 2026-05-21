import { createBrowserRouter } from "react-router";
import { lazy, Suspense } from "react"
import Layout from "../components/Layout";
import Detalle from "../pages/Detalle";
import ProtectedRoute from "../components/ProtectedRoute";
// import Logout from "../pages/Logout";
// import Home from '../pages/Home';
// import Login from '../pages/Login';

const Home = lazy(  () => import('../pages/Home') )
const Login = lazy(  () => import('../pages/Login') )
const Logout = lazy(  () => import('../pages/Logout') )

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <ProtectedRoute element={<Home />} />,
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/detalle/:id",
        element: <ProtectedRoute element={<Detalle />} />
      },
      {
        path: "/logout",
        element: <Logout />
      }
    ]
  }
]);

export default router