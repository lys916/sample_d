import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './Home';
import Venue from './Venue';
// import Rate from './Rate';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route path='/venues/:id' component={Venue} />
            <Route path='/' component={Home}  />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
