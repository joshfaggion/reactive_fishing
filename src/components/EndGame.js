import React  from 'react';
import './App.css';
import './index.css';

class EndGame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      winner: ''
    }

  }

  componentDidMount() {
    fetch('/winner', {
      method: 'GET'
    }).then(info => info.json()).then((info) => {
        this.setState({
          winner: info['message'],
        });
    })
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.updateState("Join");
  }


  render() {
      return (
        <div className='App'>
          <h1>{this.state.winner}</h1>
          <form onSubmit={this.handleSubmit.bind(this)}>
            <input type="submit" value='Start A New Game'/>
          </form>
          <h5>The game automatically plays the robot turns if the deck is out of cards, and you are out of cards.</h5>
          <h5>So do not be concerned if someone gets more points then you last saw that they had, they played the rest of the game and got some matches.</h5>
        </div>
      )
    }
}

export default EndGame;
