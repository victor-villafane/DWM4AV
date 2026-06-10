import { createBrowserRouter } from "react-router";
import { lazy, Suspense } from "react"
import Layout from "../components/Layout";
import ProtectedRoute from "../components/ProtectedRoute";
import FileProcess from "../pages/FileProcess";

const Login = lazy(() => import('../pages/Login'))
const Registro = lazy(() => import('../pages/Registro'))
const Logout = lazy(() => import('../pages/Logout'))
const Pokemons = lazy(() => import('../pages/Pokemons'))
const Detail = lazy(() => import('../pages/Detail'))

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <ProtectedRoute element={<Pokemons />} />,
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/registro",
        element: <Registro />
      },      
      {
        path: "/detail/:idPokemon",
        element: <ProtectedRoute element={<Detail />} />
      },
      {
        path: "/logout",
        element: <Logout />
      },
      {
        path: "/export",
        element: <FileProcess />
      }
    ]
  }
]);

export default router