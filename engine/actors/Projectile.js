import GLOBAL from '../Globals.js';

import Actor from './Actor.js';
import { degToRad } from '../utilities/Math.js';

class Projectile extends Actor {
  constructor(x, y, width, height) {
    super(x, y, width, height);

    // this.x = x;
    // this.y = y;

    // projectile position vector
    this.projPos = {
      x: x,
      y: y,
    };

    // size of projectile
    this.width = width;
    this.height = height;

    // velocity
    this.rotVel = {
      x: 0,
      y: 0,
    };

    // mouse cursor position
    this.mousePos = {
      x,
      y,
    };

    this.dx;
    this.dy;

    this.rotation;

    this.init();
  }

  init() {
    GLOBAL.canvas.addEventListener('mousedown', (e) => {
      //  calculate rotation angle
      this.mousePos.x = e.offsetX;
      this.mousePos.y = e.offsetY;

      // let mouseX = e.clientX;
      // let mouseY = e.clientY;

      // distance between mouse and projectile
      this.dx = this.mousePos.x - this.projPos.x;
      this.dy = this.mousePos.y - this.projPos.y;

      //  save rotation angle
      // this.rotation = Math.atan2(dy, dx) + degToRad(90);
      this.rotation = Math.atan2(this.dy, this.dx);

      // console.log('projectile rotation: ', this.rotation);
      console.log('GLOBAL rotation: ', this.rotation);

      // Theta
      this.opp = Math.floor(GLOBAL.canvas.height - e.clientY);
      this.adj = Math.floor(e.clientX);
      this.hyp = Math.floor(Math.sqrt(this.mousePos.x * this.mousePos.y + this.adj * this.adj));

      console.log('theta-degrees: ', this.thetaDegrees);
    });

    // this.rotVel.x = this.projPos.x * Math.cos(this.rotation) - this.projPos.y * Math.sin(this.rotation);
    // this.rotVel.y = this.projPos.x * Math.sin(this.rotation) + this.projPos.y * Math.cos(this.rotation);
    // console.log('rot vel ', this.rotVel);

    //  manually set transform values
    // GLOBAL.ctx.setTransform(1, 0, 0, 1, this.x, this.y);

    // console.log('projectile.rotation: ', this.rotation);

    //  rotate projectile according to mouse position
    // GLOBAL.ctx.rotate(this.rotation);

    // GLOBAL.ctx.fillStyle = 'blue';
    // GLOBAL.ctx.fillRect(this.x, this.y, this.width, this.height);

    //  reset transform values back to normal
    // GLOBAL.ctx.setTransform(1, 0, 0, 1, 0, 0);

    // reset any remaining transform call
    // GLOBAL.ctx.resetTransform();
  }

  update() {
    // mouse position vector - projectile starting point vector
    // this.projPos.x += 2;
    // this.projPos.y += 2;

    this.projPos.x += this.mousePos.x - this.projPos.x;
    this.projPos.y += this.mousePos.y - this.projPos.y;

    // console.log(this.projPos);
  }

  render() {
    // super.render();

    //  manually set transform values
    // GLOBAL.ctx.setTransform(1, 0, 0, 1, this.x, this.y);

    // NOTE: make projectile round
    GLOBAL.ctx.beginPath();
    GLOBAL.ctx.arc(this.projPos.x, this.projPos.y, 4, 0, 2 * Math.PI);
    GLOBAL.ctx.fillStyle = '#000000';
    GLOBAL.ctx.fill();
    GLOBAL.ctx.closePath();

    // GLOBAL.ctx.fillRect(this.x, this.y, this.height, this.height);
    // GLOBAL.ctx.rotate(this.rotation);

    //  reset transform values back to normal
    // GLOBAL.ctx.setTransform(1, 0, 0, 1, 0, 0);

    // reset any remaining transform call
    // GLOBAL.ctx.resetTransform();
  }
}

export default Projectile;
