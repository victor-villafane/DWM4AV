import React, { useContext } from 'react'
import { useNavigate } from 'react-router'
import { useLogin } from '../../contexts/SessionContext'
import { useAuthService } from '../../services/auth.service'
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { loginSchema } from "../../schemas/usuarios"
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode'

const Login = () => {
  const navigate = useNavigate()
  const login = useLogin()
  const { login: loginService } = useAuthService()

  const {
    register,                           // Es una funcion que nos permite registrar el nombre de nuestro input y agregar una validacion (opcional)
    handleSubmit,                       // Es una funcion que se ejecuta direcamente en el formulario, valida y si esta ok pasa a nuestra funcion
    watch,                              // Es una funcion que monitorea en tiempo real el valor que tiene un input
    formState: { isValid, errors }      // Es el estado global del formulario, isValid -> true si no hay errores                             // errors es el contenedor donde guarda los mensajes de error
  } = useForm({ mode: "onChange", resolver: yupResolver(loginSchema) })

  const onSubmit = async (formData) => {
    loginService({ email: formData.email, password: formData.password })
      .then(usuario => {
        login(usuario.token, email)
        navigate("/")
      })
      .catch(error => console.log(error))

  }

  const email = watch("email")
  const password = watch("password")

  return (
    <div className='container d-flex justify-content-center align-items-center vh-100' >
      <div className='card p-4 shadow' style={{ width: "350px" }} >
        <h2 className='text-center mb-4' >Iniciar session</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='mb-3' >
            <label className='form-label' >Email</label>
            <input
              className={`form-control ${email?.length > 0
                ? errors.email ? "is-invalid" : "is-valid" : ""
                }`}
              type='text'
              name='email'
              {...register("email")}
            />
            <div className='invalid-feedback' >
              {errors.email?.message}
            </div>
          </div>
          <div className='mb-3' >
            <label className='form-label' >Password</label>
            <input
              className={`form-control ${password?.length > 0 ? errors.password ? "is-invalid" : "is-valid" : ""}`}
              type="password"
              name='password'
              {...register("password")}
            />
            <div className='invalid-feedback' >
              {errors.password?.message}
            </div>
          </div>
          <button className={`btn btn-primary w-100 ${isValid ? "" : 'disabled'}`}  >Ingresar</button>
        </form>
        <GoogleLogin
          onSuccess={credentialResponse => {
            console.log("credentialResponse", credentialResponse);
            if (credentialResponse?.credential) {
              const payload = jwtDecode(credentialResponse?.credential)
              loginService({ email: payload?.email, password: (payload?.email + "asdASD123@") })
                .then(usuario => {
                  login(usuario.token, email)
                  navigate("/")
                })
                .catch(error => console.log(error))
            } else {
              throw new Error("Exploto")
            }
          }}
          onError={() => {
            console.log('Login Failed');
          }}
        />;
      </div>
    </div>
  )
}

export default Login