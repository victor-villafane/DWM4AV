import React from 'react'
import { Activity } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router';

const Home = () => {

  const [peliculas, setPeliculas] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [page, setPage] = useState(1)
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MDRlZTZiNTg0MzVkMDlhMzRkOTM2MzQ3MjY4NzdhNyIsIm5iZiI6MTczMDc1OTIxMC4wNDgsInN1YiI6IjY3Mjk0YTJhZGU2OWE3OGJhOTY0NjJmZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gf7LSwy31gGc3Njn3kURs9cc5YEIktR7EHxtb015C18");

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow"
  };

  useEffect(() => {
    fetch("https://api.themoviedb.org/3/movie/popular?language=es-AR&page=" + page, requestOptions)
      .then((response) => response.json())
      .then((result) => setPeliculas(result.results))
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false))
  }, [page])

  if (loading) return <div>Cargando...</div>
  if (error) return <div>No se pueden cargar las peliculas</div>

  return (
    <>
      <table className='table'>
        <thead>
          <tr>
            <th>#</th>
            <th>title</th>
            <th>Idioma</th>
            <th>Popularidad</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {
            peliculas.map(pelicula => (
              <tr key={pelicula.id} >
                <td>
                  <img src={pelicula.poster_path} alt="" width="100px" />
                </td>
                <td>
                  {pelicula.title}
                </td>
                <td>
                  {pelicula.original_language}
                </td>
                <td>
                  {pelicula.vote_average}
                </td>
                <td>
                  <Link to={`/detalle/${pelicula.id}`}>Ver</Link>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
      <Activity mode={ page > 1 ? 'visible' : 'hidden' }>
        <button className='m-3 btn btn-primary ' onClick={() => setPage(page - 1)} > {'<'} </button>
      </Activity>
      <Activity mode={ page < 56932 ? 'visible' : 'hidden' }>
        <button className='m-3 btn btn-primary' onClick={() => setPage(page + 1)} > {'>'} </button>
      </Activity>
    </>
  )
}

export default Home