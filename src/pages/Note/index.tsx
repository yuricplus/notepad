import React, { useState, useCallback, useEffect } from 'react';
import { Si1Password } from 'react-icons/si'
import { BiTime } from 'react-icons/bi'
import { FaMicrophone } from 'react-icons/fa'
import { AiFillDelete } from 'react-icons/ai'
import { debounce } from "lodash";
import { useHttp } from '../../Hooks/useHttp';

import './style.scss'

declare global {
  interface Window {
    webkitSpeechRecognition: any,
    SpeechRecognition: any,
    SpeechGrammarList: any,
    webkitSpeechGrammarList: any
  }
}

interface NoteInterface {
  id: string,
  date: string,
  title: string,
  note: string
}


export const Note: React.FC = () => {
  const [speechText, setSeepckText] = useState('');
  const [loadingReccording, setLoadingReccording] = useState(false);
  const [notes, setNotes] = useState([]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleUpdateNotes = useCallback(debounce(()=>{
    alert('oi')
    return
  }, 2000), []);

  const recordingSpeech = (lang: string = 'pt-BR') => {
    setLoadingReccording(true);
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList
    
    const recognition = new SpeechRecognition();

    const speechRecognitionList = new SpeechGrammarList();
  
    speechRecognitionList.addFromString('', 2)
    recognition.grammars = speechRecognitionList;
    recognition.continuous = false;
    recognition.lang = lang;
    recognition.interimResults = false;
    recognition.maxAlternatives = 2;
  
    recognition.start();
  
    recognition.onresult = function(event: any) {
      console.log(event.results[0][0].transcript);
      setSeepckText((prevState)=> prevState + ' '+ event.results[0][0].transcript)
      setLoadingReccording(false)
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useHttp('get', '/notes/aDSDSDS').then(response => {
      setNotes(response.data || [])
    })
  })

  return (
    <section className="note">
      <div className="note__new">
          <button className="note__new__button">+ new</button>
          <ul className="note__new__list">
              {notes.map((note:NoteInterface, index) => (
                <li className="note__new__list__item" key={index}>
                  <span className="note__new__list__item__title">{note.title}</span>
                  <span className="note__new__list__item__date">{note.date}</span>
                </li>
              ))}
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
                      <li className="note__edit__informations__left__list__item" title="withd expired time?">
                          <AiFillDelete color="#929292"/>
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
                onChange={(e) => {
                  setSeepckText(e.target.value);
                  handleUpdateNotes();
                }}
                value={speechText} 
                className="note__edit__box__textarea" 
                placeholder="It's empty here let's write sommeting... or just use the mic on the right"></textarea>
                  <button 
                  className={`note__edit__box__voice ${
                      loadingReccording 
                        ? 'note__edit__box__voiceLoading' 
                          : ''}`
                      } onClick={() => {
                    recordingSpeech()
                }}><FaMicrophone color={loadingReccording ? '#f5746f' : 'white'}/></button>
          </div>
      </div>
  </section>
)
}