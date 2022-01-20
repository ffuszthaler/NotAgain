import GLOBAL from '../engine/Globals.js';
import Engine, { checkCollisionBetween } from '../engine/Engine.js';

import Scene from '../engine/Scene.js';
// import SpriteMap from '../engine/sprite/SpriteMap.js';
import Sprite from '../engine/sprite/Sprite.js';
import Projectile from '../engine/actors/Projectile.js';

import Keyboard from '../engine/input/Keyboard.js';
import Mouse from '../engine/input/Mouse.js';

import Player from './Player.js';
import Enemy from './Enemy.js';

// global debug flag for development and testing
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

    this.sprite = new Sprite('./assets/mouse.png', 150, 100, 0.1);
    // this.gameScene.addToScene(this.sprite);

    // create player
    this.player = new Player(this.sprites, this.state, 1, 200, 200);
    this.gameScene.addToScene(this.player);

    // create a test enemy
    this.enemy1 = new Enemy(this.sprites, this.state, 1, 400, 400);
    this.gameScene.addToScene(this.enemy1);

    GLOBAL.mouse = new Mouse();

    let proj;

    // left mouse button to shoot a bullet as the player
    document.addEventListener('mousedown', (e) => {
      if (e.button === 0) {
        let proj = new Projectile(this.player.texture.x, this.player.texture.y, e.offsetX, e.offsetY, 3);

        // check for collisions between player and his own bullets
        // fires every time bc bullet get spawned inside of player
        if (checkCollisionBetween(this.player, proj)) {
          console.log('COLLISION!!!!!!!!!!!!!!');
        }
        this.gameScene.addToScene(proj);
      }
    });

    super.continue();
  }

  update() {
    // update the game scene according to GLOBAL.deltaTime
    this.gameScene.update(GLOBAL.deltaTime);
  }

  render() {
    // clear canvas before drawing
    GLOBAL.ctx.resetTransform();
    GLOBAL.ctx.clearRect(0, 0, GLOBAL.windowWidth, GLOBAL.windowHeight);

    // render the game scene
    this.gameScene.render();
  }
}

export default notAgain;
