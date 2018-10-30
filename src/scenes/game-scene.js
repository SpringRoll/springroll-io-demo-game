import Phaser from 'phaser';
import { Debugger } from 'springroll';

import { SCENE } from '../constants';

/** 
 * @typedef {import('../plugins').ApplicationPlugin} ApplicationPlugin 
 * @typedef {import('../plugins').CaptionsPlugin} CaptionsPlugin 
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

        // these are the plugins injected into the scene by phaser.
        // this is just to help with auto complete.
        /** @type ApplicationPlugin */
        this.springroll; 
        /** @type CaptionsPlugin */
        this.captions;
    }

    create()
    {
        // if the scene can be paused listen for pause event.
        if(this.showPauseScreen)
        {
            this.springroll.state.pause.subscribe(this.onSpringrollPause.bind(this));
        }     
        this.events.addListener('shutdown', this.shutdown, this);
    }

    onSpringrollPause(isPaused)
    {
        // Handle pausing and resuming scene.
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
        this.springroll.state.pause.unsubscribe(this.onSpringrollPause.bind(this));
        this.events.removeListener('shutdown', this.shutdown, this);
    }
}