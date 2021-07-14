import React from 'react';
import { FaFacebookF, FaLinkedinIn, FaGithub } from 'react-icons/fa';

import './style.scss'

export const Header: React.FC = () => {
    return (
        <header className="header">
            <div className="header__logo">
                <a href="/" rel="noopener noreferrer" className="header__logo__link">
                   <h1><strong className="bold">Notes</strong>.com</h1>
                </a>
            </div>
            <div className="header__links">
                <ul className="header__links__box">
                    <li className="header__links__box__text">Resources</li>
                    <li className="header__links__box__text">Blog</li>
                    <li className="header__links__box__text">
                        <a href="http://" target="_blank" rel="noopener noreferrer">
                          <FaFacebookF color="#0049ff"/>
                        </a>
                    </li>
                    <li className="header__links__box__text">
                        <a href="http://" target="_blank" rel="noopener noreferrer">
                          <FaLinkedinIn color="#0049ff"/>
                        </a>
                    </li>
                    <li className="header__links__box__text">
                        <a href="http://" target="_blank" rel="noopener noreferrer">
                          <FaGithub color="#0049ff"/>
                        </a>
                    </li>
                </ul>
            </div>
        </header>
    )
}