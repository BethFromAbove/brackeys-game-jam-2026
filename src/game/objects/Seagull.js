import { GameObjects } from 'phaser';
import Util from '../util';

export default class Seagull extends GameObjects.Sprite {

    constructor(scene, x, y) {
        super(scene, x, y, 'seagull');
        this.scene = scene;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        this.cursors = this.scene.input.keyboard.createCursorKeys();
        this.wasd = scene.input.keyboard.addKeys({
            up: "W",
            down: "S",
            left: "A",
            right: "D",
        });

        // @TEMP, cycle through nest/walk/fly with space
        this.keyObject = this.scene.input.keyboard.addKey("SPACE");
        this.keyObject.on('down', () => {
            if (this.state == 'nest') {
                this.setWalk();
            } else if (this.state == 'walk') {
                this.setFly();
            } else {
                this.setNest();
            }
            console.log(this.state);
        });

        this.setNest();
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

    /**
     * when nested we stay still and point a cone towards the
     * mousepos.
     */
    setNest() {
        this.state = 'nest';
        this.x = 80;
        this.y = 680;
        this.body.setVelocity(0, 0);
        this.rotation = 0;
        this.setFlipY(false);
        this.acceleration = 0;
        this.body.setMaxSpeed(0);

        this.setTexture('seagull');
        this.setScale(0.02);
    }

    /**
     * when walking we have slow max speed, high acceleration and high
     * drag, arrow keys move us in cardinal directions.
     */
    setWalk() {
        this.state = 'walk';
        this.rotation = 0;
        this.setFlipY(false);
        this.acceleration = 10;
        this.body.setMaxSpeed(80);
        this.body.setDrag(100);

        this.setTexture('seagull');
        this.setScale(0.02);
    }

    /**
     * when flying we have medium acceleration, high max speed, no
     * drag, and we move in the direction we're pointing, arrow keys
     * rotate us
     */
    setFly() {
        this.state = 'fly';
        this.acceleration = 30;
        this.body.setMaxSpeed(300);
        this.body.setDrag(0);

        this.setTexture('seagull-fly');
        this.setScale(0.1);
    }

    /**
     * little helper to figure out which controls are currently being
     * held, handles arrows and wasd together which is nice.
     */
    getInputs() {
        return {
            u: this.cursors.up.isDown || this.wasd.up.isDown,
            d: this.cursors.down.isDown || this.wasd.down.isDown,
            l: this.cursors.left.isDown || this.wasd.left.isDown,
            r: this.cursors.right.isDown || this.wasd.right.isDown
        };
    }

    handleMovement() {
        if (this.state == 'nest') {
            this.handleNestMovement();
        } else if (this.state == 'walk') {
            this.handleWalkMovement();
        } else if (this.state == 'fly') {
            this.handleFlyMovement();
        }
    }

    handleNestMovement() {
        let {u, r} = this.getInputs();

        if (u) {
            this.y -= 50;
            this.setWalk();
        } else if (r) {
            this.x += 50;
            this.setWalk();
        }
    }

    handleWalkMovement() {
        let {u, d, l, r} = this.getInputs();
        
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

    handleFlyMovement() {
        let rotationDelta = 0.07;
        let {l, r} = this.getInputs();

        if (l && !r) {
            this.rotation = this.rotation - rotationDelta;
        }
        if (r && !l) {
            this.rotation = this.rotation + rotationDelta;
        }
        this.body.setVelocityX(Math.cos(this.rotation) * 250);
        this.body.setVelocityY(Math.sin(this.rotation) * 250);

        // make sure we're always upright
        this.setFlipY(Math.abs(this.rotation) > Math.PI / 2);
    }
}
