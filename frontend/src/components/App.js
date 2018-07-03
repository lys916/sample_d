import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Venue from './Venue';
import VenueList from './VenueList';
import SearchBar from './SearchBar';
import Home from './Home';
// import Rate from './Rate';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div className="routes">
          <Route path="/" component={Home}  />
          <Route path="/venues" component={VenueList} />
          <Route path="/venues/:id" component={Venue} />
          <Route path="/venues/:id/:menuid" component={Item} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
