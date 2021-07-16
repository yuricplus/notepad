/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useHttp } from '../../Hooks/useHttp';

import './style.scss'

export const Home: React.FC = () => {
    const history:any = useHistory();
    const [idCreated, setIdCreated] = useState('');

    function redirect(id: string):void {
        history.push(`/note/${id}`);
    }

    function handleCreatedUser() {
      useHttp('post', 'user', 
        { 
          id: idCreated, 
          password: ''
        }
      ).then(response => {
        if(response.status === 200) {
          redirect(response.data.id)
        }
      })

    }

    function handleVerify() {
      useHttp('get', `/user/${idCreated}`)
        .then(response => {
          if(response.status === 200) {
             redirect(idCreated)
          } else {

          }
        })
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
                              handleCreatedUser()
                          }}> + New</button> 
                        <span className="content__item__form__cnt__or">or</span>
                      <button 
                        className="content__item__form__cnt__button__secondary"
                        onClick={(e) => {
                          e.preventDefault();
                          if(!idCreated) {
                            return;
                          }
                          handleVerify()
                        }}>Access</button>
                    </div>
                </form>
            </div>
        </section>
    )
}