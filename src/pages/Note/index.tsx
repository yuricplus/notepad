/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useCallback, useEffect } from 'react';
import { Si1Password } from 'react-icons/si'
import { BiTime } from 'react-icons/bi'
import { FaMicrophone } from 'react-icons/fa'
import { AiFillDelete } from 'react-icons/ai'
import { debounce } from "lodash";
import { useHttp } from '../../Hooks/useHttp';
import { useQuery } from '../../Hooks/useQuery'

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
  note: string,
}

export const Note: React.FC = () => {
  const [speechText, setSeepckText] = useState('');
  const [loadingReccording, setLoadingReccording] = useState(false);
  const [notes, setNotes] = useState([]);
  const [noteSelected, setNoteSelected] = useState<any>({});
  const [focused, setFocused] = useState<String>('')
  const [title, setTitle] = useState(' ')
  const query:any = useQuery();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleUpdateNotes = useCallback(debounce((noteInfos, noteDescription, noteTitle)=>{

    useHttp('put', `/notes/${noteInfos.id}`, {
      title: noteTitle,
      note: noteDescription
    })
    return
  }, 2000), []);

  const handleAddNote = () => {
    const data = {
      title: 'Untitled',
      note: '',
      author: query.id || '',
      date: new Date()
    }

    useHttp('post', '/notes', data)
      .then(response => {
        if(response.status === 200) {
          useHttp('get', `/notes/${query.id}`).then(responseNotes => {
            setNotes(responseNotes.data || []);
            setNoteSelected(responseNotes.data[0])
          })
        }
      })
  }

  const handleDeleteNote = (id: string) => {
    useHttp('delete', `/notes/${id}`).then(response => {
      //window.location.reload();
    })
  }

  const handleGetNotes = () => {
    useHttp('get', `/notes/${query.id}`).then(response => {
      if(response.status === 200) {
        setNotes(response.data || [])
        setNoteSelected(response.data[0])
      }
    })
  }

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
  
    recognition.onresult = (event: any) => {
      setLoadingReccording(false)
      if(focused === 'title') {
        setTitle((prevState) => `${prevState} ${event.results[0][0].transcript}`)
      } else {
        setSeepckText((prevState) => `${prevState} ${event.results[0][0].transcript}`)
      }
      handleUpdateNotes(noteSelected, `${speechText} ${event.results[0][0].transcript}`, title)
    }
  }


  useEffect(() => {
    if(notes.length === 0) {
      handleGetNotes();
    }
  }, [noteSelected, notes, query.id])

  useEffect(() => {
    if(noteSelected.id) {
      setSeepckText(noteSelected.note);
      setTitle(noteSelected.title)
    }
  }, [noteSelected])

  const handleSelecteNote = (note: any) => {
    setNoteSelected(note);
  }

  return (
    <section className="note">
      <div className="note__new">
          <button className="note__new__button" onClick={handleAddNote}>+ new</button>
          <ul className="note__new__list">
              {notes.map((note:NoteInterface, index) => (
                <li className={`note__new__list__item${
                    noteSelected?.id === note.id
                     ? '-active' : '' } `
                    } 
                    key={index} 
                    onClick={()=> handleSelecteNote(note)}>
                  <span className="note__new__list__item__title title-note">{note.title}</span>
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
                      <li 
                        className="note__edit__informations__left__list__item" 
                        title="withd expired time?"
                        onClick={() => handleDeleteNote(noteSelected.id)}>
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
                value={title}
                onClick={
                  () => {
                    setFocused('title');
                  }
                }
                maxLength={32}
                onChange={(e) => {
                  setTitle(e.target.value)
                  handleUpdateNotes(noteSelected, speechText, e.target.value);
                }}
                placeholder="Add a title"/>
              <textarea 
                name="notes" 
                id="note"
                onChange={(e) => {
                  setSeepckText(e.target.value)
                  handleUpdateNotes(noteSelected, e.target.value, title);
                }}
                onClick={
                  () => {
                    setFocused('note');
                  }
                }
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