import { GameObjects } from 'phaser';
import Util from '../util';

export default class VanPart extends GameObjects.Sprite {

    constructor(scene, texture) {
        super(scene, 400, 300, texture);
        this.scene = scene;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.scene.vanParts.add(this);
        this.scene.vanPartsCheckHack.add(this);

        this.body.setSize(190, 80);
        if (texture == 'van-body') {
            this.x = 135;
            this.y = 516;
            this.body.setOffset(-120, 50);
        }
        if (texture == 'van-nest') {
            this.x = 98;
            this.y = 496;
            this.body.setOffset(-110, 50);
        }
        if (texture == 'van-ice-cream') {
            this.x = 151;
            this.y = 456;
            this.body.setOffset(-100, 50);
        }
        if (texture == 'van-menu') {
            this.x = 72;
            this.y = 538;
         //   this.body.setOffset(30, 520);
        }
        if (texture == 'van-wheel-left') {
            this.x = 73;
            this.y = 572;
         //   this.body.setOffset(35, 520);
        }
        if (texture == 'van-wheel-right') {
            this.x = 178;
            this.y = 568;
         //   this.body.setOffset(40, 520);
        }
    }

    preUpdate(time, delta) {
        super.update(time, delta);
        this.update(time, delta);
    }

    update(time, delta) {

    }
}
