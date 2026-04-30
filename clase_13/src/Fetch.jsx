import React, { useState } from 'react'

const Fetch = () => {
    const [url, setUrl] = useState("")
    const [razas, setRazas] = useState([])
    const [ razaSeleccionada, setRazaSeleccionada ] = useState("")

    const handleClick = () => {
        fetch(`https://dog.ceo/api/breed/${razaSeleccionada}/images/random`)
            .then(res => res.json())
            .then(data => setUrl(data.message))
    }

    const handleRaza = () => {
        fetch("https://dog.ceo/api/breeds/list/all")
            .then(res => res.json())
            .then(data => setRazas( Object.keys(data.message) ))
    }

    const handleSelect = (event) => {
        setRazaSeleccionada(event.target.value)
    }

    return (
        <div>
            <div>
                {
                    url && <img src={url} alt="" width={200} />
                }
            </div>
            <div>
                <select onChange={handleSelect} >
                    {
                        razas.map( raza => <option key={raza} value={raza}>{raza}</option> )
                    }
                </select>
            </div>
            <button onClick={handleClick} >Fetch</button>
            <button onClick={handleRaza} >Fetch Raza</button>
        </div>
    )
}

export default Fetch