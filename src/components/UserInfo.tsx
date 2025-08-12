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
                    background: '#d85353',
                    display: 'inline-block',
                }}
            />
            <span style={{ color: '#fff' }}>Pretty Man</span>
        </div>
    );
};

export default UserInfo;