let healingImage = document.getElementById("healingImage");

const HEALING_COLS = 5;
const HEALING_ROWS = 2;

class HealingObj extends GameObject {
    constructor(context, x, y, size, speed) {
        super(context, x, y, size, size, 0, speed);
        this.currentFrame = 0;
        this.animationTimer = 0;
        this.frameDuration = 0.1;
    }

    update(secondsPassed) {
        super.update(secondsPassed);

        this.animationTimer += secondsPassed;

        if (this.animationTimer >= this.frameDuration) {
            this.currentFrame++;
            this.animationTimer = 0;

            if (this.currentFrame > HEALING_COLS * HEALING_ROWS - 1) {
                this.currentFrame = 0;
            }
        }


    }

    draw() {
        let frameWidth = healingImage.width / HEALING_COLS;
        let frameHeight = healingImage.height / HEALING_ROWS;
        let colIndex = this.currentFrame % HEALING_COLS;
        let rowIndex = Math.floor(this.currentFrame / HEALING_COLS);

        this.context.drawImage(
            healingImage,
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

    onCatch(game) {
        game.lives++;
        if (game.lives > MAX_LIVES) {
            game.lives = MAX_LIVES;
        }

        this.destroy();
    }

}