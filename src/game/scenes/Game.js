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
        this.cameras.main.setBackgroundColor(0x00ff00);

        this.add.image(512, 384, 'background-beach'); //image is 800 x 600, can be changed
        this.add.image(512, 384, 'icecreamvan');
        this.add.image(202, 565, 'nest').setScale(0.5);

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

        this.player = new Seagull(this, 300, 300);

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
