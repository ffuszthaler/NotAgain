import GLOBAL from '../engine/Globals.js';
import Engine from '../engine/Engine.js';

import Scene from '../engine/Scene.js';
import SpriteMap from '../engine/sprite/SpriteMap.js';
import Sprite from '../engine/sprite/Sprite.js';
import Keyboard from '../engine/input/Keyboard.js';

// application specific globals
let gameObjects = [];
let keyboard;
let player;
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
};
let state = 'idle';

// code necessary to make a moveable and animated player
const playerCode = (deltaTime) => {
  let dx = 0;
  let dy = 0;
  let velocity = 0.3;

  keyboard.keyPressed('KeyW', () => {
    dy = -1;
  });

  keyboard.keyPressed('KeyA', () => {
    dx = -1;
  });

  keyboard.keyPressed('KeyS', () => {
    dy = 1;
  });

  keyboard.keyPressed('KeyD', () => {
    dx = 1;
  });

  // speed boost
  keyboard.keyPressed('Space', () => {
    // 1.5x of normal speed (0.3)
    velocity = 0.45;
  });

  // save last view direction
  if (dx != 0) player.lastDirection = dx;

  // bounds detection
  // right
  if (player.x + player.width / 2 > GAME.width) player.x = GAME.width - player.width / 2;
  // left
  else if (player.x - player.width / 2 < 0) player.x = 0 + player.width / 2;

  // bottom
  if (player.y + player.height / 2 > GAME.height) player.y = GAME.height - player.height / 2;
  // top
  else if (player.y - player.height / 2 < 0) player.y = 0 + player.height / 2;

  // correct velocity for moving diagonally
  if (dx !== 0 && dy !== 0) {
    dx /= Math.hypot(dx, dy);
    dy /= Math.hypot(dx, dy);
  }

  player.state = dx === 0 && dy === 0 ? 'idle' : 'run';

  player.x += deltaTime * dx * velocity;
  player.y += deltaTime * dy * velocity;
};

// game scope
class notAgain extends Engine {
  // main game scene
  gameScene = new Scene();

  init() {
    super.init();

    player = new SpriteMap(sprites, state, 200, 200, 0.3);
    this.gameScene.addToScene(player);

    sprite = new Sprite('./assets/mouse.png', 150, 100, 0.1);
    this.gameScene.addToScene(sprite);

    keyboard = new Keyboard();
    super.continue();
  }

  update() {
    this.gameScene.update();

    playerCode(GLOBAL.deltaTime);
  }

  render() {
    // clear canvas before drawing
    GLOBAL.ctx.resetTransform();
    GLOBAL.ctx.clearRect(0, 0, GAME.width, GAME.height);

    this.gameScene.render();
  }
}

// initialize game on page load
let game = new notAgain();
window.onload = () => {
  game.init();
};
