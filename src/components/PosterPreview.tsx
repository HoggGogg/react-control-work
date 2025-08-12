import React from 'react';
type Props = { posterPath: string | null | undefined; title: string };

const PosterPreview: React.FC<Props> = ({ posterPath, title }) => (
    <div
        style={{
            height: 320,
            background: '#672727',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 8,
            overflow: 'hidden',
        }}
    >
        {posterPath ?  (
            <img
                src={`https://image.tmdb.org/t/p/w300${posterPath}`}
                alt={title}
                style={{ maxWidth: '100%', maxHeight: '100%' }}
            />
        ) : (
            <span>No image</span>
        )}
    </div>
);

export default PosterPreview;