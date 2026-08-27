import { Scene } from 'phaser';
import Util from '../util';

export class MainMenu extends Scene
{
    constructor ()
    {
        super('MainMenu');
    }

    create ()
    {
        this.music = this.sound.add('menu-music');
        this.music.play({loop: true});
        this.playSeagulEffects();

        this.add.image(400, 300, 'background');

        this.add.image(400, 300, 'seagull').setScale(0.5);

        this.add.text(400, 460, 'Main Menu', {
            fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5);


        this.input.once('pointerdown', () => {
            this.music.stop();
            this.seagullSounds.stop();
            this.scene.start('Game');
        });
    }

    playSeagulEffects() {
        this.seagullSounds = this.sound.add(Util.randNth(['seagulls-1', 'seagulls-2']));
        this.seagullSounds.play();
        this.seagullSounds.once('complete', this.playSeagulEffects, this);
    }
}
