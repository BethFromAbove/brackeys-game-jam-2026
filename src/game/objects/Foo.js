import { GameObjects } from 'phaser';
import Util from '../util';

// @NOTE, this is just me reminding myself how to create a custom game
// object which updates and draws itself in a scene.
export default class Foo extends GameObjects.Graphics {

    constructor(scene) {
        console.log("making chain");
        super(scene);
        this.scene = scene;
        this.scene.add.existing(this);
    }

    preUpdate(time, delta) {
        this.update(time, delta);
        this.draw();
    }

    update(time, delta) {
        
    }

    draw() {
        this.fillStyle(0x002b36, 1);
        this.fillCircle(200, 200, 50);
    }
}
