import { createContext, useState } from "react";

export const Session = createContext()

export function SessionProvider( {children} ){
    const [ usuario, setUsuario ] = useState()
    return (
        <Session.Provider value={ {usuario, setUsuario }}>
            {children}
        </Session.Provider>
    )
}
