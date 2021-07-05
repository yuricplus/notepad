import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import './style.scss'

export const Home: React.FC = () => {
    const history:any = useHistory();
    const [idCreated, setIdCreated] = useState('');
    const [idAccess, setIdAccess] = useState('');

    function redirect():void {
        history.push(`/note/${idCreated}`);
    }

    return (
        <section className="content">
            <div className="content__item">
                <h2>create a new ID</h2>
                <form action="" className="content__item__form">
                    <input 
                      type="text" placeholder="htpps://notepad.com/yourid" 
                      className="content__item__form__input"
                      onChange={(value) => setIdCreated(value.target.value)}
                    />
                    <button 
                      className="content__item__form__button"
                      onClick={(e)=> {
                          e.preventDefault()
                          redirect()
                      }}>create</button>
                </form>
            </div>
            <div className="content__item">
                <h2>acess any ID</h2>
                <form action="" className="content__item__form">
                    <input 
                      type="text" placeholder="htpps://notepad.com/yourid" 
                      className="content__item__form__input" 
                      autoComplete="disable"
                      onChange={(value) => setIdAccess(value.target.value)}
                    />
                    <button 
                      className="content__item__form__button"
                      onClick={(e) => {
                        e.preventDefault();
                        redirect();
                      }}
                      >access</button>
                </form>
            </div>
        </section>
    )
}