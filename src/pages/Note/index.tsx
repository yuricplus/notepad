import React, { useState } from 'react';
import { Si1Password } from 'react-icons/si'
import { BiTime, BiMicrophone } from 'react-icons/bi'
import { FaMicrophone } from 'react-icons/fa'
//import { recordingSpeech } from '../../utils/speech'

import './style.scss'

declare global {
  interface Window {
    webkitSpeechRecognition: any,
    SpeechRecognition: any,
    SpeechGrammarList: any,
    webkitSpeechGrammarList: any
  }
}

export const Note: React.FC = () => {
  const [speechText, setSeepckText] = useState('')
  const recordingSpeech = (lang: string = 'pt-BR') => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList
    //const SpeechRecognitionEventVoice = window.SpeechRecognitionEvent 
    const recognition = new SpeechRecognition();

    const speechRecognitionList = new SpeechGrammarList();
  
    speechRecognitionList.addFromString('oi', 2)
    recognition.grammars = speechRecognitionList;
    recognition.continuous = false;
    recognition.lang = lang;
    recognition.interimResults = false;
    recognition.maxAlternatives = 2;
  
    recognition.start();
  
    recognition.onresult = function(event: any) {
      console.log(event.results[0][0].transcript);
      setSeepckText(event.results[0][0].transcript)
  
    }
  }
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
                    value={speechText} 
                    className="note__edit__box__textarea" 
                    placeholder="It's empty here let's write sommeting... or just use the mic on the right"></textarea>
                      <button className="note__edit__box__voice" onClick={() => {
                        recordingSpeech()
                    }}><FaMicrophone color="white"/></button>
              </div>
          </div>
      </section>
    )
}