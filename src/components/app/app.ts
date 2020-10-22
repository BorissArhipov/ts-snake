import Snake from '../snake/snake';
import './app.css';

class Game {
    private gameBoard: HTMLDivElement;
    
    private lastTime: number;
    private moveCounter: number;
    private moveInterval: number;

    constructor() {
        this.gameBoard = document.querySelector('.board') as HTMLDivElement;
        
        this.moveCounter = 0;
        this.moveInterval = 1000;
        this.lastTime = 0;
        
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

        }

        this.draw(this.gameBoard);
        window.requestAnimationFrame(this.update.bind(this));
    }

    draw(gameBoard: HTMLDivElement) {
        this.gameBoard.innerHTML = '';
        snake.pos.forEach(segment => {
            const snakeElement = document.createElement('div');
            snakeElement.style.gridRowStart = String(segment.y);
            snakeElement.style.gridColumnStart = String(segment.x);
            snakeElement.classList.add('snake');
            gameBoard.appendChild(snakeElement);
        })
    }

    keyControls() {
        let lastKey: number | null = null;
        document.addEventListener('keydown', event => {
            if(event.keyCode === 65 && lastKey !== 68) {
                snake.pos[0].x += -1;
                snake.pos[0].y += 0;
                lastKey = 65; 
            }
            if(event.keyCode === 68 && lastKey !== 65) {
                snake.pos[0].x += 1;
                snake.pos[0].y += 0;
                lastKey = 68; 
            }
            if(event.keyCode === 83 && lastKey !== 87) {
                snake.pos[0].x += 0;
                snake.pos[0].y += 1;
                lastKey = 83; 
            }
            if(event.keyCode === 87 && lastKey !== 83) {
                snake.pos[0].x += 0;
                snake.pos[0].y += -1;
                lastKey = 87; 
            }
        })
    }
}

const snake = new Snake();
new Game();