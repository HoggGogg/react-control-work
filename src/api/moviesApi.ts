export const API_BASE = import.meta.env.VITE_API_BASE as string;
export const API_KEY = import.meta.env.VITE_API_KEY as string;
export const LANGUAGE = (import.meta.env.VITE_LANGUAGE as string) || 'en-US';

export type Genre = {
    id: number;
    name: string;
};

export type Movie = { id: number; title: string; poster_path: string | null; vote_average: number; genre_ids: number[]; overview: string; };

export async function getGenres(): Promise<Genre[]> {
    const res = await fetch(`${API_BASE}/genre/movie/list?api_key=${API_KEY}&language=${LANGUAGE}`);
    const data = await res.json();
    return data.genres;
}

export async function getMovies(page = 1, withGenres?: number, query?: string) {
    if (query && query.trim().length > 0) {
        const res = await fetch(
            `${API_BASE}/search/movie?api_key=${API_KEY}&language=${LANGUAGE}&query=${encodeURIComponent(query)}&page=${page}&include_adult=false`
        );
        return res.json();
    }
    const url = `${API_BASE}/discover/movie?api_key=${API_KEY}&language=${LANGUAGE}&sort_by=popularity.desc&page=${page}${
        withGenres ? `&with_genres=${withGenres}` : ''
    }`;
    const res = await fetch(url);
    return res.json();
}

export async function getMovieDetail(id: number) {
    const res = await fetch(`${API_BASE}/movie/${id}?api_key=${API_KEY}&language=${LANGUAGE}`);
    return res.json();
}