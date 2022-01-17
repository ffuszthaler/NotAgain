// Actor parent class for layout and basic logic
// Every 'actor' inside the scene inherits this

import GLOBAL from '../Globals.js';

class Actor {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;

    this.width = width;
    this.height = height;

    this.init();
  }

  init() {}

  update(deltaTime) {}

  render() {
    // draw bounding box rectangle if debug flag is set
    if (GLOBAL.debug) {
      let bb = this.getBoundingBox();
      GLOBAL.ctx.translate(bb.x, bb.y);
      GLOBAL.ctx.strokeRect(0, 0, bb.w, bb.h);
      GLOBAL.ctx.resetTransform();
    }
  }

  getBoundingBox() {
    return {
      x: this.x - this.width / 2,
      y: this.y - this.height / 2,
      w: this.width,
      h: this.height,
    };
  }
}

export default Actor;
