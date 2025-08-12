import React from 'react';
import MoviesListCard from './MoviesListCard';
import type {Movie} from "../api/moviesApi.ts";

type Props = {
    movies: Movie[];
    genresMap: Record<number, string>;
    onCardClick: (id: number) => void;
};

const MoviesList: React.FC<Props> = ({ movies, genresMap, onCardClick }) => {
    return (
        <div
            className="movies-grid"
            style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                gap: 18,
                justifyItems: 'stretch',
            }}
        >
            {movies.map((m) => (
                <MoviesListCard key={m.id} movie={m} genresMap={genresMap} onClick={onCardClick} />
            ))}
        </div>
    );
};

export default MoviesList;