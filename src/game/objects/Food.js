import { GameObjects } from 'phaser';
import Util from '../util';

export default class Food extends GameObjects.Sprite {

    constructor(scene, x, y) {
        super(scene, this.x, this.y);
        this.scene = scene;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.x = x;
        this.y = y;
    }

    preUpdate(time, delta) {
        super.update(time, delta);
        this.update(time, delta);
    }

    update(time, delta) {

    }
}
