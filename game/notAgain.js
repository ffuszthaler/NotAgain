import GLOBAL from '../engine/Globals.js';
import Engine from '../engine/Engine.js';

import Scene from '../engine/Scene.js';
// import SpriteMap from '../engine/sprite/SpriteMap.js';
import Sprite from '../engine/sprite/Sprite.js';
import Projectile from '../engine/actors/Projectile.js';

import Keyboard from '../engine/input/Keyboard.js';
import Mouse from '../engine/input/Mouse.js';

import Anton from './anton.js';

// set global values to game specific values
GLOBAL.widowWidth = 1280;
GLOBAL.windowHeight = 720;
GLOBAL.debug = false;

// game scope
class notAgain extends Engine {
  // main game scene
  gameScene = new Scene();

  // mouse for now
  sprite;

  // animation sprites
  sprites = {
    run: {
      src: './assets/run-sprite.png',
      frames: 8,
      fps: 20,
      frameSize: {
        width: 400,
        height: 400,
      },
      image: null,
    },
    idle: {
      src: './assets/idle-sprite.png',
      frames: 10,
      fps: 20,
      frameSize: {
        width: 400,
        height: 400,
      },
      image: null,
    },
    anton: {
      src: './assets/anton_still.png',
      frames: 1,
      fps: 1,
      frameSize: {
        width: 128,
        height: 128,
      },
      image: null,
    },
  };

  // animation sprite state
  state = 'anton';

  init() {
    super.init();

    // GLOBAL.player = new SpriteMap(sprites, state, 200, 200, 1);
    this.player = new Anton(this.sprites, this.state, 1, 200, 200);
    this.gameScene.addToScene(this.player);

    this.sprite = new Sprite('./assets/mouse.png', 150, 100, 0.1);
    this.gameScene.addToScene(this.sprite);

    // GLOBAL.keyboard = new Keyboard();
    GLOBAL.mouse = new Mouse();

    super.continue();
  }

  update() {
    this.gameScene.update(GLOBAL.deltaTime);

    // Anton.update(GLOBAL.deltaTime);
    GLOBAL.mouse.update();

    GLOBAL.ctx.setTransform(); // reset transform
    GLOBAL.ctx.clearRect(0, 0, 300, 300);
  }

  render() {
    // clear canvas before drawing
    GLOBAL.ctx.resetTransform();
    GLOBAL.ctx.clearRect(0, 0, GLOBAL.widowWidth, GLOBAL.windowHeight);

    // Anton.render();

    if (GLOBAL.mouse.mouseKeys[0] === true) {
      // let proj = new Projectile(GLOBAL.player.x, GLOBAL.player.y - 50, 5, 10);
      let proj = new Projectile(321, 321, 5, 10);
      console.log('projectile-x: ', proj.x);
      console.log('projectile-y: ', proj.y);
      this.gameScene.addToScene(proj);
    }

    this.gameScene.render();
  }
}

export default notAgain;
