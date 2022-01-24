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
    anton_idle: {
      src: './assets/anton_still.png',
      frames: 1,
      fps: 1,
      frameSize: {
        width: 128,
        height: 128,
      },
      image: null,
    },

    anton_walk: {
      src: './assets/anton_walk.png',
      frames: 2,
      fps: 5,
      frameSize: {
        width: 128,
        height: 128,
      },
      image: null,
    },
    enemy_idle: {
      src: './assets/enemy_still.png',
      frames: 1,
      fps: 1,
      frameSize: {
        width: 128,
        height: 128,
      },
      image: null,
    },
  };

  // sprite animation state
  playerState = 'anton_idle';
  enemyState = 'enemy_idle';

  // game characters
  player;
  enemies = [];

  points = 0;

  // contains player projectiles
  playerProjectiles = [];
  enemyProjectiles = [];

  // initial iteration time
  iterationStartTimer = 0;

  init() {
    super.init();

    // create player
    this.player = new Player(this.sprites, this.playerState, 1, 200, 200);
    this.gameScene.addToScene(this.player);

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

    // time iteration which run every 10 seconds
    setInterval(() => {
      this.createIteration();
    }, 10000);

    super.continue();
  }

  createIteration() {
    let enemy = new Enemy(
      this.sprites,
      this.enemyState,
      1,
      randomNumberBetween(0, GLOBAL.windowWidth),
      randomNumberBetween(0, GLOBAL.windowHeight)
    );
    // push newly created enemies into array
    this.enemies.push(enemy);
    this.gameScene.addToScene(enemy);

    // console.log(this.enemies);

    // execute its methods for every enemy inside array
  }

  update() {
    document.addEventListener('mousemove', (e) => {
      this.player.texture.rotCenterX = e.offsetX;
      this.player.texture.rotCenterY = e.offsetY;
    });

    for (let i = 0; i < this.enemies.length; i++) {
      // rotate enemies towards player position
      this.enemies[i].texture.rotCenterX = this.player.texture.x;
      this.enemies[i].texture.rotCenterY = this.player.texture.y;

      this.enemies[i].shoot(
        this.enemies[i].texture.x,
        this.enemies[i].texture.y,
        this.player.texture.x,
        this.player.texture.y
      );
      this.enemyProjectiles.push(this.enemies[i].enemyProj);
      this.gameScene.addToScene(this.enemies[i].enemyProj);

      // may be related to the changing position of the player, and the creation of projectiles when moving (values update inside the update loop (high fps))

      // player -> enemy
      // & delete player projectile that hit enemies
      let playerProjToDel = [];
      this.playerProjectiles.forEach((proj) => {
        if (checkCollisionBetween(proj, this.enemies[i])) {
          playerProjToDel.push(proj);
          console.log('col - player -> enemy');

          this.enemies[i].health--;
          if (this.enemies[i].health === 0) {
            console.log('enemy died');

            // add one point to score
            this.points++;
            console.log('score: ', this.points);
          }
        }
      });
      playerProjToDel.forEach((proj) => {
        this.playerProjectiles.splice(this.playerProjectiles.indexOf(proj), 1);
        this.gameScene.removeFromScene(proj);
      });

      // enemy -> player
      // & delete enemy projectile that hit the player
      let enemyProjToDel = [];
      this.enemyProjectiles.forEach((proj) => {
        if (checkCollisionBetween(proj, this.player)) {
          enemyProjToDel.push(proj);
          // console.log('col - enemy -> player');

          this.player.health--;
          if (this.player.health === 0) {
            console.log('player died');
          }
        }
      });
      enemyProjToDel.forEach((proj) => {
        this.enemyProjectiles.splice(this.enemyProjectiles.indexOf(proj), 1);
        this.gameScene.removeFromScene(proj);
      });
    }

    // update the game scene according to GLOBAL.deltaTime
    this.gameScene.update(GLOBAL.deltaTime);

    // console.log(this.gameScene);
    console.log('enemy: ', this.enemyProjectiles.length);
    // console.log('player: ', this.playerProjectiles.length);
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
