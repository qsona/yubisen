import { GameState } from './Yubisen';

const data: { [key: string]: number } = {
  '8': 1,
  '9': 1,
  '16': 1,
  '17': 1,
  '18': 1,
  '24': 1,
  '25': 1,
  '26': 1,
  '27': 1,
  '32': 1,
  '33': 1,
  '34': 1,
  '35': 1,
  '36': 1,
  '520': 0,
  '521': 1,
  '530': 1,
  '536': 1,
  '537': 1,
  '538': 1,
  '539': 1,
  '544': 0,
  '545': 1,
  '546': 0,
  '548': 1,
  '584': 0,
  '592': 0,
  '600': 0,
  '608': 0,
  '609': 0,
  '610': 0,
  '611': 0,
  '612': 0,
  '1032': 1,
  '1033': 1,
  '1040': 0,
  '1041': 1,
  '1042': 1,
  '1048': 0,
  '1050': 1,
  '1051': 1,
  '1057': 1,
  '1059': 0,
  '1060': 1,
  '1096': 0,
  '1112': 0,
  '1114': 0,
  '1120': 0,
  '1122': 0,
  '1160': 0,
  '1168': 0,
  '1176': 0,
  '1177': 0,
  '1178': 0,
  '1179': 0,
  '1184': 0,
  '1187': 0,
  '1545': 1,
  '1552': 0,
  '1553': 0,
  '1554': 1,
  '1560': 0,
  '1562': 1,
  '1563': 1,
  '1568': 1,
  '1569': 1,
  '1571': 1,
  '1572': 1,
  '1616': 0,
  '1617': 0,
  '1624': 0,
  '1632': 0,
  '1633': 0,
  '1672': 0,
  '1680': 0,
  '1681': 0,
  '1682': 0,
  '1688': 0,
  '1689': 0,
  '1690': 0,
  '1691': 0,
  '1696': 0,
  '1698': 0,
  '1699': 0,
  '1736': 0,
  '1744': 0,
  '1745': 0,
  '1746': 0,
  '1752': 0,
  '1754': 0,
  '1760': 0,
  '1762': 0,
  '2056': 0,
  '2057': 1,
  '2064': 1,
  '2066': 1,
  '2073': 0,
  '2074': 1,
  '2075': 1,
  '2080': 0,
  '2081': 1,
  '2082': 1,
  '2084': 1,
  '2120': 0,
  '2121': 0,
  '2128': 0,
  '2129': 0,
  '2136': 0,
  '2137': 0,
  '2144': 0,
  '2145': 0,
  '2146': 0,
  '2147': 0,
  '2148': 0,
  '2184': 0,
  '2192': 0,
  '2200': 0,
  '2209': 0,
  '2211': 0,
  '2248': 0,
  '2256': 0,
  '2265': 0,
  '2266': 0,
  '2272': 0,
  '2312': 0,
  '2313': 0,
  '2320': 0,
  '2321': 0,
  '2328': 0,
  '2329': 0,
  '2336': 0,
  '2337': 0
}

type Result = 'win' | 'lose' | 'draw' | null;

export function calcNextStates(game: GameState, currentPlayer: '0' | '1'): Result[] {
  // 0-0, 0-1, 1-0, 1-1
  const { yubis } = game;
  const opponentPlayer = currentPlayer === '0' ? '1' : '0';
  const me = yubis[currentPlayer];
  const opponent = yubis[opponentPlayer];
  return [
    calcStateResult(me, opponent, 0, 0),
    calcStateResult(me, opponent, 0, 1),
    calcStateResult(me, opponent, 1, 0),
    calcStateResult(me, opponent, 1, 1),
  ];
}

function calcStateResult(me: [number, number], opponent: [number, number], myIndex: number, opponentIndex: number): Result {
  if (!me[myIndex] || !opponent[opponentIndex]) {
    return null;
  }
  const nextOpponent = [opponent[0], opponent[1]] // clone
  nextOpponent[opponentIndex] = (me[myIndex] + nextOpponent[opponentIndex]) % 5

  console.log('me', me)
  const y1 = Math.max(me[0], me[1])
  const y2 = Math.min(me[0], me[1])
  const x1 = Math.max(nextOpponent[0], nextOpponent[1])
  const x2 = Math.min(nextOpponent[0], nextOpponent[1])

  const hashNum = (x1 << 9) | (x2 << 6) | (y1 << 3) | y2;
  console.log('-----------hashNum', hashNum, x1, x2, y1, y2);
  const result = data[String(hashNum)];
  return result === 0 ? 'lose' : result === 1 ? 'win' : 'draw'
}
