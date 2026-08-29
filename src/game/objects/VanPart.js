import { GameObjects } from 'phaser';
import Util from '../util';

export default class VanPart extends GameObjects.Sprite {

    constructor(scene, texture) {
        super(scene, 400, 300, texture);
        this.scene = scene;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.scene.vanParts.add(this);

        this.body.setSize(190, 80);
        if (texture == 'van-body') {
            this.body.setOffset(15, 520);
        }
        if (texture == 'van-nest') {
            this.body.setOffset(20, 520);
        }
        if (texture == 'van-ice-cream') {
            this.body.setOffset(25, 520);
        }
        if (texture == 'van-menu') {
            this.body.setOffset(30, 520);
        }
        if (texture == 'van-wheel-left') {
            this.body.setOffset(35, 520);
        }
        if (texture == 'van-wheel-right') {
            this.body.setOffset(40, 520);
        }
    }

    preUpdate(time, delta) {
        super.update(time, delta);
        this.update(time, delta);
    }

    update(time, delta) {

    }
}
