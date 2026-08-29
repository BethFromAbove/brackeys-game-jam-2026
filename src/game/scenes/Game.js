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
        this.vanParts = [
            new VanPart(this, 'van-body'),
            new VanPart(this, 'van-nest'),
            new VanPart(this, 'van-ice-cream'),
            new VanPart(this, 'van-menu'),
            new VanPart(this, 'van-wheel-left'),
            new VanPart(this, 'van-wheel-right'),
        ];

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
            }
        );

        // debug, prints the mouse pos on click
        this.input.on('pointerdown', () => {console.log(this.input.mousePointer.x, this.input.mousePointer.y);});
    }

    update() {
        if (this.vanParts.length == 0) {
            // go the game over
        }

        if (this.npcs.length < 5) {
            this.npcs.push(new NPC(this));
        }
    }
}
