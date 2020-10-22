import Snake from '../snake/snake';
import Food from '../food/food';
import './app.css';

class Game {
    private gameBoard: HTMLDivElement;
    
    private lastTime: number;
    private moveCounter: number;
    private moveInterval: number;
    private lastDirectiond: {x: number, y: number}

    constructor() {
        this.gameBoard = document.querySelector('.board') as HTMLDivElement;
        
        this.moveCounter = 0;
        this.moveInterval = 700;
        this.lastTime = 0;
        this.lastDirectiond = {x: 0, y: 0}
        
        this.keyControls();
        this.update();
    }

    update(time = 0) {
        const deltaTime: number = time - this.lastTime;
        this.lastTime = time;
        this.moveCounter += deltaTime;
        if(this.moveCounter > this.moveInterval) {
            this.moveCounter = 0;

            for(let i = snake.pos.length - 2; i >= 0; i--) {
                snake.pos[i + 1] = {...snake.pos[i]}
            }

            if(this.feed()) {
                this.expandSnake();
                food.pos.x = 20;
                food.pos.y = 10;
            }
            
            snake.pos[0].x += this.lastDirectiond.x;
            snake.pos[0].y += this.lastDirectiond.y;

            
        }

        this.drawSnake(this.gameBoard);
        this.drawFood(this.gameBoard);
        window.requestAnimationFrame(this.update.bind(this));
    }

    feed() {
        return snake.pos.some(segment => {
            return segment.x === food.pos.x && segment.y === food.pos.y;
        });
    }

    expandSnake() {
        snake.pos.push({...snake.pos[snake.pos.length - 1]})
    }

    drawSnake(gameBoard: HTMLDivElement) {
        this.gameBoard.innerHTML = '';
        snake.pos.forEach(segment => {
            const snakeElement = document.createElement('div');
            snakeElement.style.gridRowStart = String(segment.y);
            snakeElement.style.gridColumnStart = String(segment.x);
            snakeElement.classList.add('snake');
            gameBoard.appendChild(snakeElement);
        })
    }

    drawFood(gameBoard: HTMLDivElement) {
        const foodElement = document.createElement('div');
        foodElement.style.gridRowStart = String(food.pos.y);
        foodElement.style.gridColumnStart = String(food.pos.x);
        foodElement.classList.add('food');
        gameBoard.appendChild(foodElement);
    }

    keyControls() {
        let lastKey: number | null = null;
        document.addEventListener('keydown', event => {
            if(event.keyCode === 65 && lastKey !== 68 && lastKey !== 65) {
                lastKey = 65; 
                this.lastDirectiond.x = -1;
                this.lastDirectiond.y = 0;
            }
            if(event.keyCode === 68 && lastKey !== 65 && lastKey !== 68) {
                lastKey = 68; 
                this.lastDirectiond.x = 1;
                this.lastDirectiond.y = 0;
            }
            if(event.keyCode === 83 && lastKey !== 87 && lastKey !== 83) {
                lastKey = 83; 
                this.lastDirectiond.x = 0;
                this.lastDirectiond.y = 1;
            }
            if(event.keyCode === 87 && lastKey !== 83 && lastKey !== 87) {
                lastKey = 87; 
                this.lastDirectiond.x = 0;
                this.lastDirectiond.y = -1;
            }
        })
    }
}

const snake = new Snake();
const food = new Food();
new Game();