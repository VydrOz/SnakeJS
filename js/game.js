// Import
import Snake from "./snake.js"
import Item from "./item.js"
import Sfx from "./sfx.js"
import controls from "./controls.js";

// init board
let board = document.getElementById('board');
let boardContext = board.getContext('2d', { alpha: false });
let css = getComputedStyle(document.documentElement);

// game states
const gameState = {
	START: 0,
    PLAYING: 1,
	PAUSED: 2,
	GAME_OVER: 3,
}

// audio files
const sfxItemPickup = new Sfx('./sounds/sfx_coin_double7.wav', 0.1);
const sfxDamageHit = new Sfx('./sounds/sfx_damage_hit2.wav', 0.1);

// init game variables
let state;
let score;
let snake = new Snake(10, 10, 10);
let item = new Item(board.width, board.height, 10);

window.addEventListener('load', () => {
    start();
    setInterval(loop, 1000/21);
})

function start() {
    state = gameState.START;
    snake.respawn(10, 10);
    item.respawn(snake.tail);
    score = 0;
    showScore();
}

function loop() {
    draw();
    switch (state) {
        case gameState.PLAYING:
            return update();
        case gameState.PAUSED:
            return showGameState('PAUSE');    
        case gameState.GAME_OVER:
            return showGameState('GAME OVER');
        case gameState.START:
            return showGameState('START');
      }
}

function showGameState(msg) {
    boardContext.textAlign = 'center';
    boardContext.fillStyle = css.getPropertyValue('--board-color-state-info');
    boardContext.font = '50px Rubik Mono One, sans-serif';
    boardContext.fillText(msg, board.width / 2, board.height / 2);
}

function showScore() {
    boardContext.textAlign = 'center';
    boardContext.fillStyle = css.getPropertyValue('--score-color-font');
    boardContext.font = '200px Rubik Mono One, sans-serif';
    boardContext.fillText(score.toString().padStart(3, '0'), board.width / 2, board.height / 1.7);
}

function update() {
    let successMove = snake.move(board);
    
    if (snake.pickup(item)) {
        score++;
        snake.grow();
        item.respawn(snake.tail);
        sfxItemPickup.play();
    }
    else if (!successMove) {
        sfxDamageHit.play();
        state = gameState.GAME_OVER;
    }
}

function draw() {
    // background
    rectFill(0, 0, board.width, board.height, css.getPropertyValue('--global-color-sub'));
    // score
    showScore();
    // snake
    snake.tail.forEach((e, i) => {
        rectFill(
            e.x , e.y , snake.size, snake.size,
            state == gameState.GAME_OVER ? css.getPropertyValue('--snake-color-dead') : css.getPropertyValue('--snake-color-alive')
        );
    });
    rectFill(item.x, item.y, item.size, item.size, css.getPropertyValue('--item-color'));
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