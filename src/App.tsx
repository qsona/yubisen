import React, { useState, createContext } from 'react';
import './App.css';
import Yubi from './components/yubi';
import { calcNextStates } from './YubisenAnalyzer';

import { Client } from 'boardgame.io/react';
import { Game, IGameCtx } from 'boardgame.io/core';
import { YubisenGame, GameState } from './Yubisen';

const DISPLAY_ANALYSIS = true;

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
  const { fromYubiIndex } = yubiSelectState;

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
      if (fromYubiIndex) {
        moves.touch(fromYubiIndex.hand, hand)
        SetYubiSelectState({ fromYubiIndex: null })
      }
    }
  }

  const nextStates = calcNextStates(G, ctx.currentPlayer);
  console.log(nextStates);

  return (
    <div>
      <div style={{ display: 'flex' }}>
        <Yubi number={yubis['1'][1]} hand={'right'} turn={'1'} onClick={() => handleYubiClick(1, '1')}
          className={(fromYubiIndex && fromYubiIndex.hand === 1 && fromYubiIndex.turn === '1') ? 'yubi-selected' : ''}
        />
        <Yubi number={yubis['1'][0]} hand={'left'} turn={'1'} onClick={() => handleYubiClick(0, '1')}
          className={(fromYubiIndex && fromYubiIndex.hand === 0 && fromYubiIndex.turn === '1') ? 'yubi-selected' : ''}
        />
      </div>
      <div style={{ display: 'flex' }}>
        <Yubi number={yubis['0'][0]} hand={'left'} turn={'0'} onClick={() => handleYubiClick(0, '0')}
          className={(fromYubiIndex && fromYubiIndex.hand === 0 && fromYubiIndex.turn === '0') ? 'yubi-selected' : ''}
        />
        <Yubi number={yubis['0'][1]} hand={'right'} turn={'0'} onClick={() => handleYubiClick(1, '0')}
          className={(fromYubiIndex && fromYubiIndex.hand === 1 && fromYubiIndex.turn === '0') ? 'yubi-selected' : ''}
        />
      </div>
    </div>
  );
}

const App: any = Client({ game: YubisenGame, board: YubiBoard });

export default App;
