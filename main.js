import './style.css'
import GameOfLife from './GameOfLife.js'

const game = new GameOfLife(80, 60);
game.randomizeGrid();
game.drawGrid();

document.getElementById('startButton').addEventListener('click', () => {
  game.start();
});

document.getElementById('stopButton').addEventListener('click', () => {
  game.stop();
});
