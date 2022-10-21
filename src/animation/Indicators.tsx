import React, {FC} from 'react';
import "./indicators.css"
import {Petuch} from "../petuch";

interface Props {
    maxHp: number;
    petuch: Petuch
}

const Indicators:FC<Props> = (props) => {

    return (
        // <div className="indicators_block">
        //     <div className="indicators_block_photo"></div>
        //     <div className="indicators_block_acts"></div>
        // </div>


        <div className="indicators_block">
            <div className="indicators_block_portrait">
                <div className="portrait-photo"></div>
                <div className="portrait-infoblock">

                    <div className="portrait-info" data-tooltip="Всплывающая подсказка">iii</div>
                    <div className="portrait-XP">{props.petuch.characteristics.health}/{props.maxHp}</div>
                </div>

            </div>
            <div className="indicators_block_acts">
                <div className="acts-name">petuch</div>

                <div className="acts-capabilities">
                    {/*<div className="capability_hover">fdgdasgagadg</div>*/}
                    <div className="capability" data-tooltip="пропсы"></div>
                    <div className="capability" data-tooltip="пропсы"></div>
                    <div className="capability" data-tooltip="пропсы"></div>
                </div>
            </div>
        </div>



    );
};

export default Indicators;