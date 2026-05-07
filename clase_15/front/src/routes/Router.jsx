import { createBrowserRouter } from "react-router"
import { lazy, Suspense } from 'react'
import Layout from "../components/Layout.jsx"

const App = lazy(() => import('../pages/App.jsx'))
const Fetch = lazy(() => import('../pages/Fetch.jsx'))
const Pokemons = lazy(() => import('../pages/Pokemons.jsx'))
const Detail = lazy(() => import('../pages/Detail.jsx'))

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <Pokemons />,
            },
            {
                path: "/dogs",
                element: <Fetch />
            },
            {
                path: "/app",
                element: <App />
            },
            {
                path: "/detail/:idPokemon",
                element: <Detail />
            }
        ]
    }
]);