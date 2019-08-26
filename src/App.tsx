import React from 'react';
import logo from './logo.svg';
import './App.css';

import { Client } from 'boardgame.io/react';
import { Game } from 'boardgame.io/core';
import { YubisenGame } from './Yubisen';

const App: any = Client({ game: YubisenGame });

export default App;
