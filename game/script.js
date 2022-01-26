import notAgain from './notAgain.js';

let startButton = document.getElementById('startButton');
let gameStarted = false;

// initialize game on page load
// window.onload = () => {
//   game.init();
// };

// initialize game once on button click
let game = new notAgain(1280, 720);
startButton.addEventListener('click', () => {
  if (!gameStarted) {
    gameStarted = true;

    document.querySelector('canvas').style.display = 'flex';
    document.getElementById('logo').style.display = 'none';
    document.getElementById('startButton').style.display = 'none';

    game.init();
  }
});
