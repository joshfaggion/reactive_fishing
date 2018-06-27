import React  from 'react';
import './App.css';
import './index.css';
import Hand from './Hand'

class HumanPlayer extends React.Component {

  handleSubmit(event) {
    // Using this to fetch data sent from the form
    fetch('/request', {
      // This tells it to use a post method.
      method: 'POST',
      body: JSON.stringify({
        targetPlayer: this.props.targetPlayer,
        targetCard: this.props.targetCard
      })
    });
    event.preventDefault();
  }

  render() {
    if (this.props.targetPlayer !== "" && this.props.targetCard !== "") {
      return (
        <div>
        <p>Click on a card, and a player to make your card request. Then, click Submit to enter your request.</p>
          <form onSubmit={this.handleSubmit.bind(this)}>
            <input type="submit" value="Submit Your Card Request"/>
          </form>
            <h1>{this.props.name}</h1>
            <Hand turn={this.props.turn} targetCard={this.props.targetCard} playerCards={this.props.playerHand} selectCard={this.props.selectCard.bind(this)}/>
        </div>
      )
    } else {
      if (this.props.turn === 1) {
        return (
          <div>
            <p>Click on a card, and a player to make your card request. Then, click Submit to enter your request.</p>
            <h1>{this.props.name}</h1>
            <Hand turn={this.props.turn} targetCard={this.props.targetCard} playerCards={this.props.playerHand} selectCard={this.props.selectCard.bind(this)}/>
          </div>
        )
      } else {
        return (
          <div>
            <h1>{this.props.name}</h1>
            <Hand turn={this.props.turn} targetCard={this.props.targetCard} playerCards={this.props.playerHand} selectCard={this.props.selectCard.bind(this)}/>
          </div>
        )
      }
    }
  }
}

export default HumanPlayer;
