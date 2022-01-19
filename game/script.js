import notAgain from './notAgain.js';

// initialize game on page load
let game = new notAgain(1280, 720);
window.onload = () => {
  game.init();
};
