import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router'
import { useAuthService } from '../../services/auth.service'
import { useForm } from 'react-hook-form'

const Registro = () => {
  const navigate = useNavigate()
  const [err, setErr] = useState(false)
  const { register: registroService } = useAuthService()
  const {
    register,                           // Es una funcion que nos permite registrar el nombre de nuestro input y agregar una validacion (opcional)
    handleSubmit,                       // Es una funcion que se ejecuta direcamente en el formulario, valida y si esta ok pasa a nuestra funcion
    watch,                              // Es una funcion que monitorea en tiempo real el valor que tiene un input
    formState: { isValid, errors }      // Es el estado global del formulario, isValid -> true si no hay errores                             // errors es el contenedor donde guarda los mensajes de error
  } = useForm({ mode: "onChange" })

  const onSubmit = async (formData) => {

    registroService(formData.email, formData.pass, formData.passConfirm)
      .then(usuario => {
        navigate("/login")
      })
      .catch(error => console.log(error))

  }
  const email = watch("email", "")
  const pass = watch("pass", "")
  const passConfirm = watch("passConfirm", "")

  const validacionesPassword = {
    logitudMinima: pass?.length >= 8,
    mayuscula: /[A-Z]/.test(pass),
    minuscula: /[a-z]/.test(pass),
    numeros: /[0-9]/.test(pass),
    simbolos: /[@!#$%]/.test(pass)
  }

  const validacionesPasswordConfirm = {
    igual: pass == passConfirm && pass.length > 0 && passConfirm.length > 0,
    logitudMinima: passConfirm?.length >= 8,
    mayuscula: /[A-Z]/.test(passConfirm),
    minuscula: /[a-z]/.test(passConfirm),
    numeros: /[0-9]/.test(passConfirm),
    simbolos: /[@!#$%]/.test(passConfirm)
  }
  // https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/every

  const isValidPass = Object.values(validacionesPassword).every(value => value == true)
  const isValidPassConfirm = Object.values(validacionesPasswordConfirm).every(value => value == true)

  return (
    <div className='container d-flex justify-content-center align-items-center vh-100' >
      <div className='card p-4 shadow' style={{ width: "350px" }} >
        <h2 className='text-center mb-4' >Registro de usuario</h2>
        <form onSubmit={handleSubmit(onSubmit)} >
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
          </div>
          <div className='mb-3' >
            <label className='form-label' >Password</label>
            <input className={`form-control ${!isValidPass ? 'is-invalid' : ''}`} type="text" name='pass'
              {...register("pass", {
                required: "El campo password es obligatorio",
                validate: value => {
                  return isValidPass
                }
              })}
            />
            <ul className='list-unstyled mt-2' >
              <li className={validacionesPassword.logitudMinima ? 'text-success' : 'text-danger'} >
                {validacionesPassword.logitudMinima ? '✔' : '❌'} Minimo 8 caracteres
              </li>
              <li className={validacionesPassword.mayuscula ? 'text-success' : 'text-danger'} >
                {validacionesPassword.mayuscula ? '✔' : '❌'} Debe tener al menos una mayuscula
              </li>
              <li className={validacionesPassword.minuscula ? 'text-success' : 'text-danger'} >
                {validacionesPassword.minuscula ? '✔' : '❌'} Debe tener al menos una minuscula
              </li>
              <li className={validacionesPassword.numeros ? 'text-success' : 'text-danger'} >
                {validacionesPassword.numeros ? '✔' : '❌'} Debe tener al menos un numero
              </li>
              <li className={validacionesPassword.simbolos ? 'text-success' : 'text-danger'} >
                {validacionesPassword.simbolos ? '✔' : '❌'} Debe tener al menos un simbolo
              </li>
            </ul>
          </div>
          <div className='mb-3' >
            <label className='form-label' >Confirmar Password</label>
            <input className={`form-control ${!isValidPassConfirm ? 'is-invalid' : ''}`}
              type="text"
              name='passConfirm'
              {...register("passConfirm", {
                required: "El campo passConfirm es obligatorio",
                validate: value => {
                  return isValidPassConfirm
                }
              })}
            />
            <ul className='list-unstyled mt-2' >
              <li className={validacionesPasswordConfirm.igual ? 'text-success' : 'text-danger'} >
                {validacionesPasswordConfirm.igual ? '✔' : '❌'} Las contraseñas deben ser iguales
              </li>
              <li className={validacionesPasswordConfirm.logitudMinima ? 'text-success' : 'text-danger'} >
                {validacionesPasswordConfirm.logitudMinima ? '✔' : '❌'} Minimo 8 caracteres
              </li>
              <li className={validacionesPasswordConfirm.mayuscula ? 'text-success' : 'text-danger'} >
                {validacionesPasswordConfirm.mayuscula ? '✔' : '❌'} Debe tener al menos una mayuscula
              </li>
              <li className={validacionesPasswordConfirm.minuscula ? 'text-success' : 'text-danger'} >
                {validacionesPasswordConfirm.minuscula ? '✔' : '❌'} Debe tener al menos una minuscula
              </li>
              <li className={validacionesPasswordConfirm.numeros ? 'text-success' : 'text-danger'} >
                {validacionesPasswordConfirm.numeros ? '✔' : '❌'} Debe tener al menos un numero
              </li>
              <li className={validacionesPasswordConfirm.simbolos ? 'text-success' : 'text-danger'} >
                {validacionesPasswordConfirm.simbolos ? '✔' : '❌'} Debe tener al menos un simbolo
              </li>
            </ul>
          </div>
          <button className={`btn btn-primary w-100 ${!isValid ? "" : 'disabled'}`}  >Ingresar</button>
        </form>
      </div>
    </div>
  )
}

export default Registro