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
        this.cameras.main.setBackgroundColor(0x00ff00);

        this.add.image(512, 384, 'background').setAlpha(0.5);

        this.input.once('pointerdown', () => {

            this.scene.start('GameOver');

        });

        this.player = new Seagull(this, 300, 300);
    }
}
