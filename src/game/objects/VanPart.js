import { GameObjects } from 'phaser';
import Util from '../util';

export default class VanPart extends GameObjects.Sprite {

    constructor(scene, texture) {
        super(scene, 400, 300, texture);
        this.scene = scene;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
    }

    preUpdate(time, delta) {
        super.update(time, delta);
        this.update(time, delta);
    }

    update(time, delta) {

    }
}
