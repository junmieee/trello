const API_KEY = "2367030dbb643b4e6b79c2a401b1be99";
const LANGUAGE = "ko-KO";
const REGION = "KR";
const BASE_PATH = "https://api.themoviedb.org/3";
const TAIL_PATH = `api_key=${API_KEY}&language=${LANGUAGE}&region=${REGION}`;
export const LIST_TYPE = [
    "nowPlaying",
    "upcomingMovies",
    "popularMovies",
    "tvShow",
]; // 영상 종류


export const LIST_TV_TYPE = [
    "opularTv",
    "airingTodayTv",
    "topRatedTv",
]; // 영상 종류
//영화 데이터
interface IMovie {
    id: number;
    backdrop_path: string;
    poster_path: string;
    Title: string;
    overview: string;
}


export interface IGetMoviesResult {
    dates: {
        maximun: string;
        minimum: string;
    };
    page: number;
    results: IMovie[],
    total_pages: number,
    total_result: number,
}

export interface IData {
    id: number;
    backdrop_path: string;
    poster_path: string;
    title?: string;
    name?: string;
    overview: string;
}

export interface IGetDataResult {
    dates?: {
        maximum: string;
        minimum: string;
    };
    page: number;
    results: IData[]; // 영화 데이터 interface의 []
    total_pages: number;
    total_results: number;
}


// Movies - NowPlaying
export function getNowPlayingMovies() {
    return fetch(`${BASE_PATH}/movie/now_playing?${TAIL_PATH}`).then((response) =>
        response.json()
    );
}


// Movies - Popular
export function getPopularMovies() {
    return fetch(`${BASE_PATH}/movie/popular?${TAIL_PATH}`).then((response) =>
        response.json()
    );
}

// Movies - Upcoming
export function getUpcomingMovies() {
    return fetch(`${BASE_PATH}/movie/upcoming?${TAIL_PATH}`).then((response) =>
        response.json()
    );
};

// TvShows
export function getPopularTvShows() {
    return fetch(`${BASE_PATH}/tv/popular?${TAIL_PATH}`).then((response) =>
        response.json()
    );
};

// Modal Popup getDetail Info Api
export function getDetailData(requestUrl: string, movieId: number) {
    return fetch(`${BASE_PATH}/${requestUrl}/${movieId}?${TAIL_PATH}`).then(
        (response) => response.json()
    );
};





// tv - Popular
export function getPopularTv() {
    return fetch(`${BASE_PATH}/tv/popular?${TAIL_PATH}`).then((response) =>
        response.json()
    );
}

// Movies - Upcoming
export function getAiringTodayTv() {
    return fetch(`${BASE_PATH}/tv/airing_today?${TAIL_PATH}`).then((response) =>
        response.json()
    );
};

// TvShows
export function getTopRatedTv() {
    return fetch(`${BASE_PATH}/tv/top_rated?${TAIL_PATH}`).then((response) =>
        response.json()
    );
};


// Modal Popup getDetail Info Api
export function getDetailTvData(tvId: number) {
    return fetch(`${BASE_PATH}/tv/${tvId}?${TAIL_PATH}`).then(
        (response) => response.json()
    );
};




