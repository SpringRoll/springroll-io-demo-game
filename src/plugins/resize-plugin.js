import { SafeScaleManager } from "springroll";
import { GAMEPLAY } from '../constants'; 

/**
 * ResizePlugin, a Phaser Plugin to handle resizing using the SafeScaleManager.
 * This resizes the game canvas and captions element.
 * @extends Phaser.Plugins.BasePlugin
 */
export class ResizePlugin extends Phaser.Plugins.BasePlugin
{
    constructor(pluginManager)
    {
        super(pluginManager);
        this.captionsElement = document.getElementById("captions");
        this.safeScaleManager = new SafeScaleManager({
            width: GAMEPLAY.WIDTH,
            height: GAMEPLAY.HEIGHT,
            callback: function(resizeData) {
                console.log('This is called on window resize');
            
                console.log('game width is', resizeData.width);
                console.log('game height is', resizeData.height);
                console.log('game scale is', resizeData.scale);
            },
            callback: this.onWindowResize.bind(this)
        });

        
    }

    onWindowResize({ scaleRatio }) {
        this.game.canvas.style.width = `${GAMEPLAY.WIDTH * scaleRatio}px`;
        this.game.canvas.style.height = `${GAMEPLAY.HEIGHT * scaleRatio}px`;

        this.captionsElement.style.width = `${GAMEPLAY.WIDTH * scaleRatio}px`;
    }
}