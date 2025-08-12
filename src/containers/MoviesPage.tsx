// src/containers/MoviesPage.tsx  
import React, { useEffect, useState } from 'react';
import { type Genre, getGenres, getMovies, type Movie } from '../api/moviesApi';
import MoviesList from '../components/MoviesList';

type GenreMap = Record<number, string>;

const MoviesPage: React.FC = () => {
    const [genres, setGenres] = useState<Genre[]>([]);
    const [genreMap, setGenreMap] = useState<GenreMap>({});
    const [movies, setMovies] = useState<Movie[]>([]);
    const [page, setPage] = useState<number>(1);
    const [query, setQuery] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [totalPages, setTotalPages] = useState<number>(1);

    // Загрузка жанров и построение map
    useEffect(() => {
        const loadGenres = async () => {
            try {
                const g = await getGenres();
                setGenres(genres);
                const map: GenreMap = {};
                g.forEach((gg) => (map[gg.id] = gg.name));
                setGenreMap(map);
            } catch (e) {
                console.error('Failed to load genres', e);
            }
        };
        loadGenres()
    }, []);

    // Загрузка фильмов
    const loadMovies = async (pageToLoad = 1, q?: string) => {
        setLoading(true);
        try {
            const res = await getMovies(pageToLoad, undefined, q);
            setMovies(res.results);
            setTotalPages(res.total_pages ?? 1);
            setPage(pageToLoad);
        } catch (e) {
            console.error('Failed to load movies', e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadMovies(1);
    }, []);

    const onSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            loadMovies(1, query);
        } else {
            loadMovies(1, '');
        }
    };

    const handleCardClick = (id: number) => {
        window.location.href = `/movie/${id}`;
    };

    return (
        <div style={{ padding: 20 }}>
            <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                <h1>Фильмы</h1>
                <form onSubmit={onSearch} style={{ display: 'flex', gap: 8 }}>
                    <input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Поиск фильмов..."
                        style={{ padding: '8px 12px', width: 260 }}
                    />
                    <button type="submit" style={{ padding: '8px 12px' }}>
                        Поиск
                    </button>
                </form>
            </header>

            <section aria-label="movies" style={{ minHeight: 400 }}>
                {loading ? (
                    <div>Загрузка...</div>
                ) : (
                    <MoviesList
                        movies={movies}
                        genresMap={genreMap}
                        onCardClick={handleCardClick}
                    />
                )}
            </section>

            <footer style={{ marginTop: 20, display: 'flex', justifyContent: 'center', gap: 10 }}>
                <button onClick={() => loadMovies(Math.max(1, page - 1), query)} disabled={page <= 1}>
                    Назад
                </button>
                <span>Страница {page} из {totalPages}</span>
                <button onClick={() => loadMovies(page + 1, query)} disabled={page >= totalPages}>
                    Вперед
                </button>
            </footer>
        </div>
    );
};

export default MoviesPage;