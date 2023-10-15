class MediaControlButton {

    constructor(image, x, y, size, onClick) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.image = image;
        this.onClick = onClick;
        this.isPressed = false;
    }

    draw() {
        if (this.isPressed) {
            drawingContext.shadowBlur = 70;
            drawingContext.shadowColor = color("DodgerBlue");
            drawingContext.shadowOffsetX = 0;
            drawingContext.shadowOffsetY = 0;
            image(this.image, this.x + 2, this.y + 2, this.size, this.size);
            drawingContext.shadowBlur = 0;
            return;
        }

        if (this.isHover()) {
            drawingContext.shadowBlur = 32;
            drawingContext.shadowOffsetX = 0;
            drawingContext.shadowOffsetY = 0;
            drawingContext.shadowColor = color("DeepSkyBlue");
            image(this.image, this.x, this.y, this.size, this.size);
            drawingContext.shadowBlur = 0;
            return;
        }

        drawingContext.shadowColor = color("DarkKhaki");
        drawingContext.shadowOffsetX = 5;
        drawingContext.shadowOffsetY = 5;
        drawingContext.shadowBlur = 0;
        image(this.image, this.x, this.y, this.size, this.size);
        drawingContext.shadowOffsetX = 0;
        drawingContext.shadowOffsetY = 0;
    }

    cursorShouldBeHand() {
        return this.mouseIsOnImage();
    }

    mousePressed() {
        if (this.mouseIsOnImage()) {
            this.isPressed = true;
            return false;
        } else {
            this.isPressed = false;
            return false;
        }
    }

    mouseReleased() {
        if (this.isPressed) {
            this.isPressed = false;
            this.onClick()
        }
    }

    isHover() {
        if (this.mouseIsOnImage() && !mouseIsPressed) {
            return true;
        } else {
            return false;
        }
    }

    mouseIsOnImage() {
        let imageX = map(mouseX - this.x, 0, this.size, 0, this.image.width);
        let imageY = map(mouseY - this.y, 0, this.size, 0, this.image.height);

        return mouseX > this.x && mouseX < this.x + this.image.width
            && mouseY > this.y && mouseY < this.y + this.image.height
            && this.image.get(imageX, imageY)[3] != 0
    }
}