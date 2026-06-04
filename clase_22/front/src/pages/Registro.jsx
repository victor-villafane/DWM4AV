import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router'
import { useAuthService } from '../services/auth.service'

const Registro = () => {
  const navigate = useNavigate()
  const [err, setErr] = useState(false)
  const { register: registroService } = useAuthService()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const email = e.target.email.value
    const pass = e.target.pass.value
    const passConfirm = e.target.passConfirm.value

    if (email == "" || pass == "" || passConfirm == "") {
      setErr(true)
      return
    }
    setErr(false)
    registroService(email, pass, passConfirm)
      .then(usuario => {
        navigate("/login")
      })
      .catch(error => console.log(error))

  }

  return (
    <div className='container d-flex justify-content-center align-items-center vh-100' >
      <div className='card p-4 shadow' style={{ width: "350px" }} >
        <h2 className='text-center mb-4' >Registro de usuario</h2>
        <form onSubmit={handleSubmit} >
          <div className='mb-3' >
            <label className='form-label' >Email</label>
            <input className={`form-control ${err ? 'is-invalid' : ''}`} type="email" name='email' />
          </div>
          <div className='mb-3' >
            <label className='form-label' >Password</label>
            <input className={`form-control ${err ? 'is-invalid' : ''}`} type="password" name='pass' />
          </div>
          <div className='mb-3' >
            <label className='form-label' >Confirmar Password</label>
            <input className={`form-control ${err ? 'is-invalid' : ''}`} type="password" name='passConfirm' />
          </div>
          <button className='btn btn-primary w-100' >Ingresar</button>
        </form>
      </div>
    </div>
  )
}

export default Registro