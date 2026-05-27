import React from 'react'
import { useNavigate } from 'react-router'

const Login = () => {
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const email = e.target.email.value
    const pass = e.target.pass.value

    console.log({ email: email, password: pass })

    try {
      const res = await fetch("http://localhost:2026/api/usuarios/login", {
        headers: {
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({ email: email, password: pass })
      })

      if( res.status >= 400 ) throw new Error("No se pudo loguear")

      const usuario = await res.json()
      console.log(usuario)

      localStorage.setItem("session", JSON.stringify({ email: email }))
      localStorage.setItem("token", JSON.stringify(usuario.token))
      navigate("/")
    } catch (error) {
      console.log(error)
    }

  }

  return (
    <div className='container d-flex justify-content-center align-items-center vh-100' >
      <div className='card p-4 shadow' style={{ width: "350px" }} >
        <h2 className='text-center mb-4' >Iniciar session</h2>
        <form onSubmit={handleSubmit} >
          <div className='mb-3' >
            <label className='form-label' >Email</label>
            <input className='form-control' type="email" name='email' />
          </div>
          <div className='mb-3' >
            <label className='form-label' >Password</label>
            <input className='form-control' type="password" name='pass' />
          </div>
          <button className='btn btn-primary w-100' >Ingresar</button>
        </form>
      </div>
    </div>
  )
}

export default Login