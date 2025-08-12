import React from 'react';

type Props = { name: string };

const GenreBadge: React.FC<Props> = ({ name }) => (
    <span
        style={{
            padding: '4px 8px',
            marginRight: 6,
            borderRadius: 12,
            background: '#eee',
            fontSize: 12,
        }}
    >
    {name}
  </span>
);

export default GenreBadge;