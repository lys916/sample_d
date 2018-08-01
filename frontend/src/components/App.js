import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './Home';
import Camera from './Camera';
import SearchPlaces from './SearchPlaces';
import ItemInput from './ItemInput';
import ItemView from './ItemView';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route path='/takePhoto' component={Camera} />
            <Route path='/addItem' exac component={ItemInput} />
            <Route path='/' exact component={Home}  />
            <Route path='/items/:id' component={ItemView}  />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
