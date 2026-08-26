import { Scene, GameObjects } from 'phaser';
import Seagull from '../objects/Seagull';
import Food from '../objects/Food';
import Util from '../util';

export class Game extends Scene
{
    constructor () {
        super('Game');
    }

    create () {
        this.add.image(400, 300, 'background-beach');
        this.add.image(400, 300, 'icecreamvan');
        this.add.image(100, 480, 'nest').setScale(0.5);

        // demo man walking sprite - delete once man object exists
        this.man = this.add.sprite(300, 300, 'man-walk');
        this.anims.create({
            key: 'man-walking',
            frames: this.anims.generateFrameNumbers('man-walk', { start: 1, end: 2 }),
            frameRate: 6,
            repeat: -1
        });
        this.man.play('man-walking');

        // create a random assortment of foods
        this.foods = [];
        for (let i = 0; i < 10; i++) {
            let food = new GameObjects.Sprite(
                this,
                Util.randInt(this.scale.width),
                Util.randInt(this.scale.height),
                // just a bunch of placeholder images for now
                Util.randNth(['lollipop', 'fish-n-chips', 'pasty'])
            );
            this.add.existing(food);
            this.physics.add.existing(food);
            this.foods.push(food);
        }

        this.player = new Seagull(this);

        // collider for seagull grabbing food items
        this.physics.add.overlap(
            this.player,
            this.foods,
            (p, f) => {
                p.grab(f);
            }
        );

        // debug, prints the mouse pos on click
        this.input.on('pointerdown', () => {console.log(this.input.mousePointer.x, this.input.mousePointer.y);});
    }
}
