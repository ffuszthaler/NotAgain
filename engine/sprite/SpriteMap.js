// Utility classes to load sprite sheets

import GLOBAL from '../Globals.js';

import { degToRad } from '../utilities/Math.js';

class SpriteMap {
  #scale;

  constructor(sprites, state, x, y, scale) {
    this.sprites = sprites;

    this.state = state;

    this.width;
    this.height;

    this.x = x;
    this.y = y;

    this.#scale = scale;

    this.lastDirection;

    this.init();
  }

  init() {
    // load images
    Object.values(this.sprites).forEach((sprite) => {
      sprite.image = new Image();
      sprite.image.src = sprite.src;
    });

    // get mouse position relative to the canvas
    GLOBAL.mouse = { x: 0, y: 0 };

    function mouseEvents(e) {
      const bounds = GLOBAL.canvas.getBoundingClientRect();
      GLOBAL.mouse.x = e.pageX - bounds.left - scrollX;
      GLOBAL.mouse.y = e.pageY - bounds.top - scrollY;
    }
    document.addEventListener('mousemove', mouseEvents);
  }

  update(deltaTime) {}

  getImageSpriteCoordinates(sprite) {
    // loop through frames
    let frameX = Math.floor(((performance.now() / 1000) * sprite.fps) % sprite.frames);

    let coords = {
      sourceX: frameX * sprite.frameSize.width,
      sourceY: 0,
      sourceWidth: sprite.frameSize.width,
      sourceHeight: sprite.frameSize.height,
    };

    return coords;
  }

  render() {
    // move to correct position
    GLOBAL.ctx.translate(this.x, this.y);

    GLOBAL.ctx.scale(this.lastDirection, 1);

    // get individual frame coordinates
    let coords = this.getImageSpriteCoordinates(this.sprites[this.state]);

    // scale sprite frames according to scaling factor
    this.width = coords.sourceWidth * this.#scale;
    this.height = coords.sourceHeight * this.#scale;

    // calculate angle for rotation and rotate sprite
    let angle = Math.atan2(GLOBAL.mouse.y - this.y, GLOBAL.mouse.x - this.x) + degToRad(90);
    GLOBAL.ctx.rotate(angle);

    GLOBAL.ctx.drawImage(
      this.sprites[this.state].image, // src
      coords.sourceX, // source x
      coords.sourceY, // source y
      coords.sourceWidth, // source width
      coords.sourceHeight, // source height
      -this.width / 2, // dest x
      -this.height / 2, // dest y
      this.width, // dest width
      this.height // dest height
    );

    // reset any remaining transform call
    GLOBAL.ctx.resetTransform();
  }
}

export default SpriteMap;
