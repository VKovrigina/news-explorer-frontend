import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Main from '../Main/Main';
import SavedNews from '../SavedNews/SavedNews';
// import Main from '../Main/Main';

function App() {
  return (
    <div className="app">
      <Header />
      <Switch>
        <Route path="/saved-news">
          <SavedNews />
        </Route>
        <Route path="/">
          <Main />
        </Route>

      </Switch>
      <Footer />
    </div>
  );
}

export default App;
