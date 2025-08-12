import React from 'react';

type Props = { value: number; max?: number };

const StarsRating: React.FC<Props> = ({ value, max = 10 }) => {
    const stars = Math.round((value / max) * 5);
    return (
        <span aria-label={`Rating ${value} from ${max}`} title={`Rating ${value}`}>
      {'★'.repeat(stars)}
            {'☆'.repeat(5 - stars)}
    </span>
    );
};

export default StarsRating;