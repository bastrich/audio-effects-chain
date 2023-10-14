class MediaControlButton {

    constructor(image, x, y, onClick) {
        this.x = x;
        this.y = y;
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
            image(this.image, this.x + 2, this.y + 2);
            return;
        }

        if (this.isHover()) {
            drawingContext.shadowBlur = 32;
            drawingContext.shadowOffsetX = 0;
            drawingContext.shadowOffsetY = 0;
            drawingContext.shadowColor = color("DeepSkyBlue");
            image(this.image, this.x, this.y);
            return;
        }

        drawingContext.shadowColor = color("DarkKhaki");
        drawingContext.shadowOffsetX = 5;
        drawingContext.shadowOffsetY = 5;
        drawingContext.shadowBlur = 0;
        image(this.image, this.x, this.y);
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
        return mouseX > this.x && mouseX < this.x + this.image.width
            && mouseY > this.y && mouseY < this.y + this.image.height
            && this.image.get(mouseX - this.x, mouseY - this.y)[3] != 0
    }
}