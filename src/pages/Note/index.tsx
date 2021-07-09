import React from 'react';
import { Si1Password } from 'react-icons/si'
import { BiTime } from 'react-icons/bi'

import './style.scss'

export const Note: React.FC = () => {
    return (
        <section className="note">
            <div className="note__new">
                <button className="note__new__button">+ new</button>
                <ul className="note__new__list">
                    <li className="note__new__list__item">
                        <span className="note__new__list__item__title">Untlited</span>
                        <span className="note__new__list__item__date">12:00 PM 07/07/2020</span>
                    </li>
                </ul>
            </div>
            <div className="note__edit">
                <div className="note__edit__informations">
                    <div className="note__edit__informations__left">
                        <ul className="note__edit__informations__left__list">
                            <li className="note__edit__informations__left__list__item" title="add password?">
                                <Si1Password color="#929292"/>
                            </li>
                            <li className="note__edit__informations__left__list__item" title="withd expired time?">
                                <BiTime color="#929292"/>
                            </li>
                        </ul>
                    </div>
                    <div className="note__edit__informations__right">
                        <button className="note__edit__informations__right__button">
                            Share
                        </button>
                    </div>
                </div>
                <div className="note__edit__box">
                    <input 
                      type="text" 
                      className="note__edit__box__title" 
                      autoComplete="false"
                      placeholder="Add a title"/>
                    <textarea 
                      name="notes" 
                      id="note" 
                      className="note__edit__box__textarea" 
                      placeholder="It's empty here let's write sommeting... or just use the mic on the right"></textarea>
                </div>
            </div>
        </section>
    )
}