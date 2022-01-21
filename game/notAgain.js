import GLOBAL from '../engine/Globals.js';
import Engine, { checkCollisionBetween } from '../engine/Engine.js';
import { randomNumberBetween } from '../engine/utilities/Random.js';

import Scene from '../engine/Scene.js';
import Projectile from '../engine/actors/Projectile.js';

import Player from './Player.js';
import Enemy from './Enemy.js';

// global debug flag for development and testing
GLOBAL.debug = false;

// game scope
class notAgain extends Engine {
  // main game scene
  gameScene = new Scene();

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
  player;
  enemy1;

  init() {
    super.init();

    // create player
    // maybe put this (not the add to scene line) also in mousemove event and send the e.offset data as parameters
    // would allow you to choose where the character (player, enemies) looks and shoots at.
    this.player = new Player(this.sprites, this.state, 1, 200, 200);
    this.gameScene.addToScene(this.player);

    // create a test enemy
    this.enemy1 = new Enemy(
      this.sprites,
      this.state,
      1,
      randomNumberBetween(0, GLOBAL.windowWidth),
      randomNumberBetween(0, GLOBAL.windowHeight)
    );
    this.gameScene.addToScene(this.enemy1);

    // left mouse button to shoot a bullet as the player
    document.addEventListener('mousedown', (e) => {
      if (e.button === 0) {
        let playerProj = new Projectile(this.player.texture.x, this.player.texture.y, e.offsetX, e.offsetY, 3);
        this.gameScene.addToScene(playerProj);
        // check for collisions between player and his own bullets
        // fires every time bc bullet get spawned inside of player

        if (checkCollisionBetween(this.player, playerProj)) {
          console.log('COLLISION!!!!!!!!!!!!!!');
        }
      }
    });

    super.continue();
  }

  update() {
    document.addEventListener('mousemove', (e) => {
      this.player.texture.rotCenterX = e.offsetX;
      this.player.texture.rotCenterY = e.offsetY;
    });

    this.enemy1.texture.rotCenterX = this.player.texture.x;
    this.enemy1.texture.rotCenterY = this.player.texture.y;

    // update the game scene according to GLOBAL.deltaTime
    this.gameScene.update(GLOBAL.deltaTime);
  }

  render() {
    // clear canvas before drawing
    GLOBAL.ctx.resetTransform();
    GLOBAL.ctx.clearRect(0, 0, GLOBAL.windowWidth, GLOBAL.windowHeight);

    // this.enemy1.rotCenterX = this.player.texture.x;
    // this.enemy1.rotCenterY = this.player.texture.y;

    // render the game scene
    this.gameScene.render();
  }
}

export default notAgain;
