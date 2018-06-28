import React  from 'react';
import './App.css';
import './index.css';
import HiddenHand from './HiddenHand'

class RobotPlayer extends React.Component {

  correctPlayer(player) {
    if (this.props.targetPlayer === player) {
      return (
        <div onClick={() => {this.props.selectPlayer(this.props.name)}}>
          <h1 className="highlight">{this.props.name}</h1>
          <HiddenHand className="highlight" cards={this.props.cards} matches={this.props.matches} />
        </div>
      )
    } else {
      return (
        <div onClick={() => {this.props.selectPlayer(this.props.name)}}>
          <h1>{this.props.name}</h1>
          <HiddenHand cards={this.props.cards} matches={this.props.matches}/>
        </div>
      )
    }
  }

  render() {
    if (this.props.turn === 1) {
      console.log(this.props.name)
      return (
        <div className='player-div'>
          {this.correctPlayer(this.props.name)}
        </div>
      )
    } else {
      return (
        <div>
          <h1>{this.props.name}</h1>
          <HiddenHand cards={this.props.cards} matches={this.props.matches}/>
        </div>
      )
    }
  }
}

export default RobotPlayer;
