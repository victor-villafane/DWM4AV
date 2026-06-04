import React, { useContext } from 'react'
import { useNavigate } from 'react-router'
import { useLogin } from '../contexts/SessionContext'
import { useAuthService } from '../services/auth.service'

const Login = () => {
  const navigate = useNavigate()
  const login = useLogin()
  const { login: loginService } = useAuthService()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const email = e.target.email.value
    const pass = e.target.pass.value

    loginService({ email: email, password: pass })
      .then(usuario => {
        login(usuario.token, email)
        navigate("/")
      })
      .catch(error => console.log(error))
    
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