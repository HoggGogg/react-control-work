import React, { useEffect, useState } from 'react';
import { getMovieDetail } from '../api/moviesApi';
import { useParams } from 'react-router-dom';
import StarsRating from '../components/StarsRating';
import GenreBadge from '../components/GenreBadge';

const IMG_BASE = 'https://image.tmdb.org/t/p/w780';

export const MovieDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [movie, setMovie] = useState<any>(null);

    useEffect(() => {
        const fetch = async () => {
            if (!id) return;
            const m = await getMovieDetail(Number(id));
            setMovie(m);
        };
        fetch();
    }, [id]);

    if (!movie) return <div>Загрузка детали...</div>;

    return (
        <div style={{ padding: 20 }}>
            <button onClick={() => window.history.back()}>Назад</button>
            <h2 style={{ marginTop: 8 }}>{movie.title}</h2>
            <div style={{ display: 'flex', gap: 20 }}>
                <img src={movie.poster_path ? IMG_BASE + movie.poster_path : ''} alt={movie.title} style={{ width: 360, borderRadius: 8 }} />
                <div>
                    <p>{movie.overview}</p>
                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                        {movie.genres?.map((g: any) => (
                            <GenreBadge key={g.id} name={g.name} />
                        ))}
                    </div>
                    <div style={{ marginTop: 8 }}>
                        <StarsRating value={movie.vote_average} />
                        <span style={{ marginLeft: 8 }}>{movie.vote_average.toFixed(1)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};