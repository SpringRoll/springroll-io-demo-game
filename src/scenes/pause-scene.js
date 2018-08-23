import Phaser from 'phaser';

import { SCENE } from '../constants';
import { GameScene } from './game-scene';

export class PauseScene extends GameScene
{
    constructor()
    {
        super({ key: SCENE.PAUSE, active: false });
    }

    create()
    {
        super.create();
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;
        
        const pauseText = this.make.text(
        {
            x: width / 2 - 26,
            y: height / 2 - 100,
            text: 'PAUSE',
            style:
            {
                font: '20px monospace',
                fill: '#000000'
            }
        });

        this.springroll.events.emit("pauseScreenActive", true);
    }

    shutdown()
    {        
        super.shutdown();
        this.springroll.events.emit("pauseScreenActive", false);
    }
}