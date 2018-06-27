import React  from 'react';
import './App.css';
import './index.css';

class RobotPlayer extends React.Component {

  render() {
        return (
          <div className='player-div'>
            <div>
              {this.props.cards.map((card, index) =>
                <img className='card-in-hand' key={`img${index}`} src={`img/cards/backs_blue.png`} alt="The back of a card"/>
                )
              }
            </div>
            <div>
            {this.props.matches.map((card, index) =>
              <img className='card-in-hand' key={`img${index}`} src={`img/cards/${card}.png`} alt="A card"/>
              )
            }
            </div>
          </div>
        )
    }
}

export default RobotPlayer;
