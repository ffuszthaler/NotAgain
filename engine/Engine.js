import GLOBAL from './Globals.js';

class Engine {
  lastTickTimestamp;

  constructor(width, height) {
    GLOBAL.canvas = document.querySelector('canvas');
    GLOBAL.ctx = GLOBAL.canvas.getContext('2d');

    GLOBAL.windowWidth = width;
    GLOBAL.windowHeight = height;
  }

  init() {
    // size canvas accordingly
    GLOBAL.canvas.setAttribute('width', GLOBAL.windowWidth);
    GLOBAL.canvas.setAttribute('height', GLOBAL.windowHeight);
  }

  continue() {
    this.lastTickTimestamp = performance.now();
    this.loop();
  }

  loop() {
    GLOBAL.deltaTime = performance.now() - this.lastTickTimestamp;

    this.update();

    this.render();

    this.lastTickTimestamp = performance.now();

    requestAnimationFrame(() => {
      this.loop();
    });
  }

  update() {}

  render() {}
}

export default Engine;
