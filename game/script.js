import notAgain from './notAgain.js';

// initialize game on page load
let game = new notAgain();
window.onload = () => {
  game.init();
};
