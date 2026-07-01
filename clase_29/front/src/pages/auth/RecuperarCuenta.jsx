import { useState } from "react"

const RecuperarCuenta = () => {

    const [correcto, setCorrecto] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        const email = e.target.email.value

        fetch(import.meta.env.VITE_API_URL + "/api/usuarios/recuperar-cuenta", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: email })
        })
            .then(res => {
                if (res.ok) {
                    return res.json()
                } else {
                    throw new Error("No se pudo enviar")
                }
            })
            .then( data => setCorrecto(true) )
            .catch( err => console.log("No se pudo enviar") )
    }

    return (
        <div className='container d-flex justify-content-center align-items-center vh-100' >
            { correcto && <div>Email enviado!</div> }
            <div className='card p-4 shadow' style={{ width: "350px" }} >
                <h2 className='text-center mb-4' >Ingresar correo</h2>
                <form onSubmit={handleSubmit} className='mb-3'>
                    <div className="mb-2">
                        <input className="form-control" type="text" name="email" />
                    </div>
                    <button className="btn btn-primary w-100"  >Ingresar</button>
                </form>
            </div>
        </div>
    )
}

export default RecuperarCuenta