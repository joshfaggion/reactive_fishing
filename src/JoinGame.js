import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class JoinGame extends React.Component {
  constructor(props) {
    super(props);
    // Binds the functions to this.
    this.state = {value: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    // Setting the state to the correct value.
    this.setState({value: event.target.value});
  }


  handleSubmit(event) {
    // Using this to fetch data sent from the form
    fetch('/join', {
      // This tells it to use a post method.
      method: 'POST',
      body: JSON.stringify({
        name: this.state.value
      })
    }).then(function(response) {
      console.log(response.json())
    });
    event.preventDefault();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome To Go Fish!</h1>
        </header>
        <br/>
        <p> Name: </p>
        <form onSubmit={this.handleSubmit}>
          <input type="text" name="name" required="" value={this.state.value} onChange={this.handleChange}/>
          <input type="submit" value="Submit"/>
        </form>
      </div>
    );
  }
}

export default JoinGame;
