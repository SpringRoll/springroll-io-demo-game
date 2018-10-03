import Phaser from 'phaser';

import { SCENE } from '../constants';

import { GameScene } from './game-scene';
import { Factory } from '../gameobjects/factory';
import { Player } from '../gameobjects/player';

export class PlatformerScene extends GameScene
{
    constructor()
    {
        super({ key: SCENE.PLATFORM, active: false, showPauseScreen: true });
        this.factory = new Factory(this);
    }

    create()
    {
        super.create();
        this.createAnimations();

        this.add.image(320, 240, 'background');

        this.coinSound = this.sound.add('coin-fx');

        this.platforms = this.physics.add.staticGroup();

        const ground = this.platforms.create(320, 470, 'ground');
        ground.body.setOffset(0, 10);

        const buildingData = this.level.buildings;
        for (let i = 0; i < buildingData.length; i++)
        {
            const config = buildingData[i];
            this.factory.createBuilding(this.platforms, config)
        }

        this.collectibles = this.physics.add.group();
        const collectibleData = this.level.collectibles;

        this.total = collectibleData.length;
        this.current = 0;

        for (let i = 0; i < collectibleData.length; i++)
        {
            this.factory.createCollectible(this.collectibles, collectibleData[i]);
        }

        this.player = new Player(this, 300, 400);

        this.physics.add.collider(this.player.sprite, this.platforms);
        this.physics.add.collider(this.collectibles, this.platforms);

        this.physics.add.overlap(this.player.sprite, this.collectibles, this.collect, null, this);

        this.events.addListener('resume', this.resumed, this);
        this.springroll.events.addListener('sfxVolume', this.sfxVolume, this);

        window.addEventListener('blur', this.resetInput.bind(this));

        this.springroll.app.hints.clear();
        this.springroll.app.hints.add(() =>
        {
            this.springroll.playCaption('You can move using W,A,S,D or the Arrow Keys!');
        }, () =>
        {
            this.springroll.playCaption('Collect all the coins to win!');
        });
    }

    createAnimations()
    {
        if (this.anims.get('player-run'))
        {
            return;
        }

        this.anims.create(
        {
            key: 'player-run',
            frames: [
                { key: 'character', frame: 0 },
                { key: 'character', frame: 1 },
                { key: 'character', frame: 2 },
                { key: 'character', frame: 1 }
            ],
            frameRate: 6,
            repeat: -1
        });

        this.anims.create(
        {
            key: 'player-idle',
            frames: [
                { key: 'character', frame: 6 },
                { key: 'character', frame: 7 },
                { key: 'character', frame: 8 }
            ],
            frameRate: 0.2,
            repeat: -1
        });

        this.anims.create(
        {
            key: 'player-jump',
            frames: [
                { key: 'character', frame: 4 }
            ],
            frameRate: 4,
            repeat: -1
        });

        this.anims.create(
        {
            key: 'collectible-idle',
            frames: [
                { key: 'collectible', frame: 0 },
                { key: 'collectible', frame: 1 },
                { key: 'collectible', frame: 2 },
                { key: 'collectible', frame: 3 },
            ],
            frameRate: 10,
            repeat: -1
        });
    }

    init(data)
    {
        this.level = data.level;
    }

    collect(player, collectible)
    {
        collectible.disableBody(true, true);
        this.current++;
        this.coinSound.play();
        if (this.current === this.total)
        {
            this.scene.start(SCENE.RESULT);
        }
        else
        {
            this.springroll.playCaption('count', 0, { collectibles: (this.total - this.current) });
        }
    }

    update(time, delta)
    {
        this.player.update();
    }

    shutdown()
    {
        super.shutdown();
        window.removeEventListener('blur', this.resetInput.bind(this));
        this.events.removeListener('resume', this.resumed, this);
        this.springroll.events.removeListener('sfxVolume', this.sfxVolume, this);
    }

    resumed()
    {
        this.resetInput();
    }

    resetInput()
    {
        if (!this.player)
        {
            return;
        }

        this.player.keys.space.reset();
        this.player.keys.a.reset();
        this.player.keys.d.reset();

        this.player.keys.up.reset();
        this.player.keys.left.reset();
        this.player.keys.right.reset();
    }

    sfxVolume(value)
    {
        // In a production game this would be simplified into audio channels
        // for sfx, vo, etc...
        this.player.jumpSound.volume = value;
        this.coinSound.volume = value;
    }
}