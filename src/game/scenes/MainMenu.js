import { Scene, Input } from 'phaser';
import Util from '../util';

export class MainMenu extends Scene
{
    constructor ()
    {
        super('MainMenu');
    }

    create ()
    {
        this.add.image(400, 300, 'menu-bg');

        this.music = this.sound.add('menu-music');
        this.music.play({loop: true});
        this.playSeagulEffects();

        this.menuGull = this.add.image(640, 850, 'menu-seagull').setScale(0.5);
        this.tweens.add({
            targets: this.menuGull,
            y: 500,
            duration: 600,
            ease: 'Elastic.easeOut',
            easeParams: [0.1, 0.8],
            delay: 3000
        });

        let titleConfig = {
            fontFamily: 'Arial Black', fontSize: 72, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'right'
        };
        this.titleTop = this.add.text(200, 70, 'Seagull', titleConfig).setOrigin(0.5).setAlpha(0);
        this.titleBottom = this.add.text(350, 160, 'Squabble', titleConfig).setOrigin(0.5).setAlpha(0);
        this.tweens.add({
            targets: [this.titleTop, this.titleBottom],
            alpha: 1,
            duration: 1000,
            delay: 5000
        });

        this.enterKey = this.input.keyboard.addKey(Input.Keyboard.KeyCodes.ENTER);
        this.enterKey.on('down', () => {
            this.scene.start('HowToPlay');
        });
    }

    playSeagulEffects() {
        this.seagullSounds = this.sound.add(Util.randNth(['seagulls-1', 'seagulls-2']));
        this.seagullSounds.play();
        this.seagullSounds.once('complete', this.playSeagulEffects, this);     
    }
}
