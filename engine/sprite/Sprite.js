// Utility classes to load images

import GLOBAL from '../Globals.js';

class Sprite {
  #sprite;

  #width;
  #height;

  #scale;

  constructor(spriteSrc, x, y, scale) {
    this.#sprite = new Image();
    this.#sprite.src = spriteSrc;

    this.#width = 0;
    this.#height = 0;

    this.x = x;
    this.y = y;

    this.#scale = scale;

    this.init();
  }

  init() {
    // get size from image file and scale down
    this.#sprite.onload = () => {
      this.#width = this.#sprite.naturalWidth * this.#scale;

      this.#height = this.#sprite.naturalHeight * this.#scale;
    };
  }

  update(deltaTime) {}

  render() {
    // move to correct position
    GLOBAL.ctx.translate(this.x, this.y);

    GLOBAL.ctx.drawImage(
      this.#sprite, // src
      -this.#width / 2, // dest x
      -this.#height / 2, // dest y
      this.#width, // dest width
      this.#height // dest height
    );

    // reset any remaining transform call
    GLOBAL.ctx.resetTransform();
  }
}

export default Sprite;
