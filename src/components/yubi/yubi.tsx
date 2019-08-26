import React from 'react';
import FingerCount1 from './finger_count01.png';
import FingerCount2 from './finger_count02.png';
import FingerCount3 from './finger_count03.png';
import FingerCount4 from './finger_count04.png';
import './yubi.css';

export interface Props {
  number: number;
  turn: '0' | '1';
  hand: 'right' | 'left';
  onClick: () => void;
}

const Yubi: React.FC<Props> = ({ number, turn, hand, onClick }) => {
  let yubiImg = '';
  switch(number) {
    case 1:
      yubiImg = FingerCount1;
      break;
    case 2:
      yubiImg = FingerCount2;
      break;
    case 3:
      yubiImg = FingerCount3;
      break;
    case 4:
      yubiImg = FingerCount4;
      break;
  }

  const getClassName = (isRight: boolean, isGote: boolean) => {
    if (isRight && !isGote) {
      return 'yubi-sente-right';
    } else if (!isRight && isGote) {
      return 'yubi-gote-left';
    } else if (isRight && isGote) {
      return 'yubi-gote-right';
    } else {
      return ''; // sente-left, which is the default
    }
  }

  if (number === 0) {
    return null;
  }

  return (
    <div className={getClassName(hand === 'right', turn === '1')} onClick={onClick}>
      <img src={yubiImg} alt='yubi' />
    </div>
  );
}

export default Yubi;
