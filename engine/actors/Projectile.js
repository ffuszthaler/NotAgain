import GLOBAL from '../Globals.js';

import Actor from './Actor.js';
import { degToRad } from '../utilities/Math.js';

class Projectile extends Actor {
  constructor(x, y, width, height) {
    super(x, y, width, height);

    this.x = x;
    this.y = y;

    this.width;
    this.height;

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
      this.rotation = Math.atan2(dy, dx) + degToRad(90);

      // console.log('projectile rotation: ', this.rotation);
      console.log('GLOBAL rotation: ', this.rotation);
    });

    //  manually set transform values
    GLOBAL.ctx.setTransform(1, 0, 0, 1, this.x, this.y);

    // console.log('projectile.rotation: ', this.rotation);

    //  rotate projectile according to mouse position
    // GLOBAL.ctx.rotate(this.rotation);

    GLOBAL.ctx.fillStyle = 'blue';
    GLOBAL.ctx.fillRect(this.x, this.y, this.width, this.height);

    //  reset transform values back to normal
    GLOBAL.ctx.setTransform(1, 0, 0, 1, 0, 0);

    // reset any remaining transform call
    GLOBAL.ctx.resetTransform();
  }

  update() {}

  render() {
    super.render();

    // reset any remaining transform call
    // GLOBAL.ctx.resetTransform();
  }
}

export default Projectile;
