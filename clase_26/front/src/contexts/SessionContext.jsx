import { createContext, useContext, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";

export const Session = createContext()

export function useSession() {
    return useContext(Session)
}

export function useUsuario() {
    const { usuario } = useSession()
    return usuario
}

export function useLogin() {
    const { onLogin } = useSession()
    return onLogin
}

export function useLogout() {
    const { onLogout } = useSession()
    return onLogout
}

export function useToken() {
    const { token } = useSession()
    return token
}

export function useRol() {
    const { rol } = useSession()
    return rol
}

export function SessionProvider({ children }) {
    const [usuario, setUsuario] = useState(localStorage.getItem("session"))
    const [token, setToken] = useState(localStorage.getItem("token") || "")
    const [rol, setRol] = useState()
    const onLogin = (jwt, email) => {
        localStorage.setItem("session", JSON.stringify({ email: email }))
        localStorage.setItem("token", jwt)
        setUsuario(email)
        setToken(jwt)
    }

    useEffect(() => {
        if( token.length > 0 ){
            const payload = jwtDecode(token)
            console.log(token)
            setRol( payload.rol )
        }
    }, [])

    const onLogout = () => {
        localStorage.clear()
        setUsuario(null)
        setToken(null)
    }

    return (
        <Session.Provider value={{ usuario, setUsuario, token, onLogin, onLogout, rol }}>
            {children}
        </Session.Provider>
    )
}
