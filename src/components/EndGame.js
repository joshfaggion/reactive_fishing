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
        </div>
      )
    }
}

export default EndGame;
