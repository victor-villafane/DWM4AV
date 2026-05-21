import React from 'react'
import { useNavigate } from 'react-router'

const Login = () => {
  const navigate = useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault()
    const email = e.target.email.value
    const pass = e.target.pass.value

    console.log({ email: email, password: pass })
    localStorage.setItem("session", JSON.stringify({ email: email, password: pass }))
    navigate("/")
  }

  return (
    <div className='container d-flex justify-content-center align-items-center vh-100' >
      <div className='card p-4 shadow' style={ { width: "350px" } } >
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