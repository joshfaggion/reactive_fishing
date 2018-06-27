import React  from 'react';
import './App.css';
import './index.css';

class PlayingSpace extends React.Component {

  render() {
        return (
          <div className='player-div playing-space'>
            <h1>-Go Fish Pile-</h1>
            <img src={`img/cards/backs_blue.png`} alt="The back of a card."/>
          </div>
        )
    }
}

export default PlayingSpace;
