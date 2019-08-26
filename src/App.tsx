import React, { useState, createContext } from 'react';
import logo from './logo.svg';
import './App.css';
import Yubi from './components/yubi';

import { Client } from 'boardgame.io/react';
import { Game, IGameCtx } from 'boardgame.io/core';
import { YubisenGame, GameState } from './Yubisen';

interface YubiBoardProps {
  G: GameState;
  ctx: IGameCtx;
  moves: any;
}

interface YubiState {
  fromYubiIndex: {
    turn: '0' | '1';
    hand: 0 | 1; //left is 0
  } | null;
}

const YubiBoard: React.FC<YubiBoardProps> = ({ G, ctx, moves }) => {
  const { yubis } = G;
  const initialYubiState = { fromYubiIndex: null }

  const [yubiSelectState, SetYubiSelectState] = useState<YubiState>(initialYubiState)

  const handleYubiClick = (hand: 0 | 1, turn: '0' | '1') => {
    if (yubis[turn][hand] === 0) {
      return;
    }

    if (ctx.currentPlayer === turn) {
      SetYubiSelectState({
        fromYubiIndex: {
          turn,
          hand,
        }
      })
    } else {
      const { fromYubiIndex } = yubiSelectState;
      if (fromYubiIndex) {
        moves.touch(fromYubiIndex.hand, hand)
        SetYubiSelectState({fromYubiIndex: null})
      }
    }
  }

  return (
    <div>
      <div style={{display: 'flex'}}>
        <Yubi number={yubis['1'][1]} hand={'right'} turn={'1'} onClick={() => handleYubiClick(1, '1')} />
        <Yubi number={yubis['1'][0]} hand={'left'} turn={'1'} onClick={() => handleYubiClick(0, '1')} />
      </div>
      <div style={{display: 'flex'}}>
        <Yubi number={yubis['0'][0]} hand={'left'} turn={'0'} onClick={() => handleYubiClick(0, '0')} />
        <Yubi number={yubis['0'][1]} hand={'right'} turn={'0'} onClick={() => handleYubiClick(1, '0')} />
      </div>
    </div>
  );
}

const App: any = Client({ game: YubisenGame, board: YubiBoard });

export default App;
