import GLOBAL from '../engine/Globals.js';
import Engine from '../engine/Engine.js';

import Scene from '../engine/Scene.js';
import SpriteMap from '../engine/sprite/SpriteMap.js';
import Sprite from '../engine/sprite/Sprite.js';
import Keyboard from '../engine/input/Keyboard.js';

import Mouse from '../engine/input/Mouse.js';

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

GLOBAL.mouse = { x: 0, y: 0 };
function mouseEvents(e) {
  const bounds = GLOBAL.canvas.getBoundingClientRect();
  GLOBAL.mouse.x = e.pageX - bounds.left - scrollX;
  GLOBAL.mouse.y = e.pageY - bounds.top - scrollY;
}
document.addEventListener('mousemove', mouseEvents);

function drawRotated(x, y, angle) {
  GLOBAL.ctx.setTransform(1, 0, 0, 1, x, y);
  GLOBAL.ctx.rotate(angle);
  GLOBAL.ctx.beginPath();
  GLOBAL.ctx.arc(0, 0, 100, 0, Math.PI * 2);
  GLOBAL.ctx.moveTo(-100, 0);
  GLOBAL.ctx.lineTo(100, 0);
  // GLOBAL.ctx.lineTo(60, -80);
  GLOBAL.ctx.closePath();
  GLOBAL.ctx.stroke();
}

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

    var angle = Math.atan2(GLOBAL.mouse.y - 150, GLOBAL.mouse.x - 400);
    //          x    y    angle
    drawRotated(400, 150, angle);
  }
}

// initialize game on page load
let game = new notAgain();
window.onload = () => {
  game.init();
};
