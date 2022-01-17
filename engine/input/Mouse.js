import InputMethod from './Input.js';

class Mouse extends InputMethod {
  constructor() {
    super();
  }

  init() {
    document.addEventListener('mousemove', (e) => {
      // console.log('X:', e.clientX);
      // console.log('Y:', e.clientY);
    });
  }

  update() {}
}

export default Mouse;
