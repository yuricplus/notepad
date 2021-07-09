import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import './style.scss'

export const Home: React.FC = () => {
    const history:any = useHistory();
    const [idCreated, setIdCreated] = useState('');

    function redirect():void {
        history.push(`/note/${idCreated}`);
    }

    return (
        <section className="content">
            <div className="content__item">
                <h2>ID</h2>
                <form action="" className="content__item__form">
                    <input 
                      type="text" placeholder="htpps://notepad.com/yourid" 
                      className="content__item__form__input"
                      onChange={(value) => setIdCreated(value.target.value)}
                    />
                    <div className="content__item__form__cnt">
                      <button 
                          className="content__item__form__cnt__button__primary"
                          onClick={(e)=> {
                              e.preventDefault()
                              if(!idCreated) {
                                return;
                              }
                              redirect()
                          }}> + New</button> 
                        <span className="content__item__form__cnt__or">or</span>
                      <button 
                        className="content__item__form__cnt__button__secondary"
                        onClick={(e) => {
                          e.preventDefault();
                          if(!idCreated) {
                            return;
                          }
                          redirect();
                        }}>Access</button>
                    </div>
                </form>
            </div>
        </section>
    )
}