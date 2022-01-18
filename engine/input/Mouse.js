import GLOBAL from '../Globals.js';
import InputMethod from './Input.js';

class Mouse extends InputMethod {
  constructor() {
    super();

    this.mouseKeys = [];
  }

  init() {
    document.addEventListener('mousedown', (e) => {
      this.mouseKeys[e.button] = true;
    });

    document.addEventListener('mouseup', (e) => {
      this.mouseKeys[e.button] = false;
    });
  }

  update() {}
}

export default Mouse;
