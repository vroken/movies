import React, {useEffect, useState} from "react";
import "./movieList.css";
import { useParams } from "react-router-dom";
import Cards from "../card/Card";

const MovieList = () => {
    
    const [movieList, setMovieList] = useState([])
    const {type} = useParams()

    useEffect(() => {
        getData() // eslint-disable-next-line
    }, []);

    useEffect(() => {
        getData() // eslint-disable-next-line
    }, [type]);

    const getData = () => {
        fetch(`https://api.themoviedb.org/3/movie/${type ? type : "popular"}?api_key=01b6c8cde3d2a123df6fd1b3721f021b&language=en-US`)
        .then(res => res.json())
        .then(data => setMovieList(data.results))
    }

    return (
        <div className="movie__list">
            <h2 className="list__title">{(type ? type : "POPULAR").toUpperCase()}</h2>
            <div className="list__cards">
                {
                    movieList.map(movie => (
                        <Cards movie={movie} />
                    ))
                }
            </div>
        </div>
    )
}

export default MovieList