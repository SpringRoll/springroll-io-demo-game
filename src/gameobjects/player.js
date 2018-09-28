import Phaser from 'phaser';

const DEAD_ZONE = 25;

export class Player
{
    /**
     * @param {Phaser.Scene} scene 
     * @param {Number} x 
     * @param {Number} y 
     */
    constructor(scene, x, y)
    {
        this.scene = scene;
        this.sprite = scene.physics.add.sprite(x, y, 'character');

        this.sprite.body.setBounceY(0.1);
        this.sprite.setCollideWorldBounds(true);

        this.jumpSound = scene.sound.add('jump-fx');

        const { SPACE, A, D, UP, LEFT, RIGHT } = Phaser.Input.Keyboard.KeyCodes;
        this.keys = scene.input.keyboard.addKeys(
        {
            space: SPACE,
            a: A,
            d: D,
            up: UP,
            left:LEFT,
            right: RIGHT
        });
    }

    update()
    {
        if (!this.sprite.body)
        {
            return;
        }

        this.move();
        this.animate();
    }

    move()
    {
        const keys = this.keys;
        const sprite = this.sprite;

        if (keys.a.isDown || keys.left.isDown)
        {
            sprite.setVelocityX(-160);
        }
        else if (keys.d.isDown || keys.right.isDown)
        {
            sprite.setVelocityX(160);
        }
        else
        {
            sprite.setVelocityX(0)
        }

        if (sprite.body.touching.down && (keys.space.isDown || keys.up.isDown ))
        {
            this.jumpSound.play();
            sprite.setVelocityY(-250);
        }
    }

    animate()
    {
        const sprite = this.sprite;

        if (sprite.body.touching.down)
        {
            if (sprite.body.velocity.x > DEAD_ZONE)
            {
                sprite.anims.play('player-run', true);
                sprite.flipX = false;
            }
            else if (sprite.body.velocity.x < -DEAD_ZONE)
            {
                sprite.anims.play('player-run', true);
                sprite.flipX = true;
            }
            else
            {
                sprite.anims.play('player-idle', true);
            }
        }
        else
        {
            if (sprite.body.velocity.x > DEAD_ZONE)
            {
                sprite.flipX = false;
            }
            else if (sprite.body.velocity.x < -DEAD_ZONE)
            {
                sprite.flipX = true;
            }

            if (sprite.body.velocity.y < -DEAD_ZONE)
            {
                sprite.anims.play('player-jump');
            }
        }
    }
}