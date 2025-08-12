export interface IMovie {
    id: number;
    title: string;
    original_title?: string;
    poster_path: string | null;
    vote_average: number;
    genre_ids: number[];
    overview: string;
    release_date?: string;
};