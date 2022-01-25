import GLOBAL from '../engine/Globals.js';

import Actor from '../engine/actors/Actor.js';
import SpriteMap from '../engine/sprite/SpriteMap.js';
import Projectile from '../engine/actors/Projectile.js';

class Enemy extends Actor {
  constructor(sprites, state, scale, x, y, rotCenterX, rotCenterY, playerX, playerY) {
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

    this.playerX = playerX;
    this.playerX = playerY;

    this.health = 2;

    this.lastShot = 0;

    this.init();

    // let the enemy shoot every x amount of seconds
    // setInterval(() => {
    //   console.log('am shooting');
    //   this.shoot(this.x, this.y, this.playerX, this.playerY);
    // }, 2000);
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
  }

  update(deltaTime) {
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

  shoot(x, y, targetX, targetY) {
    if (performance.now() - this.lastShot < GLOBAL.shotLimit) {
      return;
    }
    this.enemyProj = new Projectile(x, y, targetX, targetY, 3);
    this.lastShot = performance.now();
  }
}

export default Enemy;
