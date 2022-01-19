// Allows you to use the keys on your keyboard

import InputMethod from './Input.js';

class Keyboard extends InputMethod {
  constructor() {
    super();

    this.currentKeys = [];
  }

  init() {
    document.addEventListener('keydown', (e) => {
      this.currentKeys[e.code] = true;

      // prevents scrolling if one of these keys is pressed
      if (
        this.currentKeys['ArrowUp'] === true ||
        this.currentKeys['KeyW'] === true ||
        this.currentKeys['ArrowDown'] === true ||
        this.currentKeys['KeyS'] === true ||
        this.currentKeys['ArrowLeft'] === true ||
        this.currentKeys['KeyA'] === true ||
        this.currentKeys['ArrowRight'] === true ||
        this.currentKeys['KeyD'] === true
      ) {
        e.preventDefault();
      }
    });

    document.addEventListener('keyup', (e) => {
      this.currentKeys[e.code] = false;
    });
  }

  keyPressed(key, callback) {
    callback(this.currentKeys[key], this.currentKeys);
  }

  keyNotPressed(key, callback) {
    if (this.currentKeys[key] === false) {
      callback();
    } else {
      return false;
    }
  }

  update(deltaTime) {}
}

export default Keyboard;
