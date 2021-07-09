import React from "react";
import {
  BrowserRouter,
  Route
} from "react-router-dom";

import { Home } from './pages/Home'
import { Header } from './components/Header'
import { Note } from './pages/Note'

export const RouterGlobal: React.FC = () => {
  return (
    <BrowserRouter>
      <Header/>
      <Route path="/" exact component={Home} />
      <Route path="/note/:id" component={(props: any) => Note(props)} />
      <Route />
    </BrowserRouter>
  );
}