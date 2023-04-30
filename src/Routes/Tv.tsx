import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import React, { useState } from 'react';
import {
    getPopularTv,
    getAiringTodayTv,
    getTopRatedTv,
    LIST_TYPE,
    IData,
    IGetDataResult,


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





function Tv() {
    //nowplaying
    const { data: PopularTvList, isLoading } = useQuery<IGetDataResult>(
        [LIST_TYPE[0], "PopularTv"],
        getPopularTv
    )
    console.log('PopularTvList:', PopularTvList)
    // upcoming
    const { data: AiringTodayList } = useQuery<IGetDataResult>(
        [LIST_TYPE[1], "LatesTv"],
        getAiringTodayTv
    );
    console.log('AiringTodayList:', AiringTodayList)


    // popular
    const { data: TopRatedTvList } = useQuery<IGetDataResult>(
        [LIST_TYPE[2], "TopRatedTv"],
        getTopRatedTv
    );
    console.log('TopRatedTvList:', TopRatedTvList)


    return (
        <Wrapper>
            {isLoading ? (
                <Loader>Loading...</Loader>
            ) : (
                <>
                    <Banner
                        bannerInfo={PopularTvList?.results[0] as IData}
                        detailSearchUrl={`home/banner`}
                        requestUrl={"tv"}
                        listType={'home'}
                        layoutId={String(PopularTvList?.results[0].id)}

                    />
                    <SliderArea>
                        <Sliders
                            title={"NOW PLAYING"}
                            data={PopularTvList as IGetDataResult}
                            listType={LIST_TYPE[0]}
                            mediaType={"tv"}
                            menuName={"home"}

                        />
                        <Sliders
                            title={"UPCOMING MOVIES"}
                            data={AiringTodayList as IGetDataResult}
                            listType={LIST_TYPE[1]}
                            mediaType={"tv"}
                            menuName={"home"}

                        />
                        <Sliders
                            title={"POPULAR MOVIES"}
                            data={TopRatedTvList as IGetDataResult}
                            listType={LIST_TYPE[2]}
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

export default Tv;