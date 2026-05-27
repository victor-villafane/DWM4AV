import { useEffect } from "react"
import { useState } from "react"
import { Link, useParams } from "react-router"

const Detalle = () => {

    const { id } = useParams()
    const [pelicula, setPelicula] = useState(null)
    const [ loading, setLoading ] = useState(true)
    const [ error, setError ] = useState(null)

    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MDRlZTZiNTg0MzVkMDlhMzRkOTM2MzQ3MjY4NzdhNyIsIm5iZiI6MTczMDc1OTIxMC4wNDgsInN1YiI6IjY3Mjk0YTJhZGU2OWE3OGJhOTY0NjJmZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gf7LSwy31gGc3Njn3kURs9cc5YEIktR7EHxtb015C18");

    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
    };
    useEffect(() => {
        fetch("https://api.themoviedb.org/3/movie/" + id, requestOptions)
            .then((res) => res.json())
            .then(movie => setPelicula(movie))
            .catch(err => setError(err.message))
            .finally( () => setLoading(false) )
    }, [])

    if( loading ) return <div>Cargando...</div>
    if( error ) return <div>No se puede cargar el personaje</div>

    return (
        <div className="card mb-3">
            <div className="row g-0">
                <div className="col-md-4">
                    <img src={pelicula?.poster_path} className="img-fluid rounded-start" alt="..." />
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title">{pelicula?.title}</h5>
                        <p className="card-text">{ pelicula?.description }</p>
                        <p className="card-text"><small className="text-body-secondary">Last updated 3 mins ago</small></p>
                    </div>
                </div>
                <Link to="/" className="btn btn-info 100" >Volver</Link>
            </div>
        </div>
    )
}

export default Detalle