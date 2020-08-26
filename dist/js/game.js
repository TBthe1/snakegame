import { update as updateSnake, draw as drawSnake, SNAKE_SPEED, getSnakeHead, snakeIntersection, foodScore } from '/dist/js/snake.js';
import { update as updateFood, draw as drawFood } from '/dist/js/food.js';
import { outsideGrid } from '/dist/js/grid.js'


let lastRenderTime = 0;
let gameOver = false
const gameBoard = document.getElementById('game-board')

function main(currentTime) {
  if (gameOver) {
    if (confirm('You lost.\nYour score is: ' + foodScore + '\nPress ok to restart!')) {
      window.location = '/dist/index.html'
    }
    return
  }



  window.requestAnimationFrame(main);
  const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
  if (secondsSinceLastRender < 1 / SNAKE_SPEED) return;

  lastRenderTime = currentTime;

  update()
  draw()
}

window.requestAnimationFrame(main);

function update() {
  updateSnake()
  updateFood()
  checkDeath()
}

function draw() {
  gameBoard.innerHTML = ''
  drawSnake(gameBoard)
  drawFood(gameBoard)
}

function checkDeath() {
  gameOver = outsideGrid(getSnakeHead()) || snakeIntersection()
}