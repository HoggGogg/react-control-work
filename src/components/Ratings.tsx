import React from 'react';

type Props = {
    value: number; // 0 - 10
    outOf?: number;
    color?: string;
    onRate?: (value: number) => void;
    readOnly?: boolean;
};

const Star = ({
                  filled,
                  onClick,
              }: {
    filled: boolean;
    onClick?: () => void;
}) => (
    <span
        onClick={onClick}
        style={{
            color: filled ? '#f5b50a' : '#444',
            cursor: onClick ? 'pointer' : 'default',
            fontSize: 20,
            marginRight: 2,
        }}
        aria-label={filled ? 'star filled' : 'star empty'}
    >
    ★
  </span>
);

const Ratings: React.FC<Props> = ({
                                      value,
                                      outOf = 5,
                                      color,
                                      onRate,
                                      readOnly,
                                  }) => {
    // Приведём к диапазону 0..outOf
    const max = Math.max(1, outOf);
    const rating = Math.max(0, Math.min(value, max));

    const whole = Math.floor(rating);
    const hasHalf = rating - whole >= 0.5;

    // Рендер звёзд (простая реализация: целые звезды + половина не поддерживается отдельно, но можно доработать)
    const stars = Array.from({ length: max }).map((_, idx) => {
        const filled = idx < whole;
        // простая визуализация без половинок
        return <Star key={idx} filled={filled} />;
    });

    return (
        <div role="rating" aria-label={`rating ${value} из ${outOf}`} style={{ display: 'inline-flex', alignItems: 'center' }}>
            {stars}
            <span style={{ marginLeft: 6, color: '#aaa', fontSize: 12 }}>
        {rating.toFixed(1)}
      </span>
            {!readOnly && onRate && (
                <span style={{ marginLeft: 8, fontSize: 12, color: '#aaa' }}>
          <span style={{ marginRight: 6 }}>оценить:</span>
                    {[1,2,3,4,5].map(n => (
                        <button
                            key={n}
                            onClick={() => onRate(n)}
                            style={{
                                border: 'none',
                                background: 'transparent',
                                color: '#fff',
                                cursor: 'pointer',
                                padding: 0,
                                marginRight: 4,
                            }}
                            aria-label={`rate ${n} stars`}
                        >
                            ★
                        </button>
                    ))}
        </span>
            )}
        </div>
    );
};

export default Ratings;