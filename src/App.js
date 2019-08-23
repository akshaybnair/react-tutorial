import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HomePage from './pages/homepage/homepage.component';
import './App.css'

const HatsPage = () => (
  <h1>Hats page</h1>
)
function App() {
  return (
      <div className="App">
        <Switch>
          <Route exact path='/' component={HomePage}></Route>
          <Route path='/hats' component={HatsPage}></Route>
        </Switch>
      </div>
    
  );
}

export default App;
