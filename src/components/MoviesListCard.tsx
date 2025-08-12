import React from 'react';
import StarsRating from './StarsRating';
import GenreBadge from './GenreBadge';
import type {Movie} from "../api/moviesApi.ts";

type Props = {
    movie: Movie;
    genresMap: Record<number, string>;
    onClick?: (id: number) => void;
};

const IMG_BASE = 'https://image.tmdb.org/t/p/w500';

const MoviesListCard: React.FC<Props> = ({ movie, genresMap, onClick }) => {
    const poster = movie.poster_path ? IMG_BASE + movie.poster_path : '';

    return (
        <div
            className="movie-card"
            onClick={() => onClick?.(movie.id)}
            style={{
                width: 260,
                cursor: 'pointer',
                border: '1px solid #ddd',
                borderRadius: 12,
                overflow: 'hidden',
                background: '#fff',
                boxShadow: '0 2px 6px rgba(0,0,0,.05)',
            }}
        >
            <div style={{ height: 380, background: '#f0f0f0' }}>
                {poster ? (
                    <img src={poster} alt={movie.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        No image
                    </div>
                )}
            </div>
            <div style={{ padding: 12 }}>
                <h3 style={{ margin: '6px 0 4px', fontSize: 16 }}>{movie.title}</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', margin: '6px 0' }}>
                    {movie.genre_ids.map((gid) => (
                        <GenreBadge key={gid} name={genresMap[gid]} />
                    ))}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontWeight: 600 }}>{movie.vote_average.toFixed(1)}</span>
                    <StarsRating value={movie.vote_average} />
                </div>
            </div>
        </div>
    );
};

export default MoviesListCard;