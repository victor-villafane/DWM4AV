import { useApi } from "./api.service";

export function useAuthService(){
    const { call } = useApi()

    const login = (credenciales) => call("/usuarios/login", "POST", credenciales)
    const register = (email, password, passwordConfirm) => call("/usuarios", "POST", {
        email: email,
        password: password,
        passwordConfirm: passwordConfirm
    })
    const getUsuarios = () => call("/usuarios")
    const asignarRol = (id, rol) => call("/usuarios/" + id, "POST", { rol: rol })

    return { login, register, getUsuarios, asignarRol }
}