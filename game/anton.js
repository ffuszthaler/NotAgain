import GLOBAL from '../engine/Globals.js';
import { degToRad } from '../engine/utilities/Math.js';

const Anton = {
  update: function (deltaTime) {
    let dx = 0;
    let dy = 0;
    let velocity = 0.3;

    GLOBAL.keyboard.keyPressed('KeyW', () => {
      dy = -1;
    });

    GLOBAL.keyboard.keyPressed('KeyA', () => {
      dx = -1;
    });

    GLOBAL.keyboard.keyPressed('KeyS', () => {
      dy = 1;
    });

    GLOBAL.keyboard.keyPressed('KeyD', () => {
      dx = 1;
    });

    // speed boost
    GLOBAL.keyboard.keyPressed('Space', () => {
      // 1.5x of normal speed (0.3)
      velocity = 0.45;
    });

    // save last view direction - fucks with mouse rotation
    // if (dx != 0) GLOBAL.player.lastDirection = dx;

    // bounds detection
    // right
    if (GLOBAL.player.x + GLOBAL.player.width / 2 > GLOBAL.widowWidth)
      GLOBAL.player.x = GLOBAL.widowWidth - GLOBAL.player.width / 2;
    // left
    else if (GLOBAL.player.x - GLOBAL.player.width / 2 < 0) GLOBAL.player.x = 0 + GLOBAL.player.width / 2;

    // bottom
    if (GLOBAL.player.y + GLOBAL.player.height / 2 > GLOBAL.windowHeight)
      GLOBAL.player.y = GLOBAL.windowHeight - GLOBAL.player.height / 2;
    // top
    else if (GLOBAL.player.y - GLOBAL.player.height / 2 < 0) GLOBAL.player.y = 0 + GLOBAL.player.height / 2;

    // correct velocity for moving diagonally
    if (dx !== 0 && dy !== 0) {
      dx /= Math.hypot(dx, dy);
      dy /= Math.hypot(dx, dy);
    }

    // GLOBAL.player.state = dx === 0 && dy === 0 ? 'idle' : 'run';
    // sprite hack bc i dont have a running cycle rn
    GLOBAL.player.state = dx === 0 && dy === 0 ? 'anton' : 'anton';

    GLOBAL.player.x += deltaTime * dx * velocity;
    GLOBAL.player.y += deltaTime * dy * velocity;
  },

  render: function () {},
};

export default Anton;
