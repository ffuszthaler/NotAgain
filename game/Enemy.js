import GLOBAL from '../engine/Globals.js';

import Actor from '../engine/actors/Actor.js';
import SpriteMap from '../engine/sprite/SpriteMap.js';

class Enemy extends Actor {
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

    this.health = 2;

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

    // GLOBAL.player.state = dx === 0 && dy === 0 ? 'idle' : 'run';
    // sprite hack bc i dont have a running cycle rn
    this.texture.state = this.dx === 0 && this.dy === 0 ? 'enemy' : 'enemy';

    // this.texture.x += deltaTime * this.dx * this.velocity;
    // this.texture.y += deltaTime * this.dy * this.velocity;

    // add the shooting at player mechanic here
  }

  render() {
    super.render();

    this.texture.render();
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

export default Enemy;
