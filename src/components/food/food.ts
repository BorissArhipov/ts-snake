import Game from '../app/app';

class Food {
    public pos: {x: number, y: number};

    constructor() {
        this.pos = this.getRandomPosition();
    }

    getRandomPosition() {
        let newFoodPosition: {x: number, y: number} | null = null;
        while(newFoodPosition === null || Game.feed(newFoodPosition)) {
            newFoodPosition = this.randomGridPosition();
        }
        return newFoodPosition;
    }

    randomGridPosition() {
        return {
            x: Math.floor(Math.random() * 21) + 1,
            y: Math.floor(Math.random() * 21) + 1
        }
    }
}

export default Food;