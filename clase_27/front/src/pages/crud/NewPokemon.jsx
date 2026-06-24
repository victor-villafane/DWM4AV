import React from 'react'
import { Link, useNavigate } from 'react-router'
import { useForm } from 'react-hook-form'
import { usePokemonsService } from '../../services/pokemons.service'

const NewPokemon = () => {

    const {
        register,                           // Es una funcion que nos permite registrar el nombre de nuestro input y agregar una validacion (opcional)
        handleSubmit,                       // Es una funcion que se ejecuta direcamente en el formulario, valida y si esta ok pasa a nuestra funcion
        watch,                              // Es una funcion que monitorea en tiempo real el valor que tiene un input
        formState: { isValid, errors }      // Es el estado global del formulario, isValid -> true si no hay errores                             // errors es el contenedor donde guarda los mensajes de error
    } = useForm({ mode: "onChange" })
    const navigate = useNavigate()

    const { cretePokemon } = usePokemonsService()
    const onSubmit = (formData) => {
        const data = new FormData()
        data.append("name", formData.nombre)
        data.append("height", formData.altura)
        data.append("weight", formData.peso)
        data.append("file", formData.imagen[0])

        fetch("http://localhost:2026/api/pokemons", {
            method: "POST",
            body: data
        })
            .then(res => res.json())
            .then(data => console.log(data))
            .catch(err => console.log(err))

        // const name = formData.nombre
        // const height = formData.altura
        // const weight = formData.peso
        // const sprites = formData.imagen

        // const pokemon = { name: name, height: height, weight, sprites: { front_default: sprites } }

        // cretePokemon(pokemon)
        //     .then( () => navigate("/") )
        //     .catch( (err) => console.log(err) )
    }

    return (
        <div className="container mt-4">
            <div className="card p-3 text-center">
                <h2 className='text-center' >Nuevo pokemon</h2>
                <form onSubmit={handleSubmit(onSubmit)} >
                    <div className='mb-2' >
                        <label className='form-label' >Nombre:</label>
                        <input className='form-control' type="text" name="nombre" {...register("nombre")} />
                    </div>
                    <div className='mb-2'>
                        <label className='form-label' >Altura:</label>
                        <input className='form-control' type="text" name="altura" {...register("altura")} />
                    </div>
                    <div className='mb-2'>
                        <label className='form-label' >Peso:</label>
                        <input className='form-control' type="text" name="peso" {...register("peso")} />
                    </div>
                    <div className='mb-2'>
                        <label className='form-label' >Imagen:</label>
                        <input className='form-control' type="file" name="imagen" {...register("imagen", { required: "La imagen es obligatoria" })} />
                    </div>
                    <button className='btn btn-primary' type='submit' >Guardar</button>
                </form>
            </div>
            <Link to="/">Volver</Link>
        </div>
    )
}

export default NewPokemon