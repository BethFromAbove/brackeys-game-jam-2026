import { Scene, GameObjects, Curves } from 'phaser';
import Seagull from '../objects/Seagull';
import NPC from '../objects/NPC';
import VanPart from '../objects/VanPart';
import Util from '../util';

export class Game extends Scene
{
    constructor () {
        super('Game');
    }

    create () {
        this.music = this.sound.add('game-music');
        this.music.play({loop: true});
        this.add.image(400, 300, 'background-beach');
        this.add.image(400, 300, 'background-rocks').setDepth(2);
        this.add.image(400, 300, 'icecreamvan');
        this.add.image(100, 480, 'nest').setScale(0.5);
        
        this.wave1 = this.add.image(400, 0, 'wave1').setOrigin(0.5, 0).setDepth(1).setAlpha(0.75);
        this.wave2 = this.add.image(400, 0, 'wave2').setOrigin(0.5, 0).setAlpha(0.75);

        this.popSound1 = this.sound.add('pop1');
        this.popSound2 = this.sound.add('pop2');
        this.popSound3 = this.sound.add('pop3');
        this.popSounds = [this.popSound1, this.popSound2, this.popSound3];

        // ice cream van is made up of pieces that can be stolen by beachgoers
        this.vanParts = this.physics.add.group();
        this.vanPartsCheckHack = this.physics.add.group(); // need to stop people stealing form each other, sorry
        new VanPart(this, 'van-body');
        new VanPart(this, 'van-nest');
        new VanPart(this, 'van-ice-cream');
        new VanPart(this, 'van-menu');
        new VanPart(this, 'van-wheel-left');
        new VanPart(this, 'van-wheel-right');

        // player seagull
        this.player = new Seagull(this);

        // NPCs
        this.npcs = this.physics.add.group();
        this.npcItems = this.physics.add.group();

        // collider for seagull grabbing food items
        this.physics.add.overlap(
            this.player,
            this.npcItems,
            (p, i) => {
                p.grab(i);
                i.npc.item = null;
                this.popSounds[Util.randInt(3)].play();
                i.npc.setAngry();
                i.npc.moveTo([370, 500]);
                i.npc.moveTo([325, 560]);
                i.npc.moveTo([60, 560]);
            }
        );

        // collider for npcs stealing van parts
        this.physics.add.overlap(
            this.npcs,
            this.vanParts,
            (npc, part) => {
                if (npc.state == 'angry') {
                    npc.item = part;
                    this.vanParts.remove(part);
                    npc.points = [];
                    npc.pathing = false;
                    npc.currentPathingTween.stop();
                    npc.setStealing();
                    npc.moveTo([370, 560]);
                    npc.moveTo([370, 650]);
                    npc.state = 'stealing';
                }
            }
        );

        this.tweens.add({
            targets: this.wave1,
            scaleY: 2.2,
            ease: 'Back',
            delay: 600,
            duration: 3000,
            hold: 300,
            yoyo: true,
            loop: -1,
        });

        this.tweens.add({
            targets: this.wave2,
            scaleY: 1.8,
            ease: 'Back',
            delay: 900,
            duration: 3000,
            hold: 300,
            yoyo: true,
            loop: -1
        });

        // debug, prints the mouse pos on click
        this.input.on('pointerdown', () => {console.log(this.input.mousePointer.x, this.input.mousePointer.y);});
    }

    update() {
        if (this.vanPartsCheckHack.getChildren().length == 0) {
            // go the game over
            this.scene.start('GameOver');
        }

        if (this.npcs.getChildren().length < 5) {
            this.npcs.add(
                new NPC(this)
            );
        }
    }
}
