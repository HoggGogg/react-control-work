import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {getMovieDetail} from '../api/moviesApi';
import MovieInfo from '../components/MovieInfo';
import PosterPreview from "../components/PosterPreview.tsx";

export type DetailMovie = {
    id: number;
    title: string;
    overview: string;
    release_date?: string;
    poster_path?: string | null;
    vote_average?: number;
    genre_ids?: number[];
    genres?: { id: number; name: string }[];
};

const MovieDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [movie, setMovie] = useState<DetailMovie | null>(null);
    const [genreMap, setGenreMap] = useState<Record<number, string>>({});
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchDetail = async () => {
            if (!id) return;
            setLoading(true);
            try {
                const detail: any = await getMovieDetail(Number(id));
                const mapped: DetailMovie = {
                    id: detail.id,
                    title: detail.title,
                    overview: detail.overview,
                    release_date: detail.release_date,
                    poster_path: detail.poster_path,
                    vote_average: detail.vote_average,
                    genre_ids: detail.genre_ids ?? [],
                    genres: detail.genres ?? [],
                };
                setMovie(mapped);

                if (detail.genres && Array.isArray(detail.genres)) {
                    const map: Record<number, string> = {};
                    detail.genres.forEach((g: any) => (map[g.id] = g.name));
                    setGenreMap(map);
                } else if (detail.genre_ids) {
                    const map: Record<number, string> = {};
                    detail.genre_ids.forEach((gid: number) => (map[gid] = `Genre ${gid}`));
                    setGenreMap(map);
                }
            } catch (e) {
                console.error('Failed to load movie detail', e);
            } finally {
                setLoading(false);
            }
        };
        fetchDetail();
    }, [id]);

    const onBack = () => navigate(-1);

    if (loading) {
        return (
            <div style={{ padding: 20 }}>
                <div>Loading...</div>
            </div>
        );
    }

    if (!movie) {
        return (
            <div style={{ padding: 20 }}>
                <div>Фильм не найден.</div>
                <button onClick={onBack}>Назад</button>
            </div>
        );
    }

    const { title, overview, release_date, poster_path, vote_average, genre_ids = [] } = movie;

    return (
        <div style={{ padding: 20 }}>
            <button onClick={onBack} style={{ marginBottom: 16 }}>
                Назад
            </button>

            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'minmax(240px, 1fr) 2fr',
                    gap: 24,
                    alignItems: 'start',
                }}
            >
                <PosterPreview posterPath={poster_path} title={title} />

                <div>
                    <MovieInfo
                        title={title}
                        overview={overview}
                        releaseDate={release_date}
                        genreIds={genre_ids}
                        genreMap={genreMap}
                        voteAverage={vote_average}
                    />
                </div>
            </div>
        </div>
    );
};

export default MovieDetailPage;