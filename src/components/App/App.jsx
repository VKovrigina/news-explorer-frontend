import React from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import './App.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Main from '../Main/Main';
import SavedNews from '../SavedNews/SavedNews';
import { dataMain, dataSave } from '../../utils/data';

function App() {
  const location = useLocation();
  // eslint-disable-next-line no-unused-vars
  const [isUserLoggedIn, setUserLoggedIn] = React.useState(true);
  return (
    <div className="app">
      <Header pathname={location.pathname} isLoggedIn={isUserLoggedIn} />
      <Switch>
        <Route path="/saved-news">
          <SavedNews cards={dataSave} isLoggedIn={isUserLoggedIn} />
        </Route>
        <Route path="/">
          <Main cards={dataMain} isLoggedIn={isUserLoggedIn} />
        </Route>

      </Switch>
      <Footer />
    </div>
  );
}

export default App;
