import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Home from './Home';
// import Rate from './Rate';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Route path="/" component={Home}  />
        </Router>
      </div>
    );
  }
}

export default App;
