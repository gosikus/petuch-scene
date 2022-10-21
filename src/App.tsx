import React from 'react';
import {getInitialParams, processFullGame} from './petuch'
import './App.css';
import GameScene from "./game-scene/GameScene";


function App() {
  const initialParams = getInitialParams();
  const turns = processFullGame(initialParams);
  console.log(`Turns: ${turns.length}`)
  for (const turn of turns) {
    console.log(`Player turn: ${turn.playerTurn}`)
    console.log(`Player1 health: ${turn.actionState.player1.characteristics.health}`)
    console.log(`Player2 health: ${turn.actionState.player2.characteristics.health}`)
    console.log(`Winner: ${turn.winner}\n\n`)
  }
  return (
    <div className="App">
      <GameScene/>
    </div>
  );
}

export default App;
