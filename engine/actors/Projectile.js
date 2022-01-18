import GLOBAL from '../Globals.js';
import Actor from './Actor.js';

class Projectile extends Actor {
  constructor(x, y, width, height) {
    super(x, y, width, height);

    this.init();
  }

  init() {}

  update() {}

  render() {
    super.render();

    GLOBAL.ctx.fillStyle = 'blue';
    GLOBAL.ctx.rotate(GLOBAL.playerAngle);
    console.log('projectile angle: ', GLOBAL.playerAngle);
    GLOBAL.ctx.fillRect(this.x, this.y, this.width, this.height);

    // reset any remaining transform call
    GLOBAL.ctx.resetTransform();
  }
}

export default Projectile;
