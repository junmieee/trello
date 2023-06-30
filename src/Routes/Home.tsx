import { useQuery } from "@tanstack/react-query";
import { getMovies, IGetMoviesResult } from "../api.ts";
import styled from "styled-components";
import { makeImagePath } from "../utils.ts";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import React, { useState } from 'react';
import { PathMatch, useMatch, useNavigate } from "react-router-dom";
import {
    getNowPlayingMovies,
    getPopularMovies,
    getPopularTvShows,
    getUpcomingMovies,
    IData,
    IGetDataResult,
    LIST_TYPE,
} from "../api.ts";
import { Banner } from "./Components/Banner.tsx";
import { Sliders } from "./Components/Slider.tsx"

const Wrapper = styled.div`
    background: black;
 
`
const Loader = styled.div`
  height: 20vh;
  display: flex;  
  justify-content: center;
  align-items: center;
`;

const SliderArea = styled.div`
  position: relative;
  margin-top: -16.8rem;

  @media screen and (max-width: 700px) {
    margin-top: -8.8rem;
  }
`;





function Home() {
    //nowplaying
    const { data: nowPlayingMoviesList, isLoading } = useQuery<IGetDataResult>(
        [LIST_TYPE[0], "nowPlayingMovies"],
        getNowPlayingMovies
    )


    // upcoming
    const { data: upcomingMoviesList } = useQuery<IGetDataResult>(
        [LIST_TYPE[1], "upcomingMovies"],
        getUpcomingMovies
    );

    // popular
    const { data: popularMoviesList } = useQuery<IGetDataResult>(
        [LIST_TYPE[2], "popularMovies"],
        getPopularMovies
    );

    // get Tv Show
    const { data: tvShowList } = useQuery<IGetDataResult>(
        [LIST_TYPE[3], "popularTvShows"],
        getPopularTvShows
    );
    return (
        <Wrapper>
            {isLoading ? (
                <Loader>Loading...</Loader>
            ) : (
                <>
                    <Banner
                        bannerInfo={nowPlayingMoviesList?.results[0] as IData}
                        detailSearchUrl={`home/banner`}
                        requestUrl={"movie"}
                        listType={'home'}
                        layoutId={String(nowPlayingMoviesList?.results[0].id)}

                    />
                    <SliderArea>
                        <Sliders
                            title={"NOW PLAYING"}
                            data={nowPlayingMoviesList as IGetDataResult}
                            listType={LIST_TYPE[0]}
                            mediaType={"movie"}
                            menuName={"home"}

                        />
                        <Sliders
                            title={"UPCOMING MOVIES"}
                            data={upcomingMoviesList as IGetDataResult}
                            listType={LIST_TYPE[1]}
                            mediaType={"movie"}
                            menuName={"home"}

                        />
                        <Sliders
                            title={"POPULAR MOVIES"}
                            data={popularMoviesList as IGetDataResult}
                            listType={LIST_TYPE[2]}
                            mediaType={"movie"}
                            menuName={"home"}

                        /><Sliders
                            title={"POPULAR TV SHOWS"}
                            data={tvShowList as IGetDataResult}
                            listType={LIST_TYPE[3]}
                            mediaType={"tv"}
                            menuName={"home"}

                        />



                    </SliderArea>


                </>
            )
            }
        </Wrapper >
    );
}

export default Home;