import GLOBAL from '../engine/Globals.js';
import notAgain from './notAgain.js';

let startButton = document.getElementById('startButton');

// initialize game once on button click
let game = new notAgain(1280, 720);
startButton.addEventListener('click', () => {
  if (!GLOBAL.gameStarted) {
    GLOBAL.gameStarted = true;

    document.querySelector('canvas').style.display = 'flex';
    document.getElementById('logo').style.display = 'none';
    document.getElementById('startButton').style.display = 'none';

    document.getElementById('endText').style.display = 'none';
    document.getElementById('endPoints').style.display = 'none';
    document.getElementById('endIteration').style.display = 'none';

    game.init();
  }
});
