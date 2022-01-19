import GLOBAL from '../engine/Globals.js';
import Engine from '../engine/Engine.js';

import Scene from '../engine/Scene.js';
// import SpriteMap from '../engine/sprite/SpriteMap.js';
import Sprite from '../engine/sprite/Sprite.js';
import Projectile from '../engine/actors/Projectile.js';

import Keyboard from '../engine/input/Keyboard.js';
import Mouse from '../engine/input/Mouse.js';

import Anton from './anton.js';

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

    this.player = new Anton(this.sprites, this.state, 1, 200, 200);
    this.gameScene.addToScene(this.player);

    GLOBAL.mouse = new Mouse();

    document.addEventListener('mousedown', (e) => {
      let proj = new Projectile(this.player.texture.x + 40, this.player.texture.y, 5, 10);
      // let proj = new Projectile(e.offsetX - 310, e.offsetY, 5, 10);

      this.gameScene.addToScene(proj);
      console.log(this.gameScene);
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

    // left mouse button
    // if (GLOBAL.mouse.mouseKeys[0] === true) {
    //   // let proj = new Projectile(this.player.x, this.player.y - 50, 5, 10);
    //   let proj = new Projectile(this.player.texture.x + 40, this.player.texture.y, 5, 10);
    //   console.log(this.player.x);

    //   // console.log('projectile-x: ', proj.x);
    //   // console.log('projectile-y: ', proj.y);

    //   // console.log('projectile: ', proj);
    //   this.gameScene.addToScene(proj);
    //   console.log(this.gameScene);

    //   projectileCount++;
    // }

    // render the game scene
    this.gameScene.render();
  }
}

export default notAgain;
