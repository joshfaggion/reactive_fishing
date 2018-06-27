import React from 'react';
import './App.css';
import Join from './Join'
import Game from './Game'
import NumPlayers from './NumPlayers'


class App extends React.Component {
  constructor() {
    super();
    this.state = {currentComponent: "Join"};
    this.updateState = this.updateState.bind(this);
  }

  updateState(str) {
    this.setState({currentComponent: str})
  }

  componentDidMount() {
    fetch('/component_to_render', {
      method: 'GET'
    }).then(info => info.json()).then((info) => {
      if (info['game_existing'] === true) {
        this.setState({
          currentComponent: "Game"
        });
      }
    });
  }

  render() {
    if (this.state.currentComponent === "Join") {
      return (
        <div>
          <Join updateState={this.updateState.bind(this)}/>
        </div>
      );
    } else if (this.state.currentComponent === "NumPlayers") {
      return (
        <div>
          <NumPlayers updateState={this.updateState.bind(this)}/>
        </div>
      );
    } else {
      return (
        <div>
          <Game/>
        </div>
      );
    }
  }
}
export default App;
