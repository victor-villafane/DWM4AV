import React, { useState } from 'react'
// rafce
const App = () => {
  // let unaVariable = "Hola soy una variable"
  const [ unaVariable, setUnaVariable ] = useState("Hola soy una variable")
  const array = [
    {
      id: 1,
      nombre: "Homero",
      apellido: "Simpson"
    },
    {
      id: 2,
      nombre: "Marge",
      apellido: "Simpson"
    }
  ]

  const handleClick = () => {
    console.log("Click")
    setUnaVariable("cambie de valor")
    console.log(unaVariable)
  }
  console.log("renderizado")
  return (
    <div>
      { unaVariable }
      <ul>
      { array.map( personaje => <li>{ personaje.nombre }</li> ) }
      </ul>
      <button onClick={ handleClick } >Click!</button>
    </div>
  )
}

export default App