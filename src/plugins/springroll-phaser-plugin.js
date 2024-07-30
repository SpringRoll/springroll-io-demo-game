import Phaser from 'phaser';
import { Application } from 'springroll';
import { GAMEPLAY, SCENE, PLUGIN_NAME } from '../constants';

// the easiest way to treat an Application as if it were a phaser plugin
// is to extend Application then implement the plugin functions:
// -- init, boot, start, stop, destroy
// also have a PluginManager param in the constructor.

/**
 * @export
 * @class ApplicationPlugin
 * @extends Application
 */
export class SpringrollPhaserPlugin extends Application
{
    /**
     * Creates an instance of ApplicationPlugin.
     * @param  {Phaser.Plugins.PluginManager} pluginManager 
     * @memberof SpringrollPhaserPlugin
     */
    constructor(pluginManager)
    {
        super(
        {
            features:
            {
                captions: true,
                sound: true,
                sfx: true
            }
        });
        this.pluginManager = pluginManager;
        this.game = pluginManager.game;
    }

    init()
    {
        this.captionsPlugin = this.pluginManager.get(PLUGIN_NAME.CAPTIONS)

        this.captionsPlugin.setContainer(this.container);
        // wait for the app to be ready, then set the initial scene  
        this.state.ready.subscribe(() =>
        {
            this.game.scene.start(GAMEPLAY.INITIAL_SCENE)
        });

        // handle necessary springroll states.
        this.state.pause.subscribe((current) =>
        {
            if(current)
            {
                this.game.scene.pause(SCENE.GAME);
            }
            else
            {
                this.game.scene.resume(SCENE.GAME);
            }
        });

        this.state.soundVolume.subscribe((current) =>
        {
            this.game.sound.volume = current;
            this.container.send('soundMute', (current == 0) ? true : false); // <-- this is only for the live update demo
            
        });

        this.state.sfxVolume.subscribe((current) =>
        {
            this.container.send('sfxMute', (current == 0) ? true : false); // <-- this is only for the live update demo           
        });
 
        this.state.captionsMuted.subscribe((isMuted) =>
        {
            this.captionsPlugin.setMute(isMuted);
        });
    }

    start() {}
    stop() {}

    destroy()
    {
        this.pluginManager = null
        this.game = null
    }
}