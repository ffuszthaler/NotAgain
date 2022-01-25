import GLOBAL from '../engine/Globals.js';
import Engine, { checkCollisionBetween } from '../engine/Engine.js';
import { randomNumberBetween } from '../engine/utilities/Random.js';

import Scene from '../engine/Scene.js';
import Projectile from '../engine/actors/Projectile.js';

import Player from './Player.js';
import Enemy from './Enemy.js';
import Keyboard from '../engine/input/Keyboard.js';

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

  // timer event
  timerEvent = false;

  init() {
    super.init();

    // create player
    this.player = new Player(this.sprites, this.playerState, 1, 200, 200);
    this.gameScene.addToScene(this.player);

    this.keyboard = new Keyboard();

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

    enemy.shoot(enemy.texture.x, enemy.texture.y, this.player.texture.x, this.player.texture.y);
    this.enemyProjectiles.push(enemy.enemyProj);
    this.gameScene.addToScene(enemy.enemyProj);

    console.log(this.enemies);
  }

  update() {
    document.addEventListener('mousemove', (e) => {
      this.player.texture.rotCenterX = e.offsetX;
      this.player.texture.rotCenterY = e.offsetY;
    });

    for (let i = 0; i < this.enemies.length; ++i) {
      // execute enemy instance methods for every enemy inside array

      // this.enemies[i].shoot(
      //   this.enemies[i].texture.x,
      //   this.enemies[i].texture.y,
      //   this.player.texture.x,
      //   this.player.texture.y
      // );
      // this.enemyProjectiles.push(this.enemies[i].enemyProj);
      // this.gameScene.addToScene(this.enemies[i].enemyProj);

      // !: seems to be the shooting mechanic of the enemies inside the update

      // player -> enemy
      // & delete player projectile that hit enemies
      let playerProjToDel = [];
      this.playerProjectiles.forEach((proj) => {
        // projectile bounds detection for player projectiles
        if (proj.projCol.right) {
          this.gameScene.removeFromScene(proj);
          proj.projCol.right = false;
        }
        if (proj.projCol.left) {
          this.gameScene.removeFromScene(proj);
          proj.projCol.left = false;
        }
        if (proj.projCol.bottom) {
          this.gameScene.removeFromScene(proj);
          proj.projCol.bottom = false;
        }
        if (proj.projCol.top) {
          this.gameScene.removeFromScene(proj);
          proj.projCol.top = false;
        }

        if (checkCollisionBetween(proj, this.enemies[i])) {
          playerProjToDel.push(proj);
          // console.log('col - player -> enemy');

          this.enemies[i].health--;
          if (this.enemies[i].health === 0) {
            // add one point to score & display it
            this.points++;
            let scoreElement = document.getElementById('score');
            scoreElement.innerText = this.points + ' Pts';

            // remove enemy that was killed
            this.gameScene.removeFromScene(this.enemies[i]);
          }
        }
      });
      playerProjToDel.forEach((proj) => {
        this.playerProjectiles.splice(this.playerProjectiles.indexOf(proj), 1);
        this.gameScene.removeFromScene(proj);
      });

      // if (this.points === 3 && this.keyboard.currentKeys['KeyE'] === true && this.timerEvent === false) {
      //   this.timerEvent = true;
      //   console.log('hi from e');
      // }

      // enemy -> player
      // & delete enemy projectile that hit the player
      let enemyProjToDel = [];
      // projectile bounds detection for enemies projectiles
      this.enemyProjectiles.forEach((proj) => {
        if (proj.projCol.right) {
          this.gameScene.removeFromScene(proj);
          proj.projCol.right = false;
        }
        if (proj.projCol.left) {
          this.gameScene.removeFromScene(proj);
          proj.projCol.left = false;
        }
        if (proj.projCol.bottom) {
          this.gameScene.removeFromScene(proj);
          proj.projCol.bottom = false;
        }
        if (proj.projCol.top) {
          this.gameScene.removeFromScene(proj);
          proj.projCol.top = false;
        }

        if (checkCollisionBetween(proj, this.player)) {
          enemyProjToDel.push(proj);
          // console.log('col - enemy -> player');

          this.player.health--;
          console.log('player health: ', this.player.health);

          if (this.player.health === 0) {
            console.log('player died');

            // remove player that was killed
            // this.gameScene.removeFromScene(this.player);
          }
        }
      });
      enemyProjToDel.forEach((proj) => {
        this.enemyProjectiles.splice(this.enemyProjectiles.indexOf(proj), 1);
        this.gameScene.removeFromScene(proj);
      });

      // rotate enemies towards player position
      this.enemies[i].texture.rotCenterX = this.player.texture.x;
      this.enemies[i].texture.rotCenterY = this.player.texture.y;
    }

    // update the game scene according to GLOBAL.deltaTime
    this.gameScene.update(GLOBAL.deltaTime);

    console.log(this.gameScene.actors);
    console.log('enemy - proj: ', this.enemyProjectiles.length);
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
