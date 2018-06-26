import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

function receiveResponse() {
  fetch('/join')
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          This is really weird, why is this doing all of this?
        </p>
      </div>
    );
  }
}

export default App;
