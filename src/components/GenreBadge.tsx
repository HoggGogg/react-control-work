import React from 'react';

type Props = {
    name: string;
};

const GenreBadge: React.FC<Props> = ({ name }) => (
    <span
        style={{
            display: 'inline-block',
            padding: '2px 8px',
            borderRadius: 12,
            background: '#eee',
            fontSize: 12,
            marginRight: 6,
        }}
    >
    {name}
  </span>
);

export default GenreBadge;