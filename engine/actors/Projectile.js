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

    this.init();
  }

  init() {
    GLOBAL.ctx.fillStyle = 'blue';
    // calculate angle for rotation and rotate sprite
    // GLOBAL.projectileAngle = Math.atan2(GLOBAL.mouse.y - this.y, GLOBAL.mouse.x - this.x) + degToRad(90);
    this.projectileAngle = GLOBAL.playerAngle;
    // console.log('projectile angle: ', this.projectileAngle);
    GLOBAL.ctx.fillRect(this.x, this.y, this.width, this.height);
    GLOBAL.ctx.rotate(this.projectileAngle);
  }

  update() {}

  render() {
    super.render();

    // reset any remaining transform call
    GLOBAL.ctx.resetTransform();
  }
}

export default Projectile;
