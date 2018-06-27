import React  from 'react';
import './App.css';
import './index.css';

class Hand extends React.Component {

  render() {
    const cards=this.props.playerCards
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

export default Hand;
