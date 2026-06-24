import { useEffect } from "react"
import { useAuthService } from "../../services/auth.service"
import { useState } from "react"
import { Bounce, toast } from "react-toastify"

const Usuarios = () => {
    const [usuarios, setUsuarios] = useState()
    const [rolNuevo, setRolNuevo] = useState({})
    const { getUsuarios, asignarRol } = useAuthService()

    useEffect(() => {
        getUsuarios()
            .then((usuariosData) => setUsuarios(usuariosData))
            .catch(err => console.log(err))

    }, [])

    const handleAsignar = (idUsuario) => {
        // console.log(idUsuario, rolNuevo[idUsuario])
        asignarRol(idUsuario, rolNuevo[idUsuario])
            .then(() => {
                const actualizado = usuarios.map(usuario => {
                    if (idUsuario == usuario._id) {
                        return {
                            ...usuario,
                            rol: rolNuevo[idUsuario]
                        }
                    }
                    return usuario
                })
                setUsuarios(actualizado)
                toast('🐱‍🐉 Rol cambiado!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                });
            })
            .catch((err) => console.log(err))
    }

    return usuarios?.length > 0 && (
        <table className="table mt-5" >
            <thead>
                <tr>
                    <th>email</th>
                    <th>rol</th>
                    <th>acciones</th>
                </tr>
            </thead>
            <tbody>
                {
                    usuarios.map(usuario => (
                        <tr key={usuario._id} >
                            <td>{usuario.email}</td>
                            <td>{usuario.rol}</td>
                            <td className="d-flex gap-2" >
                                <select className="form-select" defaultValue={usuario?.rol || ""}
                                    onChange={(e) => setRolNuevo({ ...rolNuevo, [usuario._id]: e.target.value })}
                                >
                                    <option value="" disabled></option>
                                    <option value="user">user</option>
                                    <option value="admin">admin</option>
                                </select>
                                <button onClick={() => handleAsignar(usuario._id)} className="btn btn-warning" >asignar</button>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    )
}

export default Usuarios