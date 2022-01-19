import GLOBAL from '../Globals.js';

import Actor from './Actor.js';
import { degToRad } from '../utilities/Math.js';

class Projectile extends Actor {
  constructor(x, y, width, height) {
    super(x, y, width, height);

    this.x = x;
    this.y = y;

    this.width = width;
    this.height = height;

    this.rotation;

    this.init();
  }

  init() {
    GLOBAL.canvas.addEventListener('mousedown', (e) => {
      //  Calculate rotation angle
      let mouseX = e.offsetX;
      let mouseY = e.offsetY;
      let dx = mouseX - this.x;
      let dy = mouseY - this.y;

      //  Save rotation angle
      // this.rotation = Math.atan2(dy, dx) + degToRad(90);
      this.rotation = Math.atan2(dy, dx);

      // console.log('projectile rotation: ', this.rotation);
      console.log('GLOBAL rotation: ', this.rotation);
    });

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
    this.x = this.x + 2;
    // this.y = this.y + 1;
  }

  render() {
    // super.render();

    //  manually set transform values
    // GLOBAL.ctx.setTransform(1, 0, 0, 1, this.x, this.y);

    // NOTE: make projectile round
    GLOBAL.ctx.beginPath();
    GLOBAL.ctx.arc(this.x, this.y, 4, 0, 2 * Math.PI);
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
