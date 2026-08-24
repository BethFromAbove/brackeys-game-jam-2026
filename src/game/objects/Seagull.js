import { GameObjects } from 'phaser';
import Util from '../util';

export default class Seagull extends GameObjects.Sprite {

    constructor(scene, x, y) {
        super(scene, x, y, 'seagull');
        this.scene = scene;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.setScale(0.03);
        this.state = 'nested';
        this.body.setVelocity(0, 0);
        this.body.setMaxSpeed(200);
        this.cursors = this.scene.input.keyboard.createCursorKeys();
        this.acceleration = 3;
    }

    preUpdate(time, delta) {
        this.update(time, delta);
        // this.draw();
    }

    update(time, delta) {
        this.handleMovement();
    }

    draw() {
        
    }

    handleMovement() {
        let u = this.cursors.up.isDown;
        let d = this.cursors.down.isDown;
        let l = this.cursors.left.isDown;
        let r = this.cursors.right.isDown;
        
        if (l && !r) {
            this.body.setVelocityX(this.body.velocity.x - this.acceleration);
        }

        if (r && !l) {
            this.body.setVelocityX(this.body.velocity.x + this.acceleration);
        }

        if (u && !d) {
            this.body.setVelocityY(this.body.velocity.y - this.acceleration);
        }

        if (d && !u) {
            this.body.setVelocityY(this.body.velocity.y + this.acceleration);
        }
    }
}
