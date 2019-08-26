declare module 'boardgame.io/ui' {
  import * as React from 'react';
  interface ITokenCoord {
    x: number;
    y: number;
    originalX?: number;
    originalY?: number;
  }
  interface ITokenProps {
    x?: number;
    y?: number;
    z?: number;
    style?: React.CSSProperties;
    animate?: boolean;
    draggable?: boolean;
    shouldDrag?: (coord: ITokenCoord) => boolean;
    onDrag?: (coord: ITokenCoord) => void;
    onDrop?: (coord: ITokenCoord) => void;
    onClick?: (coord: ITokenCoord) => void;
    children?: any;
    animationDuration?: number;
    square?: string;
  }
  export class Token extends React.Component<ITokenProps, any> {
  }
  interface IGridColorMap {
    [key: string]: string;
  }
  interface IGridProps {
    rows: number;
    cols: number;
    outline?: boolean;
    style?: React.CSSProperties;
    colorMap?: IGridColorMap;
    cellSize?: number;
    onClick: (coords: any) => void;
    children?: any;
  }
  export class Grid extends React.Component<IGridProps, any> {
  }
}

declare module 'boardgame.io/core' {
  export type IPlayer = '0' | '1';
  export class FlowObj {
    ctx: (players: number) => any;
    processGameEvent: (state: any, gameEvent: any) => any;
  }
  export class GameObj<TGameState> {
    processMove: (G: TGameState, action: any, ctx: any) => any;
    flow: FlowObj;
  }
  interface IGameCtx {
    numPlayer: number;
    turn: number;
    currentPlayer: IPlayer;
    currentPlayerMoves: number;
    gameover?: any;
  }
  interface IGameMoves<TGameState> {
    [key: string]: (G: TGameState, ctx: IGameCtx, ...args: any[]) => void;
  }
  interface IGameFlowPhase<TGameState> {
    name: string;
    allowedMoves: string[];
    endPhaseIf: (G: TGameState, ctx: IGameCtx) => boolean;
  }
  interface IGameFlowTrigger<TGameState> {
    conditon: (G: TGameState, ctx: IGameCtx) => boolean;
    action: (G: TGameState, ctx: IGameCtx) => any;
  }
  interface IGameFlow<TGameState> {
    movesPerTurn?: number;
    endGameIf: (G: TGameState, ctx: IGameCtx) => any;
    endTurnIf?: (G: TGameState, ctx: IGameCtx) => boolean;
    onTurnEnd?: (G: TGameState, ctx: IGameCtx) => void;
    triggers?: IGameFlowTrigger<TGameState>[];
    phases?: IGameFlowPhase<TGameState>[];
    optimisticUpdate?: (G: TGameState, ctx: IGameCtx, move: any) => boolean;
  }
  interface IGameArgs<TGameState> {
    name?: string;
    setup: (numPlayers: number) => TGameState;
    moves: IGameMoves<TGameState>;
    playerView?: (G: TGameState, ctx: IGameCtx, playerID: IPlayer) => any;
    flow?: IGameFlow<TGameState>;
  }
  export function Game<TGameState>(gameArgs: IGameArgs<TGameState>): GameObj<TGameState>;

  export class PlayerView {
    static STRIP_SECRETS: any;
  }
}

declare module 'boardgame.io/react' {
  import { GameObj, IGameCtx } from 'boardgame.io/core';
  export class WrapperBoard {
    moves: any;
    events: any;
    store: any;
  }
  interface IClientArgs {
    game: any;
    numPlayer?: number;
    board?: React.ReactNode;
    multiplayer?: { server: string };
    debug?: boolean;
    ai?: any;
  }
  export function Client(clientArgs: IClientArgs): WrapperBoard;
}

declare module 'boardgame.io/ai' {
  import { IGameCtx } from 'boardgame.io/core';
  interface IAIMoveObj {
    move: string;
    args: any[];
  }
  interface IAIArgs<TGameState> {
    enumerate: (G: TGameState, ctx: IGameCtx) => IAIMoveObj[];
  }
  export function AI<TGameState>(aiArgs: IAIArgs<TGameState>): any;
}

declare module 'boardgame.io/client' {
  import { GameObj, IGameMoves } from 'boardgame.io/core';
  export class WrapperBoard {
    moves: any;
    events: any;
    store: any;
  }
  interface IClientArgs {
    game: any;
    numPlayer?: number;
    board?: React.ReactNode;
    multiplayer?: boolean;
    debug?: boolean;
    ai?: any;
  }
  export function Client(clientArgs: IClientArgs): WrapperBoard;
}

declare module 'boardgame.io/server' {
  import { GameObj } from 'boardgame.io/core';
  import * as Koa from 'koa';
  interface IServerArgs<TGameState> {
    games: GameObj<TGameState>[]
  }
  export function Server<TGameState>(serverArgs: IServerArgs<TGameState>): Koa;
  //export = Server;
}
