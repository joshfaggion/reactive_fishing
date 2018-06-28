import React  from 'react';
import './App.css';
import './index.css';

class Hand extends React.Component {

  cardClicked (card) {
    return "The card was " + card
  }

  renderCorrectCard(card, index) {
    if (this.props.targetCard === card.slice(1)) {
      return (
        <img className="highlight" key={`img${index}`} src={`img/cards/${card}.png`} alt="A card" onClick={() => {this.props.selectCard(card)}}/>
      )
    } else {
      return (
        <img key={`img${index}`} src={`img/cards/${card}.png`} alt="A card" onClick={() => {this.props.selectCard((card))}}/>
      )
    }
  }

  render() {
    const cards=this.props.playerCards
      if (this.props.turn === 1) {
        return (
          <div>
          {cards.map((card, index) =>
            this.renderCorrectCard(card, index)
            )
          }
          </div>
        )
      } else {
        console.log("inside the else loop.")
        return (
          <div>
          {cards.map((card, index) =>
            <img key={`img${index}`} src={`img/cards/${card}.png`} alt="A card"/>
            )
          }
          </div>
        )
      }
    }
}

export default Hand;
