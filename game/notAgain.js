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

    // test enemy 1
    this.enemy1 = new Enemy(
      this.sprites,
      this.enemyState,
      1,
      randomNumberBetween(0, GLOBAL.windowWidth),
      randomNumberBetween(0, GLOBAL.windowHeight)
    );
    // this.gameScene.addToScene(this.enemy1);

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

    // update enemy rotation towards new player position
    // this.enemy1.texture.rotCenterX = this.player.texture.x;
    // this.enemy1.texture.rotCenterY = this.player.texture.y;

    // have the enemy shoot at the player
    // this.enemy1.shoot(this.enemy1.texture.x, this.enemy1.texture.y, this.player.texture.x, this.player.texture.y);
    // this.enemyProjectiles.push(this.enemy1.enemyProj);
    // this.gameScene.addToScene(this.enemy1.enemyProj);

    // check of player projectile has hit enemy
    // and if it did, delete it afterwards
    // let playerProjToDel = [];
    // this.playerProjectiles.forEach((proj) => {
    //   if (checkCollisionBetween(proj, this.enemy1)) {
    //     playerProjToDel.push(proj);
    //     console.log('col - player -> enemy');

    //     this.enemy1.health--;
    //     if (this.enemy1.health === 0) {
    //       console.log('enemy died');

    //       this.points++;

    //       console.log('score: ', this.points);
    //     }
    //   }
    // });

    // delete player projectile that hit enemies
    // playerProjToDel.forEach((proj) => {
    //   this.playerProjectiles.splice(this.playerProjectiles.indexOf(proj), 1);
    //   this.gameScene.removeFromScene(proj);
    // });

    // check if enemy projectile has hit player
    // and if it did, delete it afterwards
    // let enemyProjToDel = [];
    // this.enemyProjectiles.forEach((proj) => {
    //   if (checkCollisionBetween(proj, this.player)) {
    //     enemyProjToDel.push(proj);
    //     console.log('col - enemy -> player');

    //     this.player.health--;
    //     if (this.player.health === 0) {
    //       console.log('player died');
    //     }
    //   }
    // });

    // delete enemy projectile that hit the player
    // enemyProjToDel.forEach((proj) => {
    //   this.enemyProjectiles.splice(this.enemyProjectiles.indexOf(proj), 1);
    //   this.gameScene.removeFromScene(proj);
    // });

    // time iteration which run every 10 seconds
    this.iterationStartTimer += GLOBAL.deltaTime;
    if (this.iterationStartTimer >= 10000) {
      // push newly created enemies into array
      this.enemies.push(
        new Enemy(
          this.sprites,
          this.enemyState,
          1,
          randomNumberBetween(0, GLOBAL.windowWidth),
          randomNumberBetween(0, GLOBAL.windowHeight)
        )
      );

      console.log(this.enemies);

      // reset timer
      this.iterationStartTimer = 0;
    }

    // execute its methods for every enemy inside array
    for (let i = 0; i < this.enemies.length; i++) {
      this.gameScene.addToScene(this.enemies[i]);

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
          console.log('col - enemy -> player');

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
