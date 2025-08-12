import React from 'react';

const UserInfo: React.FC = () => {
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div
                aria-label="User avatar"
                style={{
                    width: 34,
                    height: 34,
                    borderRadius: 999,
                    background: '#6b9dfc',
                    display: 'inline-block',
                }}
            />
            <span style={{ color: '#fff' }}>Alex</span>
        </div>
    );
};

export default UserInfo;