// Import
import Snake from "./snake.js"
import Food from "./food.js"
import controls from "./controls.js";

// init board
let board = document.getElementById('board');
let boardContext = board.getContext('2d', { alpha: false });
let scoreDisplay = document.getElementById('score');
let css = getComputedStyle(document.documentElement);

// game states
const gameState = {
	START: 0,
    PLAYING: 1,
	PAUSED: 2,
	GAME_OVER: 3,
}

// init variable
let 
    state, score,
    snake = new Snake(10, 10, 10),
    food = new Food(board.width, board.height, 10);


window.onload = () => {
    start();
    setInterval(loop, 1000/20);
}

function start() {
    state = gameState.START;
    snake.respawn(10, 10);
    food.respawn(snake.tail);
    score = 0;
}

function loop() {
    draw();

    switch (state) {
        case gameState.PLAYING:
            return update();
        case gameState.PAUSED:
            return boardStateMsg('Pause', 'Press "' + controls.pause + '" to continue');    
        case gameState.GAME_OVER:
            return boardStateMsg('Game Over', 'Press "' + controls.retry + '" to play again');
        case gameState.START:
            return boardStateMsg('Snake JS', 'Press "' + controls.start + '" to start');
      }
}

function boardStateMsg(msg, subMsg) {
    boardContext.textAlign = 'center';
    boardContext.fillStyle = 'white';
    boardContext.font = '32px Paytone One, sans-serif';
    boardContext.fillText(msg, board.width / 2, board.height / 2.4);
    boardContext.font = '20px Paytone One, sans-serif';
    boardContext.fillText(subMsg, board.width / 2, board.height / 1.85);
}

function update() {
    let successMove = snake.move(board);
    if (snake.eat(food)) {
        score++;
        snake.grow();
        food.respawn(snake.tail);
    }
    else if (!successMove) {
        state = gameState.GAME_OVER;
    }
}

function draw() {
    rectFill(0, 0, board.width, board.height, css.getPropertyValue('--color-3'));
    snake.tail.forEach((e, i) => {
        let isHead = i == snake.tail.length - 1;
        rectFill(
            e.x + 0.75, e.y + 0.75, snake.size - 2.5, snake.size - 2.5,
            state == gameState.GAME_OVER ? (isHead ? 'darkred' : 'red') : (isHead ? css.getPropertyValue('--color-2') : css.getPropertyValue('--color-2'))
        );
    });
    rectFill(food.x, food.y, food.size, food.size, 'yellow');
    scoreDisplay.textContent = score;
}

function rectFill(x, y, width, height, color) {
    boardContext.fillStyle = color;
    boardContext.fillRect(x, y, width, height);
}

window.addEventListener('keydown', (e) => {
    if (e.key === controls.retry && state === gameState.GAME_OVER) {
        start();
    }
    else if (e.key === controls.start && state === gameState.START) {
        state = state == gameState.PLAYING ? gameState.PAUSED : gameState.PLAYING;
    }
    else if (e.key === controls.pause && (state === gameState.PAUSED || state === gameState.PLAYING)) {
        state = state == gameState.PLAYING ? gameState.PAUSED : gameState.PLAYING;
    }
    else if (state === gameState.PLAYING){
        snake.handleKey(e.key);
    }
});