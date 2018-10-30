import Phaser from 'phaser';

import { LoadingScene, TitleScene, PlatformerScene, ResultScene, PauseScene } from './scenes';
import { ApplicationPlugin, CaptionsPlugin, FactoryPlugin } from './plugins';
import { PLUGIN_NAME, GAMEPLAY } from './constants';

const config = {
    type: Phaser.AUTO,
    width: GAMEPLAY.WIDTH,
    height: GAMEPLAY.HEIGHT,
    backgroundColor: '#6495ED', // <-- Cornflower Blue
    parent: 'content', // <-- html div to place canvas
    plugins:
    {
        global: [ // install plugins.
            { key: PLUGIN_NAME.FACTORY, plugin: FactoryPlugin, start: true },
            { key: PLUGIN_NAME.CAPTIONS, plugin: CaptionsPlugin, start: true, mapping: 'captions' },
            { key: PLUGIN_NAME.APPLICATION, plugin: ApplicationPlugin, start: true, mapping: 'springroll' }
        ]
    },
    physics:
    {
        default: 'arcade',
        arcade:
        {
            gravity: { y: GAMEPLAY.GRAVITY },
            debug: false
        }
    },
    scene: [LoadingScene, TitleScene, PlatformerScene, ResultScene, PauseScene]
}

const game = new Phaser.Game(config);