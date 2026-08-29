import { Scene } from 'phaser';

export class Boot extends Scene
{
    constructor ()
    {
        super('Boot');
    }

    preload ()
    {
        //  The Boot Scene is typically used to load in any assets you require for your Preloader, such as a game logo or background.
        //  The smaller the file size of the assets, the better, as the Boot Scene itself has no preloader.

        this.load.image('background', 'assets/bg-yellow.png');
    }

    create ()
    {
        // this.cameras.main.setBackgroundColor(0xa1a1a1);

        // this.add.text(400, 300, '< click here >', {
        //     fontFamily: 'Arial Black', fontSize: 38, color: '#000000',
        //     align: 'center'
        // }).setOrigin(0.5);

        // this.input.once('pointerdown', () => {
        //     this.scene.start('Preloader');
        // });

        this.scene.start('Preloader');
    }
}
