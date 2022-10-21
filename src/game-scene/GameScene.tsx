import React, {useState} from 'react';
import Sprite from "../animation/sprite";
import "./game-scene.css"
import Indicators from "../animation/Indicators";
import {getInitialParams, processFullGame} from "../petuch";

const GameScene = () => {
    const idleAnimation = 'assets/chicken/idle';
    const initParams = getInitialParams();
    const fullGame = processFullGame(initParams);

    const [petuch1, setPetuch1] = useState(initParams.player1)
    const [petuch2, setPetuch2] = useState(initParams.player2)
    let turnIndex = -1;

    const startHandler=()=>{
        const getNextTurn = () =>{
            if (turnIndex>=fullGame.length) {
                clearInterval(myInterval);
                return
            }
            if (turnIndex >= 0) {
                const p1 = fullGame[turnIndex].actionState.player1;
                const p2 = fullGame[turnIndex].actionState.player2;
                setPetuch1(p1);
                setPetuch2(p2);
            }
            if (turnIndex < fullGame.length){
                turnIndex++;

            }
            console.log(turnIndex)
        };
        const myInterval = setInterval(getNextTurn,1000)
    }
    return (
         <div className="game-scene">
             <button onClick={startHandler}>начало игры</button>
             <div className="game-scene_element indicators">
                 <Indicators
                     maxHp={initParams.player1.characteristics.health}
                     // petuch={petuch1}
                     petuch={petuch1}
                 />
                 <Indicators
                     maxHp={initParams.player2.characteristics.health}
                     petuch={petuch2}
                 />

             </div>
             <div className="game-scene_element petuchs">
                 <Sprite srcDir={idleAnimation}
                         framesAmount={13}
                         tile={{ width: 32, height: 34 }}
                         sizeCoeff={2}
                         scaleX={-1}
                         framesPerStep={4}/>
                 <Sprite srcDir={idleAnimation}
                         framesAmount={13}
                         tile={{ width: 32, height: 34 }}
                         sizeCoeff={2}
                         scaleX={1}
                         framesPerStep={5}/>
             </div>
             </div>


    );
};

export default GameScene;