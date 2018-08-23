import Phaser from 'phaser';

import { SCENE } from '../constants';
import { GameScene } from './game-scene';

export class ResultScene extends GameScene
{
    constructor()
    {
        super({ key: SCENE.RESULT, active: false });
    }

    create()
    {
        this.scene.start(SCENE.PLATFORM);
    }
}