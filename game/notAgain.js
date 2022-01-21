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
    enemy: {
      src: './assets/enemy.png',
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
  playerState = 'anton';
  enemyState = 'enemy';

  player;
  enemy1;
  enemy2;

  // contains player projectiles
  playerProjectiles = [];

  init() {
    super.init();

    // create player
    this.player = new Player(this.sprites, this.playerState, 1, 200, 200);
    this.gameScene.addToScene(this.player);

    // test enemy 1
    this.enemy1 = new Enemy(
      this.sprites,
      this.enemyState,
      1,
      randomNumberBetween(0, GLOBAL.windowWidth),
      randomNumberBetween(0, GLOBAL.windowHeight)
    );
    this.gameScene.addToScene(this.enemy1);

    // test enemy 2
    this.enemy2 = new Enemy(
      this.sprites,
      this.enemyState,
      1,
      randomNumberBetween(0, GLOBAL.windowWidth),
      randomNumberBetween(0, GLOBAL.windowHeight)
    );
    // this.gameScene.addToScene(this.enemy2);

    // left mouse button to shoot a bullet as the player
    document.addEventListener('mousedown', (e) => {
      if (e.button === 0) {
        let playerProj = new Projectile(this.player.texture.x, this.player.texture.y, e.offsetX, e.offsetY, 3);

        // add to scene
        this.gameScene.addToScene(playerProj);

        // add to player projectile array, to be deleted
        this.playerProjectiles.push(playerProj);
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

    this.enemy2.texture.rotCenterX = this.player.texture.x;
    this.enemy2.texture.rotCenterY = this.player.texture.y;

    // update the game scene according to GLOBAL.deltaTime
    this.gameScene.update(GLOBAL.deltaTime);

    // check of player projectile has hit enemy1
    // and if it did delete it afterwards
    let projToDel = [];

    this.playerProjectiles.forEach((proj) => {
      if (checkCollisionBetween(proj, this.enemy1)) {
        projToDel.push(proj);
        console.log('col');
      }
    });

    projToDel.forEach((proj) => {
      this.playerProjectiles.splice(this.playerProjectiles.indexOf(proj), 1);
      this.gameScene.removeFromScene(proj);
    });

    console.log(this.playerProjectiles);
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
