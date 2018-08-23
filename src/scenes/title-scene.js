import Phaser from 'phaser';

import { SCENE } from '../constants';
import { GameScene } from './game-scene';

export class TitleScene extends GameScene
{
    constructor()
    {
        super({ key: SCENE.TITLE, active: false });
    }

    create()
    {
        super.create();

        this.add.image(320, 240, 'title');
        this.add.image(320, 340, 'button');

        const { ENTER } = Phaser.Input.Keyboard.KeyCodes;
        this.keys = this.input.keyboard.addKeys(
        {
            enter: ENTER
        });

        this.springroll.playCaption('welcome');
    }

    update()
    {
        if (this.keys.enter.isDown)
        {
            const level = this.cache.json.get('level1');
            this.scene.start(SCENE.PLATFORM, { 'level': level });
        }
    }
}