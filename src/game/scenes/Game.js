import { Scene, GameObjects } from 'phaser';
import Seagull from '../objects/Seagull';

export class Game extends Scene
{
    constructor ()
    {
        super('Game');
    }

    create ()
    {
        //this.cameras.main.setBackgroundColor(0x00ff00);

        this.add.image(512, 384, 'background-beach'); //image is 800 x 600, can be changed
        this.add.image(512, 384, 'icecreamvan');
        this.add.image(202, 565, 'nest').setScale(0.5);

        this.player = new Seagull(this, 300, 300);

        // debug, prints the mouse pos on click
        this.input.on('pointerdown', () => {console.log(this.input.mousePointer.x, this.input.mousePointer.y);});
    }
}
