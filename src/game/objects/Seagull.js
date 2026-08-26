import { GameObjects } from 'phaser';
import Util from '../util';

export default class Seagull extends GameObjects.Sprite {

    constructor(scene) {
        super(scene, 0, 0, 'seagull');
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

        this.scene.anims.create({
            key: 'walk',
            frames: this.scene.anims.generateFrameNumbers('seagull-walk', { start: 1, end: 2 }),
            frameRate: 6,
            repeat: -1
        });

        this.scene.anims.create({
            key: 'idle',
            frames: this.scene.anims.generateFrameNumbers('seagull-walk', { start: 0, end: 0 }),
            frameRate: 1,
            repeat: -1
        });

        this.scene.anims.create({
            key: 'fly',
            frames: this.scene.anims.generateFrameNumbers('flying', { start: 0, end: 0 }),
            frameRate: 1,
            repeat: -1
        });

        this.facingRightWalking = true;

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
        });

        this.inventory = [];

        this.setNest();
    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta);
        this.update(time, delta);
        // this.draw();
    }

    update(time, delta) {
        this.handleMovement();
        this.dragInventory();
    }

    /**
     * add an item of food to the inventory
     */
    grab(item) {
        item.setScale(0.6);
        item.body.enable = false;
        this.inventory.push(item);
    }

    /**
     * move all the current inventory items along with the seagull
     */
    dragInventory() {
        let n = this.inventory.length;
        let dx = 20;
        this.inventory.forEach((item, idx) => {
            item.x = this.x + item.xOff;
            item.xOff = (idx * dx) - (n * dx * 0.5);
            item.y = this.y + 30;
        });
    }

    draw() {
        
    }

    /**
     * when nested we stay still and point a cone towards the
     * mousepos.
     */
    setNest() {
        this.state = 'nest';
        this.x = 100;
        this.y = 480;
        this.body.setVelocity(0, 0);
        this.rotation = 0;
        this.setFlipY(false);
        this.acceleration = 0;
        this.body.setMaxSpeed(0);
        this.play('idle', true);
        this.setScale(0.5);
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
        this.body.setDrag(400);
        this.setScale(0.5);
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
        this.setFlipX(false);
        this.play('fly');
        this.setScale(1);
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
            this.facingRightWalking = false;
        }
        if (r && !l) {
            this.body.setVelocityX(this.body.velocity.x + this.acceleration);
            this.facingRightWalking = true;
        }
        this.setFlipX(this.facingRightWalking);
        if (u && !d) {
            this.body.setVelocityY(this.body.velocity.y - this.acceleration);
        }
        if (d && !u) {
            this.body.setVelocityY(this.body.velocity.y + this.acceleration);
        }
        if (u || d || l || r) {
            this.play('walk', true);
        }
        else {
            this.play('idle', true);
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
