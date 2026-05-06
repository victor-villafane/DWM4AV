import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
import "bootstrap/dist/css/bootstrap.min.css"
// import App from './App.jsx'
// import Fetch from './Fetch.jsx'
import Pokemons from './Pokemons.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Pokemons />
  </StrictMode>,
)
