import Phaser from 'phaser';
import { Debugger } from 'springroll';

import { SCENE } from '../constants';

/** 
 * @typedef {import('../plugins/springroll-plugin').SpringrollPlugin} SpringrollPlugin 
 */

export class GameScene extends Phaser.Scene
{
    /**
     * Creates an instance of GameScene.
     * @param  {Phaser.Scenes.Settings.Config} config 
     * @memberof GameScene
     */
    constructor(config)
    {
        super(config)
        
        this.showPauseScreen = config.showPauseScreen;

        this.name = Object.freeze(config.key);

        /** @type SpringrollPlugin */
        this.springroll; // <-- this is injected by phaser.
    }

    create()
    {
        Debugger.log('info', `[${this.name}]`, ' -- CREATE -- ');
        if(this.showPauseScreen)
        {
            this.springroll.events.addListener('pause', this.onSpringrollPause, this);
        }     
        this.events.addListener('shutdown', this.shutdown, this);
    }

    onSpringrollPause(isPaused)
    {
        if(isPaused && this.showPauseScreen)
        {
            this.scene.pause();
            this.scene.launch(SCENE.PAUSE);
        }
        else
        {
            this.scene.resume();
            this.scene.stop(SCENE.PAUSE);
        }
    }

    shutdown()
    {
        Debugger.log('info', `[${this.name}]`, ' -- SHUTDOWN -- ');
        this.springroll.events.removeListener('pause', this.onSpringrollPause, this);
        this.events.removeListener('shutdown', this.shutdown, this);
    }
}