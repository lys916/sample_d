import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './Home';
import Camera from './Camera';
import ItemInput from './ItemInput';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route path='/takePhoto' component={Camera} />
            <Route path='/addItem' component={ItemInput} />
            <Route path='/' exact component={Home}  />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
