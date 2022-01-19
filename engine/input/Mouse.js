import GLOBAL from '../Globals.js';
import InputMethod from './Input.js';

class Mouse extends InputMethod {
  constructor() {
    super();

    this.mouseKeys = [];

    this.rotation;
  }

  init() {
    document.addEventListener('mousedown', (e) => {
      this.mouseKeys[e.button] = true;
    });

    document.addEventListener('mouseup', (e) => {
      this.mouseKeys[e.button] = false;
    });
  }

  // rotation() {
  //   GLOBAL.canvas.addEventListener('mousedown', (e) => {
  //     //  Calculate rotation angle
  //     let mouseX = e.offsetX;
  //     let mouseY = e.offsetY;
  //     let dx = mouseX - this.x;
  //     let dy = mouseY - this.y;

  //     //  Save rotation angle
  //     this.rotation = Math.atan2(dy, dx) + degToRad(90);

  //     console.log('mouse-rotation: ', this.rotation);
  //   });
  // }

  update() {}
}

export default Mouse;
