import React from 'react';

import './style.scss'

export const Header: React.FC = () => {
    return (
        <header className="header">
            <div className="header__logo">
                <a href="/" rel="noopener noreferrer" className="header__logo__link">
                   <h1>notepad online</h1>
                </a>
            </div>
        </header>
    )
}