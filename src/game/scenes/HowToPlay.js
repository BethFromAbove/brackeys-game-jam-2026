import { Scene } from 'phaser';
import Util from '../util';
import Seagull from '../objects/Seagull';

export class HowToPlay extends Scene
{
    constructor ()
    {
        super('HowToPlay');
    }

    create ()
    {
        this.add.image(400, 300, 'howtoplay-bg');

        this.musicArray = this.sound.getAllPlaying();

        this.add.image(400, 300, 'icecreamvan');
        this.add.image(100, 480, 'nest').setScale(0.5);
        this.player = new Seagull(this);

         let textConfig = {
            fontFamily: 'Arial Black', fontSize: 20, color: '#000000',
            //stroke: '#000000', strokeThickness: 8,
            align: 'left'
        };
        this.text1 = this.add.text(200, 200, 'Use arrow keys to walk around', textConfig).setOrigin(0.5).setAlpha(0);
        this.text2 = this.add.text(200, 300, 'Press space to fly', textConfig).setOrigin(0.5).setAlpha(0);

        this.tweens.add({
            targets: [this.text1],
            alpha: 1,
            duration: 500,
            delay: 1000
        });
        this.tweens.add({
            targets: [this.text2],
            alpha: 1,
            duration: 500,
            delay: 3000
        });
    

        // @TODO: delay this so they can't skip the menu animatino
        this.input.once('pointerdown', () => {
            this.musicArray[0].stop();
            this.musicArray[1].stop();
            this.scene.start('Game');
        });
    }
}