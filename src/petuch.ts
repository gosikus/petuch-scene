import * as _ from "lodash";

export interface Petuch {
    characteristics: Characteristics;
    skills: Skill[];
}

export interface Characteristics {
    health: number;
    strength: number;
    // lucky: number;
    // critical_chance: number;
    // critical_factor: number;
    // agility: number; // уклонение
    // accuracy: number;
    // survivability: number;
}

export interface Skill {
    actionType: ActionType;
    level: number;
}

export enum ActionType {
    PunchAction = 1,
}

export interface InitialParams {
    seed: string;
    player1: Petuch;
    player2: Petuch;
}

export function getInitialParams(): InitialParams {
    const player1 = {
        characteristics: {
            health: 50,
            strength: 20,
        },
        skills: [
            {
                actionType: ActionType.PunchAction,
                level: 1,
            },
        ],
    } as Petuch;

    const player2 = {
        characteristics: {
            health: 55,
            strength: 18,
        },
        skills: [
            {
                actionType: ActionType.PunchAction,
                level: 1,
            },
        ],
    } as Petuch;
    return {
        seed: '0x1A46F81B973574',
        player1,
        player2,
    };
}

export function processFullGame(initialParams: InitialParams): Turn[] {
    const turns = [];
    const randomizer = new Randomizer(initialParams.seed);

    let winner: number | undefined;
    while (winner === undefined) {
        const newTurn = processTurn(initialParams, turns, randomizer);
        turns.push(newTurn);
        winner = newTurn.winner;
    }
    return turns;
}

function processTurn(
    initialParams: InitialParams,
    turns: Turn[],
    randomizer: Randomizer
): Turn {
    let playerTurn;
    let attacker: Petuch;
    let defender: Petuch;
    if (turns.length === 0) {
        // first turn
        playerTurn = randomizer.random(2);
        if (playerTurn === 0) {
            attacker = _.cloneDeep(initialParams.player1);
            defender = _.cloneDeep(initialParams.player2);
        } else {
            attacker = _.cloneDeep(initialParams.player2);
            defender = _.cloneDeep(initialParams.player1);
        }
    } else {
        const lastTurn = turns[turns.length - 1];
        // const lastTurnPlayer = lastTurn.playerTurn;
        // const lastTurnPlayer2 = turns[turns.length-1].playerTurn;

        playerTurn = 1 - lastTurn.playerTurn;
        if (playerTurn === 0) {
            attacker = _.cloneDeep(lastTurn.actionState.player1);
            defender = _.cloneDeep(lastTurn.actionState.player2);
        } else {
            attacker = _.cloneDeep(lastTurn.actionState.player2);
            defender = _.cloneDeep(lastTurn.actionState.player1);
        }
    }

    const attackerPunchSkill = attacker.skills.find(
        (elem) => elem.actionType === ActionType.PunchAction
    );
    if (attackerPunchSkill === undefined) {
        throw new Error('Petuch has no punch skill!!!');
    }
    const damage =
        attacker.characteristics.strength +
        randomizer.random(attackerPunchSkill.level);
    defender.characteristics.health -= damage;

    let winner;

    if (defender.characteristics.health <= 0) {
        defender.characteristics.health = 0;
        winner = playerTurn;
    }

    return {
        playerTurn,
        actionState: {
            player1: playerTurn === 0 ? attacker : defender,
            player2: playerTurn ? attacker : defender,
            action: ActionType.PunchAction,
        },

        winner: winner,
    };
}

export interface Turn {
    playerTurn: number; // 0 or 1
    actionState: ActionState;
    winner: number | undefined; // 0 or 1 or undefined
}

export interface ActionState {
    player1: Petuch;
    player2: Petuch;
    action: ActionType;
}

class Randomizer {
    seed: number[];
    index: number;

    constructor(seed: string) {
        if (seed.startsWith('0x')) {
            this.seed = hexToBytes(seed.substr(2));
        } else {
            this.seed = hexToBytes(seed);
        }
        this.index = 0;
    }

    random(maxValue: number): number {
        let result = 0;

        for (let i = 0; i < 4; i++) {
            result = (result << 8) + this.seed[this.index];
            if (this.index + 1 === this.seed.length) {
                this.index = 0;
            } else {
                this.index += 1;
            }
        }
        return result % maxValue;
    }
}

function hexToBytes(hex: string) {
    const bytes = [];
    for (let i = 0; i < hex.length; i += 2)
        bytes.push(parseInt(hex.substr(i, 2), 16));
    return bytes;
}
