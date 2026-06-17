import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import { useForm } from 'react-hook-form'
import { usePokemonsService } from '../../services/pokemons.service'

const EditPokemon = () => {

  const {
    register,                           // Es una funcion que nos permite registrar el nombre de nuestro input y agregar una validacion (opcional)
    handleSubmit,                       // Es una funcion que se ejecuta direcamente en el formulario, valida y si esta ok pasa a nuestra funcion
    reset,                              // Es una funcion que permite reiniciar o actualizar los valores del formulario
    formState: { isValid, errors }      // Es el estado global del formulario, isValid -> true si no hay errores                             // errors es el contenedor donde guarda los mensajes de error
  } = useForm({ mode: "onChange" })

  const navigate = useNavigate()
  const { idPokemon } = useParams();
  const [pokemon, setPokemon] = useState(null)
  const { editPokemon, getPokemonsById } = usePokemonsService()

  useEffect(() => {
    getPokemonsById(idPokemon)
      .then(data => {
        setPokemon(data)
        reset({
          nombre: data.name,
          altura: data.height,
          peso: data.weight,
          imagen: data.sprites.front_default
        })
      })
      .catch(err => console.log(err))
  }, [])

  const onSubmit = (formData) => {
    const name = formData.nombre
    const height = formData.altura
    const weight = formData.peso
    const sprites = formData.imagen

    const pokemonData = { name: name, height: height, weight, sprites: { front_default: sprites } }
    console.log(pokemonData)
    editPokemon(idPokemon, pokemonData)
      .then(() => navigate("/"))
      .catch((err) => console.log(err))
  }

  return pokemon ? (
    <div className="container mt-4">
      <div className="card p-3 text-center">
        <h2 className='text-center' >Editar pokemon</h2>
        <form onSubmit={handleSubmit(onSubmit)} >
          <div className='mb-2' >
            <label className='form-label' >Nombre:</label>
            <input
              className='form-control'
              type="text"
              name="nombre"
              {...register("nombre")}
            />
          </div>
          <div className='mb-2'>
            <label className='form-label' >Altura:</label>
            <input
              className='form-control'
              type="text"
              name="altura"
              {...register("altura")}

            />
          </div>
          <div className='mb-2'>
            <label className='form-label' >Peso:</label>
            <input
              className='form-control'
              type="text"
              name="peso"
              {...register("peso")}

            />
          </div>
          <div className='mb-2'>
            <div>
              <img width="100" src={pokemon?.sprites?.front_default} className='img-fluid' alt="" />
            </div>
            <label className='form-label' >Reemplazar:</label>
            <input
              className='form-control'
              type="text"
              name="imagen"
              {...register("imagen")}

            />
          </div>
          <button className='btn btn-primary' type='submit' >Guardar</button>
        </form>
      </div>
      <Link to="/">Volver</Link>
    </div>
  ) : <div>Pokemon no encontrado</div>
}

export default EditPokemon