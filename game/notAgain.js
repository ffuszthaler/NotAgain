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

  // counts the iterations
  iterationCounter = 0;
  iterationTimer;

  // reinforcement time out
  reinforcementWaitTime;

  // timer event
  timerEvent = false;
  timerPoints = 3;

  // player death state
  playerIsDead = false;

  init() {
    super.init();

    // reset relevant game values for initialization
    this.points = 0;
    this.iterationCounter = 0;
    this.gameScene.actors.length = 0;
    this.enemies.length = 0;
    clearInterval(this.iterationTimer);
    clearTimeout(this.reinforcementWaitTime);

    // create player
    this.player = new Player(this.sprites, this.playerState, 1, 200, 200);
    this.gameScene.addToScene(this.player);

    this.keyboard = new Keyboard();

    // left mouse button to shoot a bullet as the player
    document.addEventListener('mousedown', (e) => {
      if (e.button === 0) {
        // only shoot if player is alive
        if (this.player.health > 0) {
          let playerProj = new Projectile(this.player.texture.x, this.player.texture.y, e.offsetX, e.offsetY, 3);

          // add to scene
          this.gameScene.addToScene(playerProj);

          // add to player projectile array, to be deleted
          this.playerProjectiles.push(playerProj);
        }
      }
    });

    // time iteration which run every 10 seconds
    this.iterationTimer = setInterval(() => {
      this.createIteration();
    }, 10000);

    super.continue();
  }

  createIteration() {
    if (this.player.health > 0) {
      this.iterationCounter++;

      let enemy = new Enemy(
        this.sprites,
        this.enemyState,
        1,
        randomNumberBetween(0, GLOBAL.windowWidth),
        randomNumberBetween(0, GLOBAL.windowHeight),
        this.player.texture.x,
        this.player.texture.y
      );

      // push newly created enemies into array
      this.enemies.push(enemy);
      this.gameScene.addToScene(enemy);

      // setInterval(() => {
      // this.shoot(this.x, this.y, this.playerX, this.playerY);

      enemy.shoot(enemy.texture.x, enemy.texture.y, this.player.texture.x, this.player.texture.y);
      this.enemyProjectiles.push(enemy.enemyProj);
      this.gameScene.addToScene(enemy.enemyProj);
    }
    // }, randomNumberBetween(100, 2000));
  }

  update() {
    document.addEventListener('mousemove', (e) => {
      this.player.texture.rotCenterX = e.offsetX;
      this.player.texture.rotCenterY = e.offsetY;
    });

    // bounds detection for player projectiles
    this.playerProjectiles.forEach((proj) => {
      if (proj.projCol.right) {
        this.gameScene.removeFromScene(proj);
        this.playerProjectiles.splice(this.playerProjectiles.indexOf(proj), 1);
        proj.projCol.right = false;
      }
      if (proj.projCol.left) {
        this.gameScene.removeFromScene(proj);
        this.playerProjectiles.splice(this.playerProjectiles.indexOf(proj), 1);
        proj.projCol.left = false;
      }
      if (proj.projCol.bottom) {
        this.gameScene.removeFromScene(proj);
        this.playerProjectiles.splice(this.playerProjectiles.indexOf(proj), 1);
        proj.projCol.bottom = false;
      }
      if (proj.projCol.top) {
        this.gameScene.removeFromScene(proj);
        this.playerProjectiles.splice(this.playerProjectiles.indexOf(proj), 1);
        proj.projCol.top = false;
      }
    });

    // bounds detection for enemy projectiles
    this.enemyProjectiles.forEach((proj) => {
      if (proj.projCol.right) {
        this.gameScene.removeFromScene(proj);
        this.enemyProjectiles.splice(this.enemyProjectiles.indexOf(proj), 1);
        proj.projCol.right = false;
      }
      if (proj.projCol.left) {
        this.gameScene.removeFromScene(proj);
        this.enemyProjectiles.splice(this.enemyProjectiles.indexOf(proj), 1);
        proj.projCol.left = false;
      }
      if (proj.projCol.bottom) {
        this.gameScene.removeFromScene(proj);
        this.enemyProjectiles.splice(this.enemyProjectiles.indexOf(proj), 1);
        proj.projCol.bottom = false;
      }
      if (proj.projCol.top) {
        this.gameScene.removeFromScene(proj);
        this.enemyProjectiles.splice(this.enemyProjectiles.indexOf(proj), 1);
        proj.projCol.top = false;
      }
    });

    // execute enemy instance methods for every enemy inside array
    for (let i = 0; i < this.enemies.length; ++i) {
      // rotate enemies towards player position
      this.enemies[i].texture.rotCenterX = this.player.texture.x;
      this.enemies[i].texture.rotCenterY = this.player.texture.y;

      // player -> enemy
      // & delete player projectile that hit enemies
      let enemiesToDel = [];
      let playerProjToDel = [];
      this.playerProjectiles.forEach((proj) => {
        if (checkCollisionBetween(proj, this.enemies[i])) {
          playerProjToDel.push(proj);

          this.enemies[i].health--;
          if (this.enemies[i].health === 0) {
            // remove enemy that was killed
            this.gameScene.removeFromScene(this.enemies[i]);
            enemiesToDel.push(this.enemies[i]);

            this.points++;
          }
        }
      });
      playerProjToDel.forEach((proj) => {
        this.playerProjectiles.splice(this.playerProjectiles.indexOf(proj), 1);
        this.gameScene.removeFromScene(proj);
      });

      // delete dead enemies from game
      enemiesToDel.forEach((enemy) => {
        this.enemies.splice(this.enemies.indexOf(enemy), 1);
      });

      // enemy -> player
      // & delete enemy projectile that hit the player
      let enemyProjToDel = [];
      // projectile bounds detection for enemies projectiles
      this.enemyProjectiles.forEach((proj) => {
        if (checkCollisionBetween(proj, this.player)) {
          enemyProjToDel.push(proj);

          this.player.health--;

          if (this.player.health === 0) {
            this.playerIsDead = true;

            GLOBAL.gameStarted = false;

            // hide game
            document.querySelector('canvas').style.display = 'none';
            document.getElementById('logo').style.display = 'none';
            // document.getElementById('startButton').style.display = 'none';
            document.getElementById('startButton').style.display = 'block';

            // show end screen
            document.getElementById('endText').style.display = 'block';
            document.getElementById('endPoints').style.display = 'block';
            document.getElementById('endIteration').style.display = 'block';

            // add loss data to end screen
            document.getElementById('endText').innerText = 'YOU LOST';
            document.getElementById('endPoints').innerText = this.points + ' Point(s)';
            document.getElementById('endIteration').innerText = this.iterationCounter + ' Iteration(s)';

            // remove player that was killed
            this.gameScene.removeFromScene(this.player);
          }
        }
      });
      enemyProjToDel.forEach((proj) => {
        this.enemyProjectiles.splice(this.enemyProjectiles.indexOf(proj), 1);
        this.gameScene.removeFromScene(proj);
      });
    }

    // timer section
    if (this.points >= this.timerPoints && this.keyboard.currentKeys['KeyE'] === true && this.timerEvent === false) {
      this.timerEvent = true;

      if (this.playerIsDead) {
        this.reinforcementWaitTime = setTimeout(() => {
          GLOBAL.gameStarted = false;

          // hide game
          document.querySelector('canvas').style.display = 'none';
          document.getElementById('logo').style.display = 'none';
          // document.getElementById('startButton').style.display = 'none';
          document.getElementById('startButton').style.display = 'block';

          // show end screen
          document.getElementById('endText').style.display = 'block';
          document.getElementById('endPoints').style.display = 'block';
          document.getElementById('endIteration').style.display = 'block';

          // add loss data to end screen
          document.getElementById('endText').innerText = 'YOU WON';
          document.getElementById('endPoints').innerText = this.points + ' Point(s)';
          document.getElementById('endIteration').innerText = this.iterationCounter + ' Iteration(s)';
        }, 30000);
      }
    }

    // update the game scene according to GLOBAL.deltaTime
    this.gameScene.update(GLOBAL.deltaTime);
  }

  render() {
    // clear canvas before drawing
    GLOBAL.ctx.resetTransform();
    GLOBAL.ctx.clearRect(0, 0, GLOBAL.windowWidth, GLOBAL.windowHeight);

    // text foreground
    GLOBAL.ctx.fillStyle = 'white';
    GLOBAL.ctx.font = 'bold 30px Arial';
    GLOBAL.ctx.textAlign = 'center';
    GLOBAL.ctx.fillText('Score: ' + this.points, GLOBAL.windowWidth - 100, 40);

    GLOBAL.ctx.fillText('Iteration: ' + this.iterationCounter, 110, GLOBAL.windowHeight - 20);

    if (this.points >= this.timerPoints && this.timerEvent === false) {
      GLOBAL.ctx.fillText(
        'Press E to call reinforcements and survive for 30 seconds',
        GLOBAL.windowWidth / 2,
        GLOBAL.windowHeight / 2
      );
    }

    // render the game scene
    this.gameScene.render();
  }
}

export default notAgain;
