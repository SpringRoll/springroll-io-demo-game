import Phaser from 'phaser';
import { SpeechSynth } from 'springroll';

import { SCENE, SPEECH } from '../constants';
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

        this.stringData = this.cache.json.get('strings');

        this.speaker = new SpeechSynth(SPEECH);

        this.captions.playCaption('welcome');
        this.time.addEvent({delay: 5000, callback: this.speechDelay, callbackScope: this });

        this.springroll.hints.clear();
        this.springroll.hints.add(() => {
            this.captions.playCaption('title-hint');
        });
    }

    speechDelay()
    {
    //    this.speaker.say(this.stringData.speechIntro);
    //    this.springroll.events.emit('speechSynthStart', { text: this.stringData.speechIntro });
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