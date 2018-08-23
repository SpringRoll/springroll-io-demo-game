import Phaser from 'phaser';

import { TitleScene } from './scenes/title-scene';
import { LoadingScene } from './scenes/loading-scene';
import { ResultScene } from './scenes/result-scene';
import { PlatformerScene } from './scenes/platformer-scene';
import { PauseScene } from './scenes/pause-scene';

import { SpringrollPlugin } from './plugins/springroll-plugin';

const config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    backgroundColor: '#6495ED', // <-- Cornflower Blue
    parent: 'content',
    plugins:
    {
        global: [
            { key: "SpringrollPlugin", plugin: SpringrollPlugin, start: true, mapping: 'springroll' },
        ]
    },
    physics:
    {
        default: 'arcade',
        arcade:
        {
            gravity: { y: 350 },
            debug: false
        }
    },
    scene: [LoadingScene, TitleScene, PlatformerScene, ResultScene, PauseScene]
}

const game = new Phaser.Game(config);