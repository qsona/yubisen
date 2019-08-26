import React from 'react';
import logo from './logo.svg';
import './App.css';
import Yubi from './components/yubi';

import { Client } from 'boardgame.io/react';
import { Game } from 'boardgame.io/core';
import { YubisenGame } from './Yubisen';

const YubiBoard: React.FC = () => {
  return (
    <div>
      <div style={{display: 'flex'}}>
        <Yubi number={1} hand={'right'} turn={'1'} />
        <Yubi number={1} hand={'left'} turn={'1'} />
      </div>
      <div style={{display: 'flex'}}>
        <Yubi number={1} hand={'left'} turn={'0'} />
        <Yubi number={1} hand={'right'} turn={'0'} />
      </div>
    </div>
  );
}

const App: any = Client({ game: YubisenGame, board: YubiBoard });

export default App;
