let starImage = document.getElementById("starImage");

const STAR_ROWS = 1;
const STAR_COLS = 13;

class Star extends GameObject {
    constructor(context, x, y, size, speed) {
        super(context, x, y, size, size, 0, speed);

        this.scoreValue = 5; 

        this.currentFrame = 0;
        this.animationTimer = 0;
        this.frameDuration = 0.1;

        // Đổi frame mỗi 100ms
        // this.intervalId = setInterval(() => {
        //     this.currentFrame++;

        //     if (this.currentFrame >= numRows * numCols) {
        //         this.currentFrame = 0;
        //     }
        // }, 100)
    }
    
    update(secondsPassed) {
        super.update(secondsPassed);

        this.animationTimer += secondsPassed;

        if (this.animationTimer >= this.frameDuration) {
            this.currentFrame++;
            this.animationTimer = 0;

            if (this.currentFrame > STAR_COLS * STAR_ROWS - 1) {
                this.currentFrame = 0;
            }
        }
    }

    draw() {
        let frameWidth = starImage.width / STAR_COLS;
        let frameHeight = starImage.height / STAR_ROWS;
        let colIndex = this.currentFrame % STAR_COLS;
        let rowIndex = Math.floor(this.currentFrame / STAR_COLS);

        this.context.drawImage(
            starImage,
            colIndex * frameWidth,
            rowIndex * frameHeight,
            frameWidth,
            frameHeight,
            this.x,
            this.y,
            this.width,
            this.height
        );
    }

    // isOffScreen(boardHeight) {
    //     if (this.y > boardHeight - this.height * 2) {
    //         return true;
    //     }
    //     return false;
    // }

    offScreen(boardHeight) {
        if (this.y > boardHeight - this.height * 2) {
            this.destroy();
        }
    }

    addScore(game) {
        game.score += this.scoreValue;
        game.tempPoint += this.scoreValue;
        this.destroy();
    }
}