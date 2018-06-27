import React  from 'react';
import './App.css';
import './index.css';
import HumanPlayer from './HumanPlayer'
import RobotPlayer from './RobotPlayer'
import PlayingSpace from './PlayingSpace'
import GameLog from './GameLog'

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bots: [],
      playerName: "",
      playerCards: [],
      numOfPlayers: 0,
      gameLog: [],
      targetCard: '',
      targetPlayer: '',
      turn: 1
    };
  }

  selectCard(card) {
    let card_rank = card.slice(1)
    if (card_rank === "0") {
      card_rank = "10"
    }
    this.setState({
      targetCard: card_rank
    });
  }

  selectPlayer(player) {
    this.setState({
      targetPlayer: player
    })
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
    });
  }


  render() {
    const cards=this.state.playerCards
        return (
          <div className="App">
            <div className="holder">
              {this.state.bots.map((name, index) =>
                <RobotPlayer turn={this.state.turn} targetPlayer={this.state.targetPlayer} selectPlayer={this.selectPlayer.bind(this)} key={`Robot${index}`} cards={this.state.bots[index][1]} name={this.state.bots[index][0]} matches={this.state.bots[index][2]}/>
                )
              }
            </div>
            <div>
              <PlayingSpace />
            </div>
            <div>
              <HumanPlayer turn={this.state.turn} name={this.state.playerName} targetPlayer={this.state.targetPlayer} targetCard={this.state.targetCard} playerHand={cards} selectCard={this.selectCard.bind(this)}/>
            </div>
            <div className="game-log">
              <GameLog log={this.state.gameLog}/>
            </div>
          </div>
        )
    }
}

export default Game;
