import { createContext, useContext, useState } from "react";

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

export function useLogout(){
    const { onLogout } = useSession()
    return onLogout
}

export function useToken(){
    const { token } = useSession()
    return token
}

export function SessionProvider({ children }) {
    const [usuario, setUsuario] = useState( localStorage.getItem("session") )
    const [token, setToken] = useState( localStorage.getItem("token") )

    const onLogin = (jwt, email) => {
        localStorage.setItem("session", JSON.stringify({ email: email }))
        localStorage.setItem("token", jwt)

        setUsuario(email)
        setToken(jwt)
    }

    const onLogout = () => {
        localStorage.clear()
        setUsuario(null)
        setToken(null)
    }

    return (
        <Session.Provider value={{ usuario, setUsuario, token, onLogin, onLogout }}>
            {children}
        </Session.Provider>
    )
}
