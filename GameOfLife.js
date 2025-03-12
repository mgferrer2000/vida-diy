class GameOfLife {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.grid = Array.from({ length: height }, () =>
      Array(width).fill(false)
    );
    this.ctx = document.getElementById('gameCanvas').getContext('2d');
    this.cellSize = 10;
    this.intervalId = null;
  }

  randomizeGrid() {
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        this.grid[y][x] = Math.random() > 0.5;
      }
    }
  }

  drawGrid() {
    this.ctx.clearRect(0, 0, this.width * this.cellSize, this.height * this.cellSize);
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        if (this.grid[y][x]) {
          this.ctx.fillStyle = 'black';
          this.ctx.fillRect(x * this.cellSize, y * this.cellSize, this.cellSize, this.cellSize);
        }
      }
    }
  }

  countNeighbors(x, y) {
    let count = 0;
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (i === 0 && j === 0) continue;
        const newX = (x + i + this.width) % this.width;
        const newY = (y + j + this.height) % this.height;
        count += this.grid[newY][newX] ? 1 : 0;
      }
    }
    return count;
  }

  updateGrid() {
    const newGrid = Array.from({ length: this.height }, () =>
      Array(this.width).fill(false)
    );
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const neighbors = this.countNeighbors(x, y);
        if (this.grid[y][x]) {
          newGrid[y][x] = neighbors === 2 || neighbors === 3;
        } else {
          newGrid[y][x] = neighbors === 3;
        }
      }
    }
    this.grid = newGrid;
  }

  start() {
    this.intervalId = setInterval(() => {
      this.updateGrid();
      this.drawGrid();
    }, 100);
  }

  stop() {
    clearInterval(this.intervalId);
  }
}

export default GameOfLife;
