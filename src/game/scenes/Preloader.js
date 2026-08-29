import { Scene } from 'phaser';

export class Preloader extends Scene
{
    constructor ()
    {
        super('Preloader');
    }

    init ()
    {
        //  We loaded this image in our Boot Scene, so we can display it here
        this.add.image(400, 300, 'background');

        //  A simple progress bar. This is the outline of the bar.
        this.add.rectangle(400, 300, 468, 32).setStrokeStyle(1, 0xffffff);

        //  This is the progress bar itself. It will increase in size from the left based on the % of progress.
        const bar = this.add.rectangle(400-230, 300, 4, 28, 0xffffff);

        //  Use the 'progress' event emitted by the LoaderPlugin to update the loading bar
        this.load.on('progress', (progress) => {

            //  Update the progress bar (our bar is 464px wide, so 100% = 464px)
            bar.width = 4 + (460 * progress);

        });
    }

    preload ()
    {
        //  Load the assets for the game - Replace with your own assets
        this.load.setPath('assets');

        this.load.image('menu-seagull', 'seagull-menu.png');
        this.load.image('menu-bg', 'skyblue-background.png');
        this.load.image('howtoplay-bg', 'howtoplay-bg.png');
        this.load.image('seagull', 'seagull.png');
        this.load.spritesheet('flying', 'flying.png',  { frameWidth: 50, frameHeight: 100 });
        this.load.image('background-beach', 'background.png');
        this.load.image('icecreamvan', 'icecreamvan.png');
        this.load.image('nest', 'nest.png');
        this.load.image('nest-sitting', 'nest-sitting.png');
        this.load.spritesheet('seagull-walk', 'seagull-spritesheet.png',  { frameWidth: 100, frameHeight: 100 });
        this.load.spritesheet('nest-spritesheet', 'nest-spritesheet.png',  { frameWidth: 100, frameHeight: 100 });

        let npcConfig = { frameWidth: 30, frameHeight: 75 };
        this.load.spritesheet('man-walk-1-r', 'man1-red.png',  npcConfig);
        this.load.spritesheet('man-walk-1-g', 'man1-green.png',  npcConfig);
        this.load.spritesheet('man-walk-1-b', 'man1-blue.png',  npcConfig);
        this.load.spritesheet('man-walk-2-r', 'man2-red.png',  npcConfig);
        this.load.spritesheet('man-walk-2-g', 'man2-green.png',  npcConfig);
        this.load.spritesheet('man-walk-2-b', 'man2-blue.png',  npcConfig);

        this.load.spritesheet('woman-walk-1-r', 'woman1-red.png',  npcConfig);
        this.load.spritesheet('woman-walk-1-g', 'woman1-green.png',  npcConfig);
        this.load.spritesheet('woman-walk-1-b', 'woman1-blue.png',  npcConfig);
        this.load.spritesheet('woman-walk-2-r', 'woman2-red.png',  npcConfig);
        this.load.spritesheet('woman-walk-2-g', 'woman2-green.png',  npcConfig);
        this.load.spritesheet('woman-walk-2-b', 'woman2-blue.png',  npcConfig);

        this.load.image('lollipop', 'food/lollipop.png');
        this.load.image('chips', 'food/chips.png');
        this.load.image('burger', 'food/burger.png');
        this.load.image('phone', 'food/phone.png');
        this.load.image('icecream', 'food/icecream.png');

        this.load.image('van-body', 'van/body-single.png');
        this.load.image('van-nest', 'van/nest-single.png');
        this.load.image('van-ice-cream', 'van/ice-cream-single.png');
        this.load.image('van-menu', 'van/menu-single.png');
        this.load.image('van-wheel-left', 'van/wheel-left-single.png');
        this.load.image('van-wheel-right', 'van/wheel-right-single.png');

        this.load.audio('menu-music', 'audio/Aretes.mp3');
        this.load.audio('game-music', 'audio/Cool Hard Facts.mp3');
        this.load.audio('seagulls-1', 'audio/194940__soundmary__gulls1.mp3');
        this.load.audio('seagulls-2', 'audio/692001__teamenfil__20230620-gulls-1.mp3');
        this.load.audio('pop1', 'audio/pop1.mp3');
        this.load.audio('pop2', 'audio/pop2.mp3');
        this.load.audio('pop3', 'audio/pop3.mp3');
    }

    create ()
    {
        //  When all the assets have loaded, it's often worth creating global objects here that the rest of the game can use.
        //  For example, you can define global animations here, so we can use them in other scenes.

        //  Move to the MainMenu. You could also swap this for a Scene Transition, such as a camera fade.
        this.scene.start('MainMenu');
    }
}
