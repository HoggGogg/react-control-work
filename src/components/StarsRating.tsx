import React from 'react';

type Props = {
    value: number; // 0-10
    max?: number;
    size?: number;
};

const StarsRating: React.FC<Props> = ({ value, max = 10, size = 16 }) => {
    // превратим в 5 звезд, заполним пропорционально
    const stars = Math.round((value / max) * 5);
    const star = (filled: boolean, i: number) => (
        <span key={i} style={{ color: filled ? '#f5c518' : '#ddd', fontSize: size }}>
      ★
    </span>
    );
    return (
        <span aria-label={`rating ${value}`} title={`rating ${value}`} style={{ display: 'inline-flex' }}>
      {Array.from({ length: 5 }).map((_, i) => star(i < stars, i))}
    </span>
    );
};

export default StarsRating;