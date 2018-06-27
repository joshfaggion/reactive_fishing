import React  from 'react';
import './App.css';
import './index.css';
import HumanPlayer from './HumanPlayer'
import RobotPlayer from './RobotPlayer'
import PlayingSpace from './PlayingSpace'

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bots: [],
      playerName: "",
      playerCards: [],
      numOfPlayers: 0,
      gameLog: []
    };
  }

  componentDidMount() {
    fetch('/game', {
      method: 'GET'
    }).then(info => info.json()).then((info) => {
      this.setState({
        playerName: info['player_name'],
        bots: info['bots'],
        numOfPlayers: info['num_of_players'],
        playerCards: info['player_cards'],
        turn: info['turn'],
        cardsLeftInDeck: info['cardsLeftInDeck'],
        gameLog: info['game_log']
      });
      console.log(this.state.bots)
    });
  }


  render() {
    const cards=this.state.playerCards
        return (
          <div className="App">
            <div className="holder">
              {this.state.bots.map((name, index) =>
                <RobotPlayer key={`Robot${index}`} cards={this.state.bots[index][1]} name={this.state.bots[index][0]} matches={this.state.bots[index][2]}/>
                )
              }
            </div>
            <div>
              <PlayingSpace />
            </div>
            <div>
              <HumanPlayer name={this.state.playerName} playerHand={cards}/>
            </div>
            <div className="game-log">
              <GameLog log={this.state.gameLog}/>
            </div>
          </div>
        )
    }
}

export default Game;
