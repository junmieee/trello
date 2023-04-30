import {
    useLocation, useMatch, useNavigate
} from "react-router";
import React, { useEffect, useState } from 'react'
import { useDebounce } from "../hooks/useDebounce.tsx";
import styled from "styled-components";
import SearchDetail from "./Components/SearchDetail.tsx";
import { AnimatePresence } from "framer-motion";
import Modal from "../Routes/Components/Modal.tsx"

const API_KEY = "2367030dbb643b4e6b79c2a401b1be99";

const Wrapper = styled.div`
position: relative;

`


const SearchContainer = styled.div`
position: relative;
    height: 100%;
    width: 100%;
    background-color: black;
    z-index:101;
    padding: 10rem 0;
    text-align: center;

        
`

const MovieWrapper = styled.div`
    flex: 1 1 auto;
    display:inline-block;
    padding-bottom: 7rem;

`

const Movie = styled.div`
    cursor:pointer;
    transition: transform 0.3s ease-in-out;
    -webkit-transition: transform 0.3s;

    img {
        width: 80%;
        border-radius: 5px;
    }


    &:hover {
        transform : scale(1.05)
    }
    
`


const NoResultWrapper = styled.div`
    display: flex;  
    justify-content: center;
    align-items: center;
    margin-top: 16rem;
    height: 100%;
    padding: 8rem;
    color: #c5c5c5;
    font-size:18px;
    font-weight: 400;
`




const SearchPage = () => {

    const [searchResult, setSearchResult] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [movieSelected, setMovieSelected] = useState([]);

    const useQuery = () => {
        return new URLSearchParams(useLocation().search);

    }
    let query = useQuery();
    const searchTerm = query.get("q");
    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    const bigMatch: PathMatch<string> | null = useMatch(`search/:listType/:id`);

    useEffect(() => {
        if (debouncedSearchTerm) {
            fetchSearchMovie(debouncedSearchTerm)
        }
    }, [debouncedSearchTerm])

    const fetchSearchMovie = async (searchTerm) => {
        try {
            const res = await fetch(`https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&language=en-US&page=1&include_adult=false&query=${searchTerm}`)
                .then((res) => res.json());
            setSearchResult(res.results);
        }
        catch (error) {
            console.log(error);
        }
    }
    const navigate = useNavigate();

    if (searchResult.length > 0) {
        return (
            <SearchContainer>
                {searchResult.map((movie) => {
                    if (movie.backdrop_path !== null && movie.media_type !== "person") {
                        const movieImageUrl = "https://image.tmdb.org/t/p/w500" + movie.backdrop_path;


                        const handleClick = (movie) => {
                            navigate(`/search/${movie.media_type}/${movie.id}`);
                            setModalOpen(true)
                            setMovieSelected(movie)

                        }
                        return (
                            <>
                                <AnimatePresence>

                                    <MovieWrapper>
                                        <Movie
                                            // layoutId={movie.id + "" + movie.media_type}
                                            onClick={() => handleClick(movie)}>
                                            <img src={movieImageUrl} alt="movie" />
                                        </Movie>
                                    </MovieWrapper>


                                    {bigMatch ? (
                                        <Modal

                                            dataId={bigMatch.params.id}
                                            listType={bigMatch.params.listType}
                                            requestUrl={bigMatch.params.listType}
                                        />
                                    ) : null}

                                </AnimatePresence>
                                {/* {modalOpen && <SearchDetail {...movieSelected} setModalOpen={setModalOpen} />} */}

                            </>
                        )
                    }
                })}
            </SearchContainer >
        )
    }


    else {
        return (
            <NoResultWrapper>
                {/* <NoResultText> */}
                <p>찾고자하는 검색어 "{searchTerm}"와 관련된 영화가 없습니다.</p>
                {/* </NoResultText> */}
            </NoResultWrapper>

        )

    }
}

export default SearchPage;