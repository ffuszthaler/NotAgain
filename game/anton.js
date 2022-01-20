import GLOBAL from '../engine/Globals.js';

import SpriteMap from '../engine/sprite/SpriteMap.js';
import Actor from '../engine/actors/Actor.js';
import Keyboard from '../engine/input/Keyboard.js';

class Anton extends Actor {
  constructor(sprites, state, scale, x, y) {
    super(x, y);

    this.dx = 0;
    this.dy = 0;

    this.velocity = 0.3;

    this.sprites = sprites;
    this.state = state;
    this.scale = scale;

    this.x = x;
    this.y = y;

    this.init();
  }

  init() {
    // super.init();

    this.texture = new SpriteMap(this.sprites, this.state, this.x, this.y, this.scale);

    this.keyboard = new Keyboard();
  }

  update(deltaTime) {
    // super.update();

    this.keyboard.keyPressed('KeyW', (isPressed, currentKeys) => {
      if (!currentKeys['KeyS']) this.dy = isPressed ? -1 : 0;
    });

    this.keyboard.keyPressed('KeyA', (isPressed, currentKeys) => {
      if (!currentKeys['KeyD']) this.dx = isPressed ? -1 : 0;
    });

    this.keyboard.keyPressed('KeyS', (isPressed, currentKeys) => {
      if (!currentKeys['KeyW']) this.dy = isPressed ? 1 : 0;
    });

    this.keyboard.keyPressed('KeyD', (isPressed, currentKeys) => {
      if (!currentKeys['KeyA']) this.dx = isPressed ? 1 : 0;
    });

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
    this.texture.state = this.dx === 0 && this.dy === 0 ? 'anton' : 'anton';

    this.texture.x += deltaTime * this.dx * this.velocity;
    this.texture.y += deltaTime * this.dy * this.velocity;
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

export default Anton;
