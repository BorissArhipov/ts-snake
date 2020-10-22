"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const snake_1 = __importDefault(require("../snake/snake"));
const food_1 = __importDefault(require("../food/food"));
require("./app.css");
class Game {
    constructor() {
        this.gameBoard = document.querySelector('.board');
        this.select = document.querySelector('.select');
        this.scoreDiv = document.querySelector('.score');
        this.gameOver = document.querySelector('.game-over');
        this.moveCounter = 0;
        this.moveInterval = 700;
        this.score = 0;
        this.lastTime = 0;
        this.lastDirectiond = { x: 0, y: 0 };
        this.lastKey = null;
        this.scoreDiv.textContent = String(this.score);
        this.gameOver.style.display = 'none';
        this.update();
        this.keyControls();
    }
    update(time = 0) {
        this.moveInterval = this.setmMoveInterval();
        const deltaTime = time - this.lastTime;
        this.lastTime = time;
        this.moveCounter += deltaTime;
        if (this.moveCounter > this.moveInterval) {
            this.moveCounter = 0;
            for (let i = snake.pos.length - 2; i >= 0; i--) {
                snake.pos[i + 1] = Object.assign({}, snake.pos[i]);
            }
            if (Game.feed(food.pos)) {
                this.expandSnake();
                food.pos = food.getRandomPosition();
                this.score += 10;
                this.scoreDiv.textContent = String(this.score);
            }
            snake.pos[0].x += this.lastDirectiond.x;
            snake.pos[0].y += this.lastDirectiond.y;
        }
        this.drawSnake(this.gameBoard);
        this.drawFood(this.gameBoard);
        this.checkDeath();
        window.requestAnimationFrame(this.update.bind(this));
    }
    checkDeath() {
        if (this.outsideGrid(snake.pos[0]) || this.snakeIntersection()) {
            this.lastDirectiond = { x: 0, y: 0 };
            snake.pos = [{ x: 11, y: 11 }];
            this.moveCounter = 0;
            food.pos = food.getRandomPosition();
            this.lastKey = null;
            this.score = 0;
            this.scoreDiv.textContent = String(this.score);
            this.gameOver.style.display = 'flex';
            this.select.disabled = false;
        }
    }
    outsideGrid(snakeHead) {
        return (snakeHead.x < 1 || snakeHead.x > 21 ||
            snakeHead.y < 1 || snakeHead.y > 21);
    }
    snakeIntersection() {
        return Game.feed(snake.pos[0], true);
    }
    setmMoveInterval() {
        switch (this.select.value) {
            case 'easy':
                return 700;
            case 'medium':
                return 400;
            case 'hard':
                return 100;
            default:
                return 700;
        }
    }
    static feed(foodPos, headIgnore = false) {
        return snake.pos.some((segment, index) => {
            if (headIgnore && index === 0)
                return false;
            return segment.x === foodPos.x && segment.y === foodPos.y;
        });
    }
    expandSnake() {
        snake.pos.push(Object.assign({}, snake.pos[snake.pos.length - 1]));
    }
    drawSnake(gameBoard) {
        this.gameBoard.innerHTML = '';
        snake.pos.forEach(segment => {
            const snakeElement = document.createElement('div');
            snakeElement.style.gridRowStart = String(segment.y);
            snakeElement.style.gridColumnStart = String(segment.x);
            snakeElement.classList.add('snake');
            gameBoard.appendChild(snakeElement);
        });
    }
    drawFood(gameBoard) {
        const foodElement = document.createElement('div');
        foodElement.style.gridRowStart = String(food.pos.y);
        foodElement.style.gridColumnStart = String(food.pos.x);
        foodElement.classList.add('food');
        gameBoard.appendChild(foodElement);
    }
    keyControls() {
        document.addEventListener('keydown', event => {
            if (event.keyCode === 65 && this.lastKey !== 68 && this.lastKey !== 65) {
                this.lastKey = 65;
                this.lastDirectiond.x = -1;
                this.lastDirectiond.y = 0;
                this.gameOver.style.display = 'none';
                this.select.disabled = true;
            }
            if (event.keyCode === 68 && this.lastKey !== 65 && this.lastKey !== 68) {
                this.lastKey = 68;
                this.lastDirectiond.x = 1;
                this.lastDirectiond.y = 0;
                this.gameOver.style.display = 'none';
                this.select.disabled = true;
            }
            if (event.keyCode === 83 && this.lastKey !== 87 && this.lastKey !== 83) {
                this.lastKey = 83;
                this.lastDirectiond.x = 0;
                this.lastDirectiond.y = 1;
                this.gameOver.style.display = 'none';
                this.select.disabled = true;
            }
            if (event.keyCode === 87 && this.lastKey !== 83 && this.lastKey !== 87) {
                this.lastKey = 87;
                this.lastDirectiond.x = 0;
                this.lastDirectiond.y = -1;
                this.gameOver.style.display = 'none';
                this.select.disabled = true;
            }
        });
    }
}
exports.default = Game;
const snake = new snake_1.default();
const food = new food_1.default();
new Game();
