import React from 'react';
import GenreBadge from './GenreBadge';
import StarsRating from './StarsRating';

type MovieInfoProps = {
    title: string;
    overview: string;
    releaseDate?: string;
    genreIds?: number[];
    genreMap?: Record<number, string>;
    voteAverage?: number;
};

const MovieInfo: React.FC<MovieInfoProps> = ({
                                                 title,
                                                 overview,
                                                 releaseDate,
                                                 genreIds = [],
                                                 genreMap = {},
                                                 voteAverage,
                                             }) => {
    return (
        <div style={{ padding: 8 }}>
            <h2 style={{ margin: '8px 0' }}>{title}</h2>

            {typeof voteAverage === 'number' && (
                <div style={{ margin: '6px 0' }}>
                    <StarsRating value={voteAverage} max={10} />
                </div>
            )}

            {releaseDate && (
                <div style={{ color: '#aaa', fontSize: 12, marginBottom: 6 }}>
                    Release: {releaseDate}
                </div>
            )}

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, margin: '6px 0 12px' }}>
                {genreIds.map((gid) => {
                    const name = genreMap[gid];
                    return name ? (
                        <GenreBadge key={gid} name={name} />
                    ) : null;
                })}
            </div>

            <p style={{ lineHeight: 1.5, color: '#ddd' }}>{overview}</p>
        </div>
    );
};

export default MovieInfo;