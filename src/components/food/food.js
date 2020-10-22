"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("../app/app"));
class Food {
    constructor() {
        this.pos = this.getRandomPosition();
    }
    getRandomPosition() {
        let newFoodPosition = null;
        while (newFoodPosition === null || app_1.default.feed(newFoodPosition)) {
            newFoodPosition = this.randomGridPosition();
        }
        return newFoodPosition;
    }
    randomGridPosition() {
        return {
            x: Math.floor(Math.random() * 21) + 1,
            y: Math.floor(Math.random() * 21) + 1
        };
    }
}
exports.default = Food;
