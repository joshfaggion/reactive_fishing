import React  from 'react';
import './App.css';
import './index.css';
import HiddenHand from './HiddenHand'

class RobotPlayer extends React.Component {

  render() {
        return (
          <div className='player-div'>
            <h1>{this.props.name}</h1>
            <HiddenHand cards={this.props.cards} matches={this.props.matches}/>
          </div>
        )
    }
}

export default RobotPlayer;
