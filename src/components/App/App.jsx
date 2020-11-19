import React from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import './App.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Main from '../Main/Main';
import SavedNews from '../SavedNews/SavedNews';

function App() {
  const location = useLocation();
  return (
    <div className="app">
      <Header pathname={location.pathname} />
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
