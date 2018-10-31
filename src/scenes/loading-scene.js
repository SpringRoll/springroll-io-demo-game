import Phaser from 'phaser';
import { Localizer, Debugger } from 'springroll';

import { SCENE, PATHS } from '../constants';
import { GameScene } from './game-scene';

export class LoadingScene extends GameScene
{
    constructor()
    {
        super({ key: SCENE.LOADING, active: false });
        this.localizer = new Localizer(PATHS);
    }

    preload()
    {
        Debugger.log('info', `[${this.name}] -- PRELOAD --`);


        // The following creates the loading progress bar.
        const progressBar = this.add.graphics();
        const progressBox = this.add.graphics();

        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(160, 210, 320, 50);

        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        const loadingText = this.make.text(
        {
            x: width / 2,
            y: height / 2 - 50,
            text: 'Loading...',
            style:
            {
                font: '20px monospace',
                fill: '#ffffff'
            }
        });
        loadingText.setOrigin(0.5, 0.5);

        const percentText = this.make.text(
        {
            x: width / 2,
            y: height / 2 - 5,
            text: '0%',
            style:
            {
                font: '18px monospace',
                fill: '#ffffff'
            }
        });
        percentText.setOrigin(0.5, 0.5);

        const assetText = this.make.text(
        {
            x: width / 2,
            y: height / 2 + 50,
            text: '',
            style:
            {
                font: '18px monospace',
                fill: '#ffffff'
            }
        });
        assetText.setOrigin(0.5, 0.5);

        // These update the bar and clean it up when loading is complete.
        this.load.on('progress', (value) =>
        {
            percentText.setText(parseInt(value * 100) + '%');
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(170, 220, 300 * value, 30);
        });

        this.load.on('fileprogress', (file) =>
        {
            Debugger.log('info', `[${this.name}] ${file.type} ${file.key}`);
            assetText.setText('Loading asset: ' + file.key);
        });

        this.load.on('complete', () =>
        {
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
            percentText.destroy();
            assetText.destroy();
            this.on_loadComplete();
        });

        // This is small game with very few assets
        // in a full-scale game you'd probably want to handle 
        // loading and unloading with a manifest file.
        this.load.image('title', './assets/common/title_bg.jpg');

        this.load.image('background', './assets/common/sky.png');

        this.load.image('ground', './assets/common/ground.png')
        this.load.image('house1', './assets/common/house1.png');
        this.load.image('house2', './assets/common/house2.png');
        this.load.image('house3', './assets/common/house3.png');
        this.load.image('house4', './assets/common/house4.png');
        this.load.image('tree', './assets/common/tree.png');

        this.load.image('small-platform', './assets/common/small-platform.png')

        this.load.spritesheet('character', './assets/common/character.png', { frameWidth: 32, frameHeight: 48 });
        this.load.spritesheet('collectible', './assets/common/collectible.png', { frameWidth: 32, frameHeight: 32 });

        this.load.json('level1', './assets/common/levels/level1.json')

        this.load.audio('jump-fx', ['./assets/common/audio/jump.mp3', './assets/common/audio/jump.ogg']);
        this.load.audio('coin-fx', ['./assets/common/audio/coin.mp3', './assets/common/audio/coin.ogg']);

        // These are using the localizer to grab the proper files based on the browsers language.
        const captionsResult = this.localizer.resolve('captions.json');
        this.load.json('captions', captionsResult.path);
        this.springroll.container.send('localizerResolve', captionsResult) // <-- this is only for the live update demo

        const stringsResult = this.localizer.resolve('strings.json');
        this.load.json('strings', stringsResult.path);
        this.springroll.container.send('localizerResolve', stringsResult) // <-- this is only for the live update demo

        // localizer works for any file type.
        const titleResult = this.localizer.resolve('title/button.png');
        this.load.image('button', titleResult.path);
        this.springroll.container.send('localizerResolve', titleResult) // <-- this is only for the live update demo
    }

    on_loadComplete()
    {
        // The captions plugin needs to be initialized after the data is loaded.
        const captionData = this.cache.json.get('captions');
        this.captions.setData(captionData);

        this.scene.start(SCENE.TITLE);
    }
}