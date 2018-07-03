import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Venue from './Venue';
import VenueList from './VenueList';
import SearchBar from './SearchBar';
import Home from './Home';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div className="routes">
          <Route path="/" component={Home}  />
          <Route path="/venues" component={VenueList} />
          <Route path="/venuse/:id" component={Venue} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
