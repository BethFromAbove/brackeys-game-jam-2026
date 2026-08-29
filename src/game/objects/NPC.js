import { GameObjects, Curves } from 'phaser';
import Util from '../util';

//60 - 740 x
//40 - 450 y

const startLocations = [350, 450, 550];

const beachPositions = [
    [714, 97],
    [85, 419],
    [341, 165],
    [288, 111],
    [164, 386],
    [618, 84],
    [664, 256],
    [92, 55],
    [155, 151],
    [298, 298],
    [676, 53],
    [634, 141],
    [725, 399],
    [618, 254],
    [285, 269],
    [663, 182],
    [66, 428],
    [223, 397],
    [492, 214],
    [344, 119]
];

export default class NPC extends GameObjects.Sprite {

    constructor(scene, path, x, y, texture = 'npc1') {
        super(scene, Util.randNth(startLocations), 650, texture);
        this.scene = scene;
        this.scene.add.existing(this);

        this.pathing = false;
        this.points = [];
        this.setInitialPath();
    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta);
        this.update(time, delta);

    }

    update(time, delta) {
        if (!this.pathing && this.points.length > 0) {
            this.pathing = true;

            let target = this.points.shift();

            this.scene.tweens.add({
                targets: this,
                x: target[0],
                y: target[1],
                duration: 2000,
                onComplete: () => { this.pathing = false }
            })
        }
    }


    setLocation(x, y) {
        const clampedX = Math.max(this.width / 2, Math.min(x, this.scene.scale.width - this.width / 2));
        const clampedY = Math.max(this.height / 2, Math.min(y, this.scene.scale.height - this.height / 2));
        super.setPosition(clampedX, clampedY);
    }

    turnToTarget(target) {
        const targetX = target.x;
        const targetY = target.y;
        super.setRotation(-Math.atan2((targetY - this.y), (this.x - targetX)));
    }

    setInitialPath() {
        this.points.push([450, 500]);
        this.points.push(Util.randNth(beachPositions));
    }
}

