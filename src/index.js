import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import JoinGame from './JoinGame';
import registerServiceWorker from './registerServiceWorker';




ReactDOM.render(<JoinGame />, document.getElementById('root'));
registerServiceWorker();
