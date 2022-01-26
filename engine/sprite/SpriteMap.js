// Utility classes to load and animate sprite sheets
import GLOBAL from '../Globals.js';

import { degToRad } from '../utilities/Math.js';

class SpriteMap {
  constructor(sprites, state, x, y, scale, rotCenterX, rotCenterY) {
    this.sprites = sprites;

    this.state = state;

    this.width;
    this.height;

    this.x = x;
    this.y = y;

    this.scale = scale;

    this.rotCenterX = rotCenterX;
    this.rotCenterY = rotCenterY;

    this.lastDirection;

    this.rotation;

    this.init();
  }

  init() {
    // load images
    Object.values(this.sprites).forEach((sprite) => {
      sprite.image = new Image();
      sprite.image.src = sprite.src;
    });

    // calculate mouse rotation
    GLOBAL.canvas.addEventListener('mousemove', (e) => {
      //  Calculate rotation angle
      let targetX = this.rotCenterX;
      let targetY = this.rotCenterY;

      let dx = targetX - this.x;
      let dy = targetY - this.y;

      //  Save rotation angle
      this.rotation = Math.atan2(dy, dx) + degToRad(90);
    });
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
    this.width = coords.sourceWidth * this.scale;
    this.height = coords.sourceHeight * this.scale;

    // manually set transform values
    GLOBAL.ctx.setTransform(1, 0, 0, 1, this.x, this.y);

    // rotate player according to mouse position
    GLOBAL.ctx.rotate(this.rotation);

    // debug line to show rotation of game character
    if (GLOBAL.debug) {
      GLOBAL.ctx.strokeStyle = 'red';
      GLOBAL.ctx.stroke();
      GLOBAL.ctx.beginPath();
      GLOBAL.ctx.moveTo(0, -20);
      GLOBAL.ctx.lineTo(0, -100);
      GLOBAL.ctx.stroke();
    }

    // draw player
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

    //  reset transform values back to normal
    GLOBAL.ctx.setTransform(1, 0, 0, 1, 0, 0);

    // reset any remaining transform call
    GLOBAL.ctx.resetTransform();
  }
}

export default SpriteMap;
