import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import ItemList from './ItemList';
import Venue from './Venue';
// import Rate from './Rate';
import SearchBar from './SearchBar';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div className="routes">
            <Route path="/" exact component={SearchBar} />
            <Route path="/venue/" component={Venue} />
            <Route path="/venue/:menuid" component={ItemList} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
