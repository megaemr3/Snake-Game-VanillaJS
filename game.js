
const snake = {
src: document.querySelector(".snake"),
left: 100,
bottom: 100,
currentDirection: undefined,
trail: []
}

const game = {
    speed: 100,
    score: 0,
    board: document.querySelector(".score-board p"),
    bestScore: localStorage.getItem("bestScore"),
    bestBoard: document.querySelector(".score-board p:last-child")
}


document.addEventListener("keydown", specifyDirection);

game.bestBoard.innerHTML = game.bestScore ? game.bestScore : 0;

generateFood();

const timer = setInterval(startGame, game.speed);

function specifyDirection(event) {

if ((event.key == "ArrowUp" && snake.currentDirection != "ArrowDown") || 
(event.key == "ArrowDown" && snake.currentDirection != "ArrowUp") ||
(event.key == "ArrowLeft" && snake.currentDirection != "ArrowRight") ||
 (event.key == "ArrowRight" && snake.currentDirection != "ArrowLeft")) {

    snake.currentDirection = event.key;
}
}

function generateFood() {
    const food = document.createElement("div");
    food.classList.add("food");
    document.querySelector(".game-display").appendChild(food);

    let left = (Math.floor(Math.random() * 30) * 10);
    let bottom = (Math.floor(Math.random() * 50) * 10);

    food.style.left = `${left}px`;
    food.style.bottom = `${bottom}px`;

    const timer = setInterval(function() {
        if (snake.left == left && snake.bottom == bottom) {
            food.remove();
            clearInterval(timer);
            growSnake()
            increaseScore()
            generateFood()
        }
    }, game.speed)
}

function startGame() {
    
     drawTrail()

    switch(snake.currentDirection) {
        case "ArrowUp":

        snake.bottom += 10;
        snake.src.style.bottom = `${snake.bottom}px`;
        break;

        case "ArrowLeft":

        snake.left -= 10;
        snake.src.style.left = `${snake.left}px`;
        break;

        case "ArrowRight":

        snake.left += 10;
        snake.src.style.left = `${snake.left}px`;
        break;

        case "ArrowDown":

        snake.bottom -= 10;
        snake.src.style.bottom = `${snake.bottom}px`;
        break;
        default:
    }
   
   moveRestOfSnake()

  snake.trail.map((item, index) => {
    if (index > 0) {
        if (item.left === snake.left &&
            item.bottom === snake.bottom) {
                clearInterval(timer);
                enterBestScore()
            }
    }
  })
 
  
  if (snake.left < 0 || snake.left > 300) {
    let newValue = snake.left < 0 ? 300 : 0;
    snake.left = newValue;
  }
  if (snake.bottom < 0 || snake.bottom > 500) {
    let newValue = snake.bottom < 0 ? 500 : 0;
    snake.bottom = newValue;
  } 
}

function growSnake() {

let lengthOfTrail = snake.trail.length;
   
var snk = document.createElement("div");
snk.classList.add("rest-snake");
document.querySelector(".game-display").appendChild(snk);
snk.style.left = `${snake.trail[lengthOfTrail - 1].left}px`;
snk.style.bottom = `${snake.trail[lengthOfTrail - 1].bottom}px`;

  
} 

function drawTrail() {
    const restSnake = document.querySelectorAll(".rest-snake"); 
   
    snake.trail.unshift({bottom: snake.bottom, left: snake.left});
   
    for (let i = snake.trail.length - 1; i > restSnake.length; i--) {
        snake.trail.pop()
    }

}

function moveRestOfSnake() {
    const restSnake = document.querySelectorAll(".rest-snake"); 
    restSnake.forEach((item, index) => {

        item.style.left = `${snake.trail[index].left}px`;
        item.style.bottom = `${snake.trail[index].bottom}px`;
    })
}

function increaseScore() {
    game.score += 10;
    game.board.innerHTML = game.score;
}

function enterBestScore() {
    
    if (game.bestScore === null || game.bestScore < game.score ) {
        localStorage.setItem("bestScore", game.score);
       game.bestBoard.innerHTML = localStorage.getItem("bestScore");
    } 

}