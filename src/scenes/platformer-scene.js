import Phaser from 'phaser';

import { SCENE } from '../constants';

import { GameScene } from './game-scene';
import { Player } from '../gameobjects/player';

export class PlatformerScene extends GameScene
{
    constructor()
    {
        super({ key: SCENE.PLATFORM, active: false, showPauseScreen: true });
    }

    init(data)
    {
        this.level = data.level;
    }

    create()
    {
        super.create();
        this.createAnimations();

        this.add.image(320, 240, 'background');
        this.coinSound = this.sound.add('coin-fx');

        // Create Buildings
        this.platforms = this.physics.add.staticGroup();
        const ground = this.platforms.create(320, 470, 'ground');
        ground.body.setOffset(0, 10);

        const buildingData = this.level.buildings;
        for (let i = 0; i < buildingData.length; i++)
        {
            const config = buildingData[i];
            this.add.building(this.platforms, config)
        }

        // Create Collectibles
        this.collectibles = this.physics.add.group();
        const collectibleData = this.level.collectibles;

        this.total = collectibleData.length;
        this.current = 0;

        for (let i = 0; i < collectibleData.length; i++)
        {
            this.add.coin(this.collectibles, collectibleData[i]);
        }

        // Create Player
        this.player = new Player(this, 300, 400);

        // Setup physics
        this.physics.add.collider(this.player.sprite, this.platforms);
        this.physics.add.collider(this.collectibles, this.platforms);

        this.physics.add.overlap(this.player.sprite, this.collectibles, this.collect, null, this);

        // Setup Springroll Events
        this.events.addListener('resume', this.resumed, this);
        this.springroll.state.sfxVolume.subscribe(this.sfxVolume.bind(this));

        window.addEventListener('blur', this.resetInput.bind(this));

        // Add gameplay hints. in this case they're simple captions.
        this.springroll.hints.clear();
        this.springroll.hints.add(() =>
        {
            this.captions.playCaption('game-hint-1');
        }, () =>
        {
            this.captions.playCaption('game-hint-2');
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

    collect(player, collectible)
    {
        collectible.disableBody(true, true);
        this.current++;
        this.coinSound.play();
        if (this.current === this.total)
        {
            // Game Complete start results screen.
            this.scene.start(SCENE.RESULT);
        }
        else
        {
            // play caption with parameter data.
            this.captions.playCaption('count', 0, { collectibles: (this.total - this.current) });
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

        this.springroll.state.sfxVolume.unsubscribe(this.sfxVolume.bind(this));
        this.springroll.hints.clear();
    }

    resumed()
    {
        this.resetInput();
    }

    resetInput()
    {
        // this fixes a small bug with phaser3 input, 
        // where pausing and resuming can lock input.
        if (!this.player)
        {
            return;
        }
        this.player.resetInput();
    }

    sfxVolume(value)
    {
        // In a production game these would be simplified into audio channels
        // for sfx, vo, etc...
        this.player.jumpSound.volume = value;
        this.coinSound.volume = value;
    }
}