import assert from 'assert';

// 局面
// 手番側(大), 手番側(小), 相手側(大), 相手側(小)
type State = [number, number, number, number];

// 局面に対する雑なハッシュ値
function stateToHashNum(state: State): number {
  const [x1, x2, y1, y2] = state;
  return (x1 << 9) | (x2 << 6) | (y1 << 3) | y2;
}

function hashNumToState(num: number): State {
  return [
    (num >> 9) & 7,
    (num >> 6) & 7,
    (num >> 3) & 7,
    num & 7,
  ];
}

enum Result {
  WIN = 1,
  LOSE = 2,
}

const dp: { [key: number]: Result | undefined } = {};
const deg: { [key: number]: number } = {};

// 全局面と、そこから出る枝の数を生成する
function calcInitialState() {
  for (let x2 = 0; x2 <= 4; x2++) {
    for (let x1 = x2; x1 <= 4; x1++) {
      if (x1 === 0 && x2 === 0) continue;
      for (let y2 = 0; y2 <= 4; y2++) {
        for (let y1 = y2; y1 <= 4; y1++) {
          if (y1 === 0 && y2 === 0) continue;
          const state: State = [x1, x2, y1, y2];
          const hashNum = stateToHashNum(state);
          deg[hashNum] = calcDeg(state);
        }
      }
    }
  }
}

// 局面から出る枝の数
function calcDeg(state: number[]): number {
  const [x1, x2, y1, y2] = state;
  let deg = 1;
  if (x2 !== 0 && x1 !== x2) deg *= 2;
  if (y2 !== 0 && y1 !== y2) deg *= 2;
  return deg;
}

calcInitialState();

// 参照: https://qiita.com/drken/items/4e1bcf8413af16cb62da#4-後退解析-サイクルによる引き分けのあるゲーム
const queue: State[] = [];

// 後退解析
function koutai() {
  // 勝敗が確定している局面を生成
  for (let y2 = 0; y2 <= 4; y2++) {
    for (let y1 = y2; y1 <= 4; y1++) {
      if (y1 === 0 && y2 === 0) continue;
      // 勝敗が確定している局面 ... 手番側の手が両方0
      const state: State = [0, 0, y1, y2];
      const hashNum = stateToHashNum(state);
      dp[hashNum] = Result.LOSE;
      queue.push(state);
    }
  }
  while (queue.length > 0) {
    const currentState = queue.pop()!;
    const currentHashNum = stateToHashNum(currentState);
    const prevStates = getPrevStates(currentState);
    for (const prevState of prevStates) {
      const prevHashNum = stateToHashNum(prevState);
      if (dp[prevHashNum] !== undefined) {
        continue;
      }

      assert(deg[prevHashNum] !== undefined, `undef ${prevState}`);
      deg[prevHashNum]--;
      if (dp[currentHashNum] === Result.LOSE) {
        dp[prevHashNum] = Result.WIN;
        queue.push(prevState);
      } else if (dp[currentHashNum] === Result.WIN && deg[prevHashNum] === 0) {
        dp[prevHashNum] = Result.LOSE;
        queue.push(prevState);
      }
    }
  }
}

function getPrevNum(x: number, y: number): number {
  assert(x !== y);
  if (x < y) return y - x;
  return y + 5 - x;
}

// 後退解析における、1つ前の局面を生成する
function getPrevStates(state: State): State[] {
  let [y1, y2, x1, x2] = state;
  const result: State[] = [];

  if (x1 !== y1) {
    const prevY1 = getPrevNum(x1, y1);
    result.push(prevY1 > y2 ? [x1, x2, prevY1, y2] : [x1, x2, y2, prevY1]);
  }
  if (x1 !== y2 && y1 !== y2) {
    const prevY2 = getPrevNum(x1, y2);
    result.push(y1 > prevY2 ? [x1, x2, y1, prevY2] : [x1, x2, prevY2, y1]);
  }
  if (x2 !== 0 && x1 !== x2) {
    if (x2 !== y1) {
      const prevY1 = getPrevNum(x2, y1);
      result.push(prevY1 > y2 ? [x1, x2, prevY1, y2] : [x1, x2, y2, prevY1]);
    }
    if (x2 !== y2 && y1 !== y2) {
      const prevY2 = getPrevNum(x2, y2);
      result.push(y1 > prevY2 ? [x1, x2, y1, prevY2] : [x1, x2, prevY2, y1]);
    }
  }
  return result;
}

koutai();

for (let hash of Object.keys(dp)) {
  console.log(`${hashNumToState(+hash)}, ${dp[+hash]}`)
}

