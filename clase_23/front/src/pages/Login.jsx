import React, { useContext } from 'react'
import { useNavigate } from 'react-router'
import { useLogin } from '../contexts/SessionContext'
import { useAuthService } from '../services/auth.service'
import { useForm } from "react-hook-form"
const Login = () => {
  const navigate = useNavigate()
  const login = useLogin()
  const { login: loginService } = useAuthService()

  const {
    register,                           // Es una funcion que nos permite registrar el nombre de nuestro input y agregar una validacion (opcional)
    handleSubmit,                       // Es una funcion que se ejecuta direcamente en el formulario, valida y si esta ok pasa a nuestra funcion
    watch,                              // Es una funcion que monitorea en tiempo real el valor que tiene un input
    formState: { isValid, errors }      // Es el estado global del formulario, isValid -> true si no hay errores                             // errors es el contenedor donde guarda los mensajes de error
  } = useForm({ mode: "onChange" })

  const onSubmit = async (formData) => {
    loginService({ email: formData.email, password: formData.pass })
      .then(usuario => {
        login(usuario.token, email)
        navigate("/")
      })
      .catch(error => console.log(error))

  }
  const email = watch("email")
  const pass = watch("pass")
  return (
    <div className='container d-flex justify-content-center align-items-center vh-100' >
      <div className='card p-4 shadow' style={{ width: "350px" }} >
        <h2 className='text-center mb-4' >Iniciar session</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='mb-3' >
            <label className='form-label' >Email</label>
            <input className={`form-control ${email?.length > 0
              ? errors.email ? "is-invalid" : "is-valid" : ""
              }`} type='text' name='email' {...register("email", {
                required: "El campo email es obligatorio",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "No es un email valido"
                }
              })} />
            <div className='invalid-feedback' >
              {errors.email?.message}
            </div>
          </div>
          <div className='mb-3' >
            <label className='form-label' >Password</label>
            <input className={`form-control ${ pass?.length > 0 ? errors.pass ? "is-invalid" : "is-valid" : ""}`} type="password" name='pass' {...register("pass", { required: "El campo es obligatorio" })} />
            <div className='invalid-feedback' >
              {errors.pass?.message}
            </div>
          </div>
          <button className={`btn btn-primary w-100 ${isValid ? "" : 'disabled'}`}  >Ingresar</button>
        </form>
      </div>
    </div>
  )
}

export default Login