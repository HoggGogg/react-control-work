import axios from 'axios';
export const API_BASE = import.meta.env.VITE_API_BASE as string;
export const API_KEY = import.meta.env.VITE_API_KEY as string;
export const LANGUAGE = (import.meta.env.VITE_LANGUAGE as string) || 'en-US';

export interface Genre {
    id: number;
    name: string;
};

export interface Movie { id: number; title: string; poster_path: string | null; vote_average: number; genre_ids: number[]; overview: string; };

export async function getGenres(): Promise<Genre[]> {
    const url = `${API_BASE}/genre/movie/list`;
    const res = await axios.get(url, { params: { api_key: API_KEY, language: LANGUAGE } });
    return res.data.genres;
}

export async function getMovies(page = 1, withGenres?: number, query?: string) {
    if (query && query.trim().length > 0) {
        const url = `${API_BASE}/search/movie`;
        const res = await axios.get(url, {
            params: {
                api_key: API_KEY,
                language: LANGUAGE,
                query,
                page,
                include_adult: false,
            },
        });
        return res.data;
    }
    const url = `${API_BASE}/discover/movie`;
    const res = await axios.get(url, {
        params: {
            api_key: API_KEY,
            language: LANGUAGE,
            sort_by: 'popularity.asc',
            page,
            with_genres: withGenres ? withGenres : undefined,
        },
    });
    return res.data;
}

export async function getMovieDetail(id: number) {
    const url = `${API_BASE}/movie/${id}`;
    const res = await axios.get(url, {
        params: { api_key: API_KEY, language: LANGUAGE },
    });
    return res.data;
}