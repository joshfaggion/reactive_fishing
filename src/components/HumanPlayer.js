import React  from 'react';
import './App.css';
import './index.css';
import Hand from './Hand'

class HumanPlayer extends React.Component {

  handleSubmit(event) {
    event.preventDefault();
    // Using this to fetch data sent from the form
    fetch('/request', {
      // This tells it to use a post method.
      method: 'POST',
      body: JSON.stringify({
        targetPlayer: this.props.targetPlayer,
        targetCard: this.props.targetCard,
        currentPlayer: this.props.name
      })
    }).then(info => info.json()).then((info) => {
        this.props.updateState(info['message']);
        this.props.updateGameState()
    })
  }

  render() {
    if (this.props.targetPlayer !== "" && this.props.targetCard !== "" && this.props.turn === 1) {

      return (
        <div>
        <p>Click on a card, and a player to make your card request. Then, click Submit to enter your request.</p>
          <form onSubmit={this.handleSubmit.bind(this)}>
            <input type="submit" value="Submit Your Card Request"/>
          </form>
            <h1>{this.props.name}</h1>
            <Hand turn={this.props.turn} targetCard={this.props.targetCard} playerCards={this.props.playerHand} selectCard={this.props.selectCard.bind(this)}/>
            {this.props.playerMatches.map((card, index) =>
              <img key={`matchedcard${index}`} src={`img/cards/${card}.png`} alt="A card"/>
              )
            }
        </div>
      )
    } else {
      if (this.props.turn === 1) {
        return (
          <div>
            <p>Click on a card, and a player to make your card request. Then, click Submit to enter your request.</p>
            <h1>{this.props.name}</h1>
            <Hand turn={this.props.turn} targetCard={this.props.targetCard} playerCards={this.props.playerHand} selectCard={this.props.selectCard.bind(this)}/>
            {this.props.playerMatches.map((card, index) =>
              <img key={`matchedcard${index}`} src={`img/cards/${card}.png`} alt="A card"/>
            )
            }
          </div>
        )
      } else {
        return (
          <div>
            <h1>{this.props.name}</h1>
            <Hand turn={this.props.turn} targetCard={this.props.targetCard} playerCards={this.props.playerHand} selectCard={this.props.selectCard.bind(this)}/>
            {this.props.playerMatches.map((card, index) =>
              <img key={`matchedcard${index}`} src={`img/cards/${card}.png`} alt="A card"/>
              )
            }
          </div>
        )
      }
    }
  }
}

export default HumanPlayer;
