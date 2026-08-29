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

const textureOptions = [
    'man-walk-1-r',
    'man-walk-1-g',
    'man-walk-1-b',
    'man-walk-2-r',
    'man-walk-2-g',
    'man-walk-2-b',
    'woman-walk-1-r',
    'woman-walk-1-g',
    'woman-walk-1-b',
    'woman-walk-2-r',
    'woman-walk-2-g',
    'woman-walk-2-b'
];

const foodOptions = [
    'lollipop',
    'chips',
    'burger',
    'phone',
    'icecream'
];

export default class NPC extends GameObjects.Sprite {

    constructor(scene) {
        super(scene, Util.randNth(startLocations), 650 + Util.randInt(200), 'man-walk-1-r');
        this.scene = scene;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        this.texture = Util.randNth(textureOptions);
        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers(this.texture, { start: 0, end: 0 }),
            frameRate: 1,
            repeat: -1
        });
        this.anims.create({
            key: 'angry',
            frames: this.anims.generateFrameNumbers(this.texture, { start: 1, end: 2 }),
            frameRate: 6,
            repeat: -1
        });
        this.anims.create({
            key: 'walking',
            frames: this.anims.generateFrameNumbers(this.texture, { start: 3, end: 5 }),
            frameRate: 6,
            repeat: -1
        });
        this.anims.create({
            key: 'carry',
            frames: this.anims.generateFrameNumbers(this.texture, { start: 6, end: 8 }),
            frameRate: 6,
            repeat: -1
        });

        this.item = new GameObjects.Sprite(this.scene, this.x, this.y, Util.randNth(foodOptions));
        this.item.npc = this;
        this.scene.add.existing(this.item);
        this.scene.physics.add.existing(this.item);
        this.scene.npcItems.add(this.item);

        this.pathing = false;
        this.points = [];
        this.setInitialPath();

        this.setWalking();
    }

    hideItem() {
        if (this.item) {
            this.item.setVisible(false);
            this.item.body.enable = false;
        }
    }

    showItem() {
        if (this.item) {
            this.item.setVisible(true);
            this.item.body.enable = true;
        }
    }

    setIdle() {
        this.play('idle', true);
        this.showItem();
    }

    setWalking() {
        this.play('walking', true);
        this.hideItem();
    }

    setAngry() {
        this.state = 'angry';
        this.play('angry', true);
        this.hideItem();
    }

    setStealing() {
        this.play('carry', true);
        this.showItem();
    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta);
        this.update(time, delta);
    }

    update(time, delta) {
        if (this.state == 'stealing' && !this.pathing && this.points.length == 0) {
            this.scene.npcs.remove(this);
            this.item.destroy();
            this.destroy();
            return;
        }

        if (!this.pathing && this.points.length > 0) {
            this.pathing = true;

            let target = this.points.shift();
            let distance = Math.sqrt(Math.pow(target[0] - this.x, 2) + Math.pow(target[1] - this.y, 2));
            
            this.currentPathingTween = this.scene.tweens.add({
                targets: this,
                x: target[0],
                y: target[1],
                duration: 10 * distance, // magic number 10, gives a fine speed
                onComplete: () => { this.pathing = false; }
            });
        } else if (this.pathing) {
            if (this.state == 'angry') {
                this.setAngry();
            } else if (this.state == 'stealing') {
                this.setStealing();
            }
            else {
                this.setWalking();
            }
        } else if (this.item) {
            this.setIdle();
        }

        this.dragItem();
    }

    dragItem() {
        if (this.item) {
            this.item.x = this.x - 18;
            this.item.body.x = this.x - 18;
            this.item.y = this.y + 15;
            this.item.body.y = this.y + 15;
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

    moveTo(p) {
        this.points.push(p);
    }
}
