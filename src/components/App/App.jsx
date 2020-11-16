import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Main from '../Main/Main';
// import Main from '../Main/Main';

function App() {
  return (
    <div className="app">
      <Header />
      <Switch>

        <Route path="/">
          <Main />
        </Route>

      </Switch>
      <Footer />
    </div>
  );
}

export default App;
