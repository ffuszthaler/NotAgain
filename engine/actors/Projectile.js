import GLOBAL from '../Globals.js';

import Actor from './Actor.js';

class Projectile extends Actor {
  constructor(x, y, mouseX, mouseY, radius) {
    super(x, y);

    this.projPos = {
      x: x,
      y: y,
    };

    // mouse cursor position
    this.mousePos = {
      x: mouseX,
      y: mouseY,
    };

    // size of projectile
    this.radius = radius;

    // velocity
    this.velocity = {
      x: 0,
      y: 0,
    };

    // projectile collision object
    this.projCol = {
      top: false,
      bottom: false,
      left: false,
      right: false,
    };

    // initial acceleration
    this.acceleration = 0.47;

    // deceleration factor
    this.deceleration = 0.995;

    // has to be here, because of context reasons
    this.init();
  }

  init() {
    // direction vector
    this.direction = {
      x: this.mousePos.x - this.projPos.x,
      y: this.mousePos.y - this.projPos.y,
    };

    // calculate distance
    let dist = Math.sqrt(this.direction.x ** 2 + this.direction.y ** 2);

    // make things move
    this.direction.x = this.direction.x / dist;
    this.direction.y = this.direction.y / dist;

    // 40 pixel offset at start
    this.projPos.x += this.direction.x * 40;
    this.projPos.y += this.direction.y * 40;
  }

  update() {
    // update based on direction and GLOBAL.deltaTime
    // this.projPos.x += this.direction.x * GLOBAL.deltaTime * 1;
    // this.projPos.y += this.direction.y * GLOBAL.deltaTime * 1;

    // projectile slows with time as air resistance in applied
    this.acceleration *= this.deceleration;

    // update based on direction and GLOBAL.deltaTime and air resistance
    this.projPos.x += this.direction.x * GLOBAL.deltaTime * this.acceleration;
    this.projPos.y += this.direction.y * GLOBAL.deltaTime * this.acceleration;

    // bounds detection
    // right
    if (this.projPos.x + this.radius / 2 > GLOBAL.windowWidth) {
      this.projCol.right = true;
    }

    // left
    if (this.projPos.x - this.radius / 2 < 0) {
      this.projCol.left = true;
    }

    // bottom
    if (this.projPos.y + this.radius / 2 > GLOBAL.windowHeight) {
      this.projCol.bottom = true;
    }

    // top
    if (this.projPos.y - this.radius / 2 < 0) {
      this.projCol.top = true;
    }
  }

  render() {
    // make projectile look round
    GLOBAL.ctx.beginPath();
    GLOBAL.ctx.arc(this.projPos.x, this.projPos.y, this.radius, 0, 2 * Math.PI);
    GLOBAL.ctx.fillStyle = '#000000';
    GLOBAL.ctx.fill();
    GLOBAL.ctx.closePath();

    if (GLOBAL.debug) {
      let bb = this.getBoundingBox();
      GLOBAL.ctx.translate(bb.x, bb.y);
      GLOBAL.ctx.strokeRect(0, 0, bb.w, bb.h);
      GLOBAL.ctx.resetTransform();
    }
  }

  // get bounding box values for projectiles
  getBoundingBox() {
    return {
      x: this.projPos.x - this.radius / 2,
      y: this.projPos.y - this.radius / 2,
      w: this.radius,
      h: this.radius,
    };
  }
}

export default Projectile;
