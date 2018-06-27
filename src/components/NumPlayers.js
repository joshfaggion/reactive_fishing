import React  from 'react';
import './App.css';
import logo from './jb.png';
import './index.css';

class NumPlayers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''}
  }

  handleChange(event) {
    // Setting the state to the correct value.
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    // Using this to fetch data sent from the form
    fetch('/num_of_players', {
      // This tells it to use a post method.
      method: 'POST',
      body: JSON.stringify({
        numOfPlayers: this.state.value
      })
    }).then(response => this.props.updateState("Game"));
    event.preventDefault();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">-Join Game-</h1>
        </header>
        <br/>
        <p> Number Of Players: </p>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <input type="number" name="players" required="" min="3" max="6" value={this.state.value} onChange={this.handleChange.bind(this)}/>
          <input type="submit" value="Submit"/>
        </form>
      </div>
    )
  }
}

export default NumPlayers;
