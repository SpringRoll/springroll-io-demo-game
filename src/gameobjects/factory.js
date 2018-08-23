import Phaser from 'phaser';
import { Debugger } from 'springroll';

/**@typedef {{x:Number, y:Number, width:Number, height:Number}} PlatformConfig  */

export class Factory
{
    /**
     * Creates an instance of Factory.
     * @param  {Phaser.Scene} scene 
     * @memberof Factory
     */
    constructor(scene)
    {
        this.scene = scene; 
    }

    /**
     * Creates a building with static platforms
     * @param  {Phaser.Physics.Arcade.Group} group 
     * @param  {Number} x 
     * @param  {Number} y 
     * @param  {String} key 
     * @param  {PlatformConfig} platforms 
     * @return {Phaser.GameObjects.Image}
     * @memberof Factory
     */
    createBuilding(group, {x, y, key, platforms = [] })
    {
        const image = this.scene.add.image(x, y, key);

        image.platforms = [];
        for (let i = 0; i < platforms.length; i++) 
        {
            const config = platforms[i];
            const ox = config.x + x;
            const oy = config.y + y;
            image.platforms.push(
                this.createStaticPlatform(group, { x: ox, y: oy, width: config.width, height: config.height })
            );
        }
        return image;
    }

    /**
     * 
     * @param  {Phaser.Physics.Arcade.Group} group 
     * @param  {Number} x 
     * @param  {Number} y 
     * @param  {Number} width 
     * @param  {Number} height 
     * @return {Phaser.Physics.Arcade.Sprite}
     * @memberof Factory
     */
    createStaticPlatform(group, {x, y, width, height })
    {
        const rx = x - width / 2, ry = y - height / 2;

        const sprite = this.scene.physics.add.staticSprite(rx, ry);
        sprite.body.setSize(width, height).setOffset(16, 16);

        // Only Collide with top
        sprite.body.checkCollision.down = false;
        sprite.body.checkCollision.left = false;
        sprite.body.checkCollision.right = false;

        group.add(sprite);

        /* Debug Draw Platform 
        const debugView = this.scene.add.graphics();
        debugView.fillStyle(0x222222, 0.8);
        debugView.fillRect(rx, ry, width, height);
        //*/

        return sprite;
    }

    /**
     * @param  {Phaser.Physics.Arcade.Group} group 
     * @param  {Number} x 
     * @param  {Number} y 
     * @return {Phaser.Physics.Arcade.Sprite}
     * @memberof Factory
     */
    createCollectible(group, { x, y })
    {
        const sprite = this.scene.physics.add.sprite(x, y, 'collectible');
        group.add(sprite);

        sprite.body.setBounceY(0.6);
        sprite.setCollideWorldBounds(true);

        sprite.anims.play('collectible-idle');
        //sprite.anims.setProgress(Math.random());

        return sprite;
    }
}