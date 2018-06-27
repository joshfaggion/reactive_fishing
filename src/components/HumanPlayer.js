import React  from 'react';
import './App.css';
import './index.css';
import Hand from './Hand'

class HumanPlayer extends React.Component {

  render() {
        return (
          <div>
            <h1>{this.props.name}</h1>
            <Hand playerCards={this.props.playerHand}/>
          </div>
        )
    }
}

export default HumanPlayer;
