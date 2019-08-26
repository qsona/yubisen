import React from 'react';
import logo from './logo.svg';
import './App.css';
import Yubi from './components/yubi';

import { Client } from 'boardgame.io/react';
import { Game } from 'boardgame.io/core';
import { YubisenGame, GameState } from './Yubisen';

interface YubiBoardProps {
  G: GameState;
}

const YubiBoard: React.FC<YubiBoardProps> = ({ G }) => {
  const { yubis } = G;

  return (
    <div>
      <div style={{display: 'flex'}}>
        <Yubi number={yubis['1'][1]} hand={'right'} turn={'1'} />
        <Yubi number={yubis['1'][0]} hand={'left'} turn={'1'} />
      </div>
      <div style={{display: 'flex'}}>
        <Yubi number={yubis['0'][0]} hand={'left'} turn={'0'} />
        <Yubi number={yubis['0'][1]} hand={'right'} turn={'0'} />
      </div>
    </div>
  );
}

const App: any = Client({ game: YubisenGame, board: YubiBoard });

export default App;
