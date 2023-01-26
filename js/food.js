export default class Food {
    constructor(width, height, size) {
        this.size = size;
        this.w = width;
        this.h = height;
    }

    respawn(snakeTail) {
        let nextCoord = this.getNextRandomCoordonates();

        while (snakeTail.find(v => v.x === nextCoord.x && v.y === nextCoord.y)) {
            nextCoord = this.getNextRandomCoordonates();
        }

        this.x = nextCoord.x;
        this.y = nextCoord.y;
    }

    getNextRandomCoordonates() {
        return {
            x: Math.floor(Math.random() * this.w / this.size) * this.size,
            y: Math.floor(Math.random() * this.h / this.size) * this.size    
        }
    }
}