const blockSize = 20;
const cols = 25;
const rows = 20;
let board, ctx;
let scoreDisplay = document.getElementById("score"), score = 0
let snakeHeadX, snakeHeadY, snakeBody = [];
let foodX, foodY;
let directionX = 0, directionY = 0;
let gameActive = true;

window.onload = function() {
    board = document.getElementById("gameBoard");
    board.width = cols * blockSize;
    board.height = rows * blockSize;
    board.style.border = "10px solid";
    ctx = board.getContext("2d");

    placeFood();
    placeSnakeHead();
    document.addEventListener("keydown", changeDirection);
    setInterval(updateCanva, 100);
}

function placeSnakeHead() {
    snakeHeadX = Math.floor(Math.random() * cols) * blockSize;
    snakeHeadY = Math.floor(Math.random() * rows) * blockSize;
}

function placeFood() {
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
}

function drawFood() {
    ctx.fillStyle = "#FF0000";
    ctx.fillRect(foodX, foodY, blockSize, blockSize);
}

function fillBoard() {
    ctx.fillStyle="grey";
    ctx.fillRect(0, 0, board.width, board.height);
}

function updateCanva() {
    if(!gameActive) {
        ctx.font = "bold 70px verdana, sans-serif ";
        ctx.fillStyle = "#ff0000";
        ctx.fillText("GAME OVER", 15, 200);
        return;
    }

    gameEnd();

    fillBoard();

    drawFood();

    scoreDisplay.innerHTML = "Score: " + score;

    UpdateSnake();
}

function UpdateSnake() {
    if(snakeHeadX == foodX && snakeHeadY == foodY) {
        snakeBody.push([foodX, foodY]);
        placeFood();
        score += 1;
    }

    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }
    
    if(snakeBody.length) {
        snakeBody[0] = [snakeHeadX, snakeHeadY];
    }
    
    snakeHeadX += directionX * blockSize;
    snakeHeadY += directionY * blockSize;
    ctx.fillStyle = "#18E16F";
    ctx.fillRect(snakeHeadX, snakeHeadY, blockSize, blockSize);
    for (let i = 0; i < snakeBody.length; i++) {
        ctx.fillStyle = "#19FE7C";
        ctx.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }
}


function gameEnd() {
    if(snakeHeadX < 0 || snakeHeadX >= (cols * blockSize) || snakeHeadY < 0 || snakeHeadY >= (rows * blockSize)) {
        gameActive = false;
    }

    for (let i = 0; i < snakeBody.length; i++) {
        if(snakeHeadX == snakeBody[i][0] && snakeHeadY == snakeBody[i][1]) {
            gameActive = false;
        }
    }
}


function changeDirection(e) {
    if(e.code == "ArrowUp" && directionY != -1) {
        directionX = 0;
        directionY = -1;
    }
    else if(e.code == "ArrowDown" && directionY != -1) {
        directionX = 0;
        directionY = 1;
    }
    else if(e.code == "ArrowLeft" && directionX != 1) {
        directionX = -1;
        directionY = 0;
    }
    else if(e.code == "ArrowRight" && directionX != -1) {
        directionX = 1;
        directionY = 0;
    }
}