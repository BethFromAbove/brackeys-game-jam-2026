import { Scene, Input } from 'phaser';
import Util from '../util';
import Seagull from '../objects/Seagull';
import NPC from '../objects/NPC';

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

        this.item = this.add.sprite(600, 100, 'chips');
        this.physics.add.existing(this.item);

        this.physics.add.overlap(
            this.player,
            this.item,
            (p, i) => {
                p.grab(i);
            }
        );

         let textConfig = {
            fontFamily: 'Arial Black', fontSize: 20, color: '#000000',
            //stroke: '#000000', strokeThickness: 8,
            align: 'left'
        };
        this.text1 = this.add.text(250, 200, 'Use arrow keys to walk around (try it!)', textConfig).setOrigin(0.5).setAlpha(0);
        this.text2 = this.add.text(250, 300, 'Press space to fly', textConfig).setOrigin(0.5).setAlpha(0);
        this.text3 = this.add.text(250, 400, 'Steal food from people', textConfig).setOrigin(0.5).setAlpha(0);
        this.text4 = this.add.text(500, 250, 'Land and bring it back to your nest', textConfig).setOrigin(0.5).setAlpha(0);
        this.text5 = this.add.text(500, 350, 'Defend your nest from vengeful humans', textConfig).setOrigin(0.5).setAlpha(0);
        this.text6 = this.add.text(500, 450, 'If they steal your entire home the game is over', textConfig).setOrigin(0.5).setAlpha(0);
        this.text7 = this.add.text(400, 550, 'Press Enter to play', textConfig).setOrigin(0.5).setAlpha(0);

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
        this.tweens.add({
            targets: [this.text3],
            alpha: 1,
            duration: 500,
            delay: 5000
        });
        this.tweens.add({
            targets: [this.text4],
            alpha: 1,
            duration: 500,
            delay: 7000
        });
        this.tweens.add({
            targets: [this.text5],
            alpha: 1,
            duration: 500,
            delay: 9000
        });
        this.tweens.add({
            targets: [this.text6, this.text7],
            alpha: 1,
            duration: 500,
            delay: 11000
        });

        this.enterKey = this.input.keyboard.addKey(Input.Keyboard.KeyCodes.ENTER);
        this.enterKey.on('down', () => {
            this.musicArray.forEach((item) => {
                item.stop();
            });
            this.scene.start('Game');
        });
    }
}