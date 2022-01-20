import GLOBAL from '../Globals.js';

import Actor from './Actor.js';

class Projectile extends Actor {
  constructor(x, y, mouseX, mouseY, radius) {
    super(x, y);

    this.projPos = {
      x: x,
      y: y,
    };

    // size of projectile
    // this.width = width;
    // this.height = height;

    this.radius = radius;

    // velocity
    this.velocity = {
      x: 0,
      y: 0,
    };

    // mouse cursor position
    this.mousePos = {
      x: mouseX,
      y: mouseY,
    };

    this.dx;
    this.dy;

    this.rotation;

    this.init();
  }

  init() {
    // distance between mouse and projectile
    this.dx = this.mousePos.x - this.projPos.x;
    this.dy = this.mousePos.y - this.projPos.y;

    //  save rotation angle
    this.rotation = Math.atan2(this.dy, this.dx);

    // direction vector
    this.direction = {
      x: this.mousePos.x - this.projPos.x,
      y: this.mousePos.y - this.projPos.y,
    };

    let dist = Math.sqrt(this.direction.x ** 2 + this.direction.y ** 2);

    this.direction.x = this.direction.x / dist;
    this.direction.y = this.direction.y / dist;

    this.projPos.x += this.direction.x * 40;
    this.projPos.y += this.direction.y * 40;
  }

  update() {
    this.projPos.x += this.direction.x * GLOBAL.deltaTime * 1;
    this.projPos.y += this.direction.y * GLOBAL.deltaTime * 1;
  }

  render() {
    // make projectile look round
    GLOBAL.ctx.beginPath();
    GLOBAL.ctx.arc(this.projPos.x, this.projPos.y, this.radius, 0, 2 * Math.PI);
    GLOBAL.ctx.fillStyle = '#000000';
    GLOBAL.ctx.fill();
    GLOBAL.ctx.closePath();
  }
}

export default Projectile;
