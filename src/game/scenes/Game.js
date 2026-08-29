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

        // ice cream van is made up of pieces that can be stolen by beachgoers
        this.vanParts = this.physics.add.group();
        new VanPart(this, 'van-body');
        new VanPart(this, 'van-nest');
        new VanPart(this, 'van-ice-cream');
        new VanPart(this, 'van-menu');
        new VanPart(this, 'van-wheel-left');
        new VanPart(this, 'van-wheel-right');

        // player seagull
        this.player = new Seagull(this);

        // NPCs
        this.npcs = [];
        this.npcItems = this.physics.add.group();

        // collider for seagull grabbing food items
        this.physics.add.overlap(
            this.player,
            this.npcItems,
            (p, i) => {
                p.grab(i);
                i.npc.item = null;
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

        // debug, prints the mouse pos on click
        this.input.on('pointerdown', () => {console.log(this.input.mousePointer.x, this.input.mousePointer.y);});
    }

    update() {
        if (this.vanParts.length == 0) {
            // go the game over
            this.scene.start('GameOver');
        }

        if (this.npcs.length < 5) {
            this.npcs.push(new NPC(this));
        }
    }
}
