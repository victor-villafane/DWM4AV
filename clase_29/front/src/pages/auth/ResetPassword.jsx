import { useState } from "react"
import { Navigate, useNavigate, useParams } from "react-router"

const ResetPassword = () => {
    const [correcto, setCorrecto] = useState(false)
    const params = useParams()
    const navigate = useNavigate()
    const token = params?.token

    if (!token) return <Navigate to="/" />

    const handleSubmit = (e) => {
        e.preventDefault()
        const pass = e.target.pass.value
        const passConfirm = e.target.passConfirm.value
        fetch(import.meta.env.VITE_API_URL + "/api/usuarios/reset-password?token=" + token,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ pass: pass, passConfirm: passConfirm })
            }
        )
            .then(res => {
                if (!res.ok) throw new Error("No se pudo hacer un reset")
                return res.json()
            })
            .then(() => {
                navigate("/login")
            })
            .catch(err => console.log(err))
    }

    return (
        <div className='container d-flex justify-content-center align-items-center vh-100' >
            {correcto && <div>Email enviado!</div>}
            <div className='card p-4 shadow' style={{ width: "350px" }} >
                <h2 className='text-center mb-4' >Ingresar Nueva Contraseña</h2>
                <form onSubmit={handleSubmit} className='mb-3'>
                    <div className="mb-2">
                        <label className="form-label">Ingresar Contraseña</label>
                        <input className="form-control" type="text" name="pass" />
                    </div>
                    <div className="mb-2">
                        <label className="form-label">Repetir Contraseña</label>
                        <input className="form-control" type="text" name="passConfirm" />
                    </div>
                    <button className="btn btn-primary w-100"  >Ingresar</button>
                </form>
            </div>
        </div>
    )
}

export default ResetPassword