import { Game, PlayerView, IGameCtx } from 'boardgame.io/core';
import assert from 'power-assert';

export type GameState = {
  yubis: {
    '0': [number, number],
    '1': [number, number],
  }
}

const touch = (G: GameState, ctx: IGameCtx, myYubiIndex: number, opponentYubiIndex: number) => {
  const { currentPlayer } = ctx;
  const opponentPlayer = currentPlayer === '0' ? '1' : '0';
  assert(G.yubis[currentPlayer][myYubiIndex]);
  assert(G.yubis[opponentPlayer][opponentYubiIndex]);

  G.yubis[opponentPlayer][opponentYubiIndex] = (G.yubis[opponentPlayer][opponentYubiIndex] + G.yubis[currentPlayer][myYubiIndex]) % 5;
}
export const YubisenGame = Game<GameState>({
  name: 'yubisen',
  setup: () => {
    return {
      yubis: {
        '0': [1, 1],
        '1': [1, 1],
      },
    }
  },
  moves: {
    touch,
  },
  flow: {
    movesPerTurn: 1,
    // endTurnIf: () => { console.log('endTurnif'); return true },
    optimisticUpdate: () => false,
    endGameIf: (G, ctx) => {
      if (G.yubis['0'][0] === 0 && G.yubis['0'][1] === 0) {
        return { winner: '1' };
      }
      if (G.yubis['1'][0] === 0 && G.yubis['1'][1] === 0) {
        return { winner: '0' };
      }
    }
  },
})