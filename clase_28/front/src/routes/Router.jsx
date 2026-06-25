import { createBrowserRouter } from "react-router";
import { lazy, Suspense } from "react"
import Layout from "../components/Layout";
import ProtectedRoute from "../components/ProtectedRoute";
import FileProcess from "../pages/FileProcess";
import Usuarios from "../pages/auth/Usuarios";
import Oauth from "../pages/auth/oauth";

const Login = lazy(() => import('../pages/auth/Login'))
const Registro = lazy(() => import('../pages/auth/Registro'))
const Logout = lazy(() => import('../pages/auth/Logout'))
const Pokemons = lazy(() => import('../pages/crud/Pokemons'))
const Detail = lazy(() => import('../pages/crud/Detail'))
const NewPokemon = lazy(() => import('../pages/crud/NewPokemon'))
const EditPokemon = lazy(() => import('../pages/crud/EditPokemon'))
const DeletePokemon = lazy(() => import('../pages/crud/DeletePokemon'))

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <ProtectedRoute element={<Pokemons />} rol={["user", "admin"]} />,
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/oauth",
        element: <Oauth />
      },      
      {
        path: "/registro",
        element: <Registro />
      },
      {
        path: "/detail/:idPokemon",
        element: <ProtectedRoute element={<Detail />} rol={["user", "admin"]} />
      },
      {
        path: "/usuarios",
        element: <ProtectedRoute element={<Usuarios />} rol={["admin"]} />
      },
      {
        path: "/nuevo-pokemon",
        element: <ProtectedRoute element={<NewPokemon />} rol={["admin"]} />
      },
      {
        path: "/editar-pokemon/:idPokemon",
        element: <ProtectedRoute element={<EditPokemon />} rol={["admin"]} />
      },
      {
        path: "/borrar-pokemon/:idPokemon",
        element: <ProtectedRoute element={<DeletePokemon />} rol={["admin"]} />
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