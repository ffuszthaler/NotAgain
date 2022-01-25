import GLOBAL from '../engine/Globals.js';

import SpriteMap from '../engine/sprite/SpriteMap.js';
import Actor from '../engine/actors/Actor.js';
import Keyboard from '../engine/input/Keyboard.js';

class Player extends Actor {
  constructor(sprites, state, scale, x, y, rotCenterX, rotCenterY) {
    super(x, y);

    this.dx = 0;
    this.dy = 0;

    this.velocity = 0.3;

    this.sprites = sprites;
    this.state = state;
    this.scale = scale;

    this.x = x;
    this.y = y;

    this.rotCenterX = rotCenterX;
    this.rotCenterY = rotCenterY;

    this.health = 3;

    this.init();
  }

  init() {
    this.texture = new SpriteMap(
      this.sprites,
      this.state,
      this.x,
      this.y,
      this.scale,
      this.rotCenterX,
      this.rotCenterY
    );

    this.keyboard = new Keyboard();
  }

  update(deltaTime) {
    if (this.keyboard.currentKeys['KeyW'] === true) {
      this.dy = -1;
    } else if (this.keyboard.currentKeys['KeyS'] === true) {
      this.dy = 1;
    } else {
      this.dy = 0;
    }

    if (this.keyboard.currentKeys['KeyA'] === true) {
      this.dx = -1;
    } else if (this.keyboard.currentKeys['KeyD'] === true) {
      this.dx = 1;
    } else {
      this.dx = 0;
    }

    // bounds detection
    // right
    if (this.texture.x + this.texture.width / 2 > GLOBAL.windowWidth)
      this.texture.x = GLOBAL.windowWidth - this.texture.width / 2;
    // left
    else if (this.texture.x - this.texture.width / 2 < 0) this.texture.x = 0 + this.texture.width / 2;

    // bottom
    if (this.texture.y + this.texture.height / 2 > GLOBAL.windowHeight)
      this.texture.y = GLOBAL.windowHeight - this.texture.height / 2;
    // top
    else if (this.texture.y - this.texture.height / 2 < 0) this.texture.y = 0 + this.texture.height / 2;

    // correct velocity for moving diagonally
    if (this.dx !== 0 && this.dy !== 0) {
      this.dx /= Math.hypot(this.dx, this.dy);
      this.dy /= Math.hypot(this.dx, this.dy);
    }

    this.texture.state = this.dx === 0 && this.dy === 0 ? 'anton_idle' : 'anton_walk';

    this.texture.x += deltaTime * this.dx * this.velocity;
    this.texture.y += deltaTime * this.dy * this.velocity;
  }

  render() {
    super.render();

    this.texture.render();

    if (GLOBAL.debug) {
      let bb = this.getBoundingBox();
      GLOBAL.ctx.translate(bb.x, bb.y);
      GLOBAL.ctx.strokeRect(0, 0, bb.w, bb.h);
      GLOBAL.ctx.resetTransform();
    }
  }

  // get bounding box values for player
  getBoundingBox() {
    return {
      x: this.texture.x - this.texture.width / 2,
      y: this.texture.y - this.texture.height / 2,
      w: this.texture.width,
      h: this.texture.height,
    };
  }
}

export default Player;
