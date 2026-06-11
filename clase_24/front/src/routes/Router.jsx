import { createBrowserRouter } from "react-router";
import { lazy, Suspense } from "react"
import Layout from "../components/Layout";
import ProtectedRoute from "../components/ProtectedRoute";
import FileProcess from "../pages/FileProcess";

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
        path: "/nuevo-pokemon",
        element: <ProtectedRoute element={<NewPokemon />} />
      },
      {
        path: "/editar-pokemon/:idPokemon",
        element: <ProtectedRoute element={<EditPokemon />} />
      },
      {
        path: "/borrar-pokemon/:idPokemon",
        element: <ProtectedRoute element={<DeletePokemon />} />
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