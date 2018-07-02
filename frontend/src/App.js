import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import ItemList from './components/ItemList';
import VenueList from './components/VenueList';
import SearchBar from './components/SearchBar';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div className="routes">
          <Route path="/" component={SearchBar}  />
          <Route path ="/venues" component={VenueList} />
          <Route path ="/venues/:id" component={ItemList} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
