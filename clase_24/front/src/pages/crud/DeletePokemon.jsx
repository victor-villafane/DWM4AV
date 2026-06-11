import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import { useForm } from 'react-hook-form'
import { usePokemonsService } from '../../services/pokemons.service'

const DeletePokemon = () => {

  const {
    register,                           // Es una funcion que nos permite registrar el nombre de nuestro input y agregar una validacion (opcional)
    handleSubmit,                       // Es una funcion que se ejecuta direcamente en el formulario, valida y si esta ok pasa a nuestra funcion
    reset,                              // Es una funcion que permite reiniciar o actualizar los valores del formulario
    formState: { isValid, errors }      // Es el estado global del formulario, isValid -> true si no hay errores                             // errors es el contenedor donde guarda los mensajes de error
  } = useForm({ mode: "onChange" })

  const navigate = useNavigate()
  const { idPokemon } = useParams();
  const [pokemon, setPokemon] = useState(null)
  const { deletePokemon, getPokemonsById } = usePokemonsService()

  useEffect(() => {
    getPokemonsById(idPokemon)
      .then(data => {
        setPokemon(data)
      })
      .catch(err => console.log(err))
  }, [])

  const onSubmit = (formData) => {
    deletePokemon(idPokemon)
      .then(() => navigate("/"))
      .catch((err) => console.log(err))
  }

  return pokemon ? (
    <div className="container mt-4">
      <div className="card p-3 text-center">
        <h2 className='text-center' >Editar pokemon</h2>
        <form onSubmit={handleSubmit(onSubmit)} >
          <h3>Desea borrar?</h3>
          <h4>{pokemon?.name}</h4>
          <div>
            <img width="100" src={pokemon?.sprites?.front_default} className='img-fluid' alt="" />
          </div>
          <button className='btn btn-danger' type='submit' >Si</button>
          <Link to="/">No</Link>
        </form>
      </div>
      <Link to="/">Volver</Link>
    </div>
  ) : <div>Pokemon no encontrado</div>
}

export default DeletePokemon