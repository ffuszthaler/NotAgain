import GLOBAL from '../engine/Globals.js';
import Engine from '../engine/Engine.js';

import Scene from '../engine/Scene.js';
import SpriteMap from '../engine/sprite/SpriteMap.js';
import Sprite from '../engine/sprite/Sprite.js';
import Keyboard from '../engine/input/Keyboard.js';

// import Mouse from '../engine/input/Mouse.js';

import playerCharacter from './player.js';

// application specific globals
let sprite;

// game config
const GAME = {
  width: 1280,
  height: 720,
  debug: false,
};

// set global values to game specific values
GLOBAL.widowWidth = GAME.width;
GLOBAL.windowHeight = GAME.height;
GLOBAL.debug = GAME.debug;

// animation sprites
let sprites = {
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
    src: './assets/anton.png',
    frames: 1,
    fps: 1,
    frameSize: {
      width: 64,
      height: 64,
    },
    image: null,
  },
};
let state = 'idle';

// game scope
class notAgain extends Engine {
  // main game scene
  gameScene = new Scene();

  init() {
    super.init();

    GLOBAL.player = new SpriteMap(sprites, state, 200, 200, 2.5);
    this.gameScene.addToScene(GLOBAL.player);

    sprite = new Sprite('./assets/mouse.png', 150, 100, 0.1);
    this.gameScene.addToScene(sprite);

    GLOBAL.keyboard = new Keyboard();
    // GLOBAL.mouse = new Mouse();

    super.continue();
  }

  update() {
    this.gameScene.update();

    playerCharacter(GLOBAL.deltaTime);

    GLOBAL.ctx.setTransform(1, 0, 0, 1, 0, 0); // reset transform
    GLOBAL.ctx.clearRect(0, 0, 300, 300);
  }

  render() {
    // clear canvas before drawing
    GLOBAL.ctx.resetTransform();
    GLOBAL.ctx.clearRect(0, 0, GAME.width, GAME.height);

    this.gameScene.render();
  }
}

export default notAgain;
