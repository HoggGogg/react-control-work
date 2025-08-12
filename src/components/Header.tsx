import React from 'react';
import UserInfo from './UserInfo';

const Header: React.FC = () => {
    return (
        <header
            style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '12px 16px',
                borderBottom: '1px solid rgba(255,255,255,.08)',
                background: 'linear-gradient(135deg, rgba(0,0,0,.6), rgba(0,0,0,.2))',
                position: 'sticky',
                top: 0,
                zIndex: 10,
            }}
        >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div
                    style={{
                        width: 28,
                        height: 28,
                        borderRadius: 6,
                        background: '#7c5cff',
                        display: 'inline-block',
                    }}
                />
                <span style={{ color: '#fff', fontWeight: 700 }}>TMDB Explorer</span>
            </div>
            <UserInfo />
        </header>
    );
};

export default Header;