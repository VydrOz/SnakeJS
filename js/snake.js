import controls from "./controls.js";

export default class Snake {
    rotate = {x: 0, y: 1};
    allowMove = true;
    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.tail = [{x:this.x, y:this.y}];
        this.head = this.tail.at(-1);
        this.controls = controls;
    }

    move(board) {
        const coordinates = this.getNextCoordinates();
        
        if (this.hasCollision(board, coordinates)) {
            return false;
        } 
        else {
            this.tail.shift();
            this.tail.push(coordinates);
            this.head = this.tail.at(-1);
    
            this.allowMove = true;
    
            return true;
        }
    }

    respawn(x, y) {
        this.x = x;
        this.y = y;
        this.tail = [{x:this.x, y:this.y}];
        this.head = this.tail.at(-1);
        this.rotate = {x: 0, y: 1};
        this.allowMove = true;
    }

    handleKey(key) {
        switch (key) {
            case controls.down :
                this.turnDown();
                break;
            case controls.up :
                this.turnUp();
                break;
            case controls.left :
                this.turnLeft();
                break;
            case controls.right :
                this.turnRight();
                break;
        }
    }

    eat(food) {
        return (food.x == this.head.x && food.y == this.head.y);
    }

    grow() {
        this.tail[this.tail.length] = this.getNextCoordinates();
        this.head = this.tail.at(-1);
    }

    turnLeft() {
        if (!this.allowMove || this.rotate.x === 1)
            return;

        this.rotate = {x: -1, y: 0};
        this.allowMove = false;
    }

    turnUp() {
        if (!this.allowMove || this.rotate.y === 1)
            return;

        this.rotate = {x: 0, y: -1};
        this.allowMove = false;
    }

    turnRight() {
        if (!this.allowMove || this.rotate.x === -1)
            return;

        this.rotate = {x: 1, y: 0};
        this.allowMove = false;
    }

    turnDown() {
        if (!this.allowMove || this.rotate.y === -1)
            return;

        this.rotate = {x: 0, y: 1};
        this.allowMove = false;
    }

    hasCollision(board, nextCoord) {
        return nextCoord.x < 0 || nextCoord.x > board.width - this.size ||
        nextCoord.y < 0 || nextCoord.y > board.height - this.size ||
            (this.tail.length > 1 && this.tail.some(t => t.x == nextCoord.x && t.y == nextCoord.y))
    }

    getNextCoordinates() {
        let newCoordinates = {
            x: this.head.x,
            y: this.head.y
        };
        if (this.rotate.x === 1) {
            newCoordinates.x += this.size;
        } else if (this.rotate.x === -1) {
            newCoordinates.x -= this.size;
        } else if (this.rotate.y === 1) {
            newCoordinates.y += this.size;
        } else if (this.rotate.y === -1) {
            newCoordinates.y -= this.size;
        }

        return newCoordinates;
    }
}