import React  from 'react';
import './App.css';
import './index.css';

class GameLog extends React.Component {

  render() {
        return (
          <div>
          {this.props.log.map((name, index) =>
            <h4 key={`Log${index}`}>{name}</h4>
            )
          }
          </div>
        )
    }
}

export default GameLog;
