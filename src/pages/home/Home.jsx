import React, { useEffect, useState } from "react";
import "./home.css"
import "react-responsive-carousel/lib/styles/carousel.min.css";
// import { Carousel } from 'react-responsive-carousel';
import MovieList from "../../components/movie-list/MovieList";
import { Link } from "react-router-dom";
import { AiFillStar } from 'react-icons/ai';

//swiper 
import {Pagination, Autoplay} from 'swiper';
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

const Home = () => {
    const [ popularMovies, setPopularMovies ] = useState([]);

    useEffect(() => {
        fetch("https://api.themoviedb.org/3/movie/popular?api_key=01b6c8cde3d2a123df6fd1b3721f021b&language=en-US&page=1")
        .then(res => res.json())
        .then(data => setPopularMovies(data.results))
    }, [])

    return(
        <>
            <div className="home">
            <Swiper className="home"
                modules={[Pagination, Autoplay]}
                spaceBetween={30}
                slidesPerView={1}
                autoplay = {{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                Pagination = {{
                    clickable: true,
                }}>
                    {
                        popularMovies.map((movie) => {
                            return(
                            <Link to={`/movie/${movie.id}`} className="swiper">
                                <SwiperSlide>
                                <div className="posterImage">
                                    <img src={`https://image.tmdb.org/t/p/original${movie && movie.backdrop_path}`} alt=""/>
                                </div>
                                <div className="posterImage__overlay">
                                    <div className="posterImage__title">{movie ? movie.original_title: ""}</div>
                                    <div className="posterImage__runtime">
                                        {movie ? movie.release_date : ""}
                                        <span className="posterImage__rating">
                                            <AiFillStar style={{marginBottom: "-5px"}}/>
                                            {movie ? movie.vote_average :""}
                                            {" "}
                                        </span>
                                    </div>
                                    <div className="posterImage__description">{movie ? movie.overview : ""}</div>
                                </div>
                                </SwiperSlide>
                            </Link>
                            )
                        })
                    }
                </Swiper>
                {/* <Carousel
                    showThumbs={false}
                    autoPlay={true}
                    transitionTime={3}
                    infiniteLoop={true}
                    showStatus={false}
                >
                    {
                        popularMovies.map(movie => (
                            <Link style={{textDecoration:"none",color:"white"}} to={`/movie/${movie.id}`} >
                                <div className="posterImage">
                                    <img src={`https://image.tmdb.org/t/p/original${movie && movie.backdrop_path}`} alt=""/>
                                </div>
                                <div className="posterImage__overlay">
                                    <div className="posterImage__title">{movie ? movie.original_title: ""}</div>
                                    <div className="posterImage__runtime">
                                        {movie ? movie.release_date : ""}
                                        <span className="posterImage__rating">
                                            <AiFillStar style={{marginBottom: "-5px"}}/>
                                            {movie ? movie.vote_average :""}
                                            {" "}
                                        </span>
                                    </div>
                                    <div className="posterImage__description">{movie ? movie.overview : ""}</div>
                                </div>
                            </Link>
                        ))
                    }
                </Carousel> */}
                <MovieList />
            </div>
        </>
    );
};

export default Home;