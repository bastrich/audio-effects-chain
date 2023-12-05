class MediaControlButton {

    constructor(image, x, y, size, onClick) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.image = image;
        this.onClick = onClick;
        this.isPressed = false;
        this.disabled = false;
        this.active = false;
    }

    setup() {
        this.disabledImage = createImage(this.image.width, this.image.height);
        this.disabledImage.copy(this.image, 0, 0, this.image.width, this.image.height, 0, 0, this.image.width, this.image.height);

        this.disabledImage.loadPixels()
        for (let i = 0; i < this.disabledImage.pixels.length; i++) {
            this.disabledImage.pixels[i] = this.image.pixels[i] * 0.4;
        }
        this.disabledImage.updatePixels()
    }

    draw() {
        if (this.active) {
            ellipseMode(CORNER)
            drawingContext.shadowBlur = 10;
            drawingContext.shadowColor = color(60, 179, 113);
            fill(color(60, 179, 113, 50 + 0.5* (1 + sin(frameCount / 3)) * 100))
            ellipse(this.x - 3, this.y - 3, this.size + 6)
        }

        if (this.disabled) {
            image(this.disabledImage, this.x, this.y, this.size, this.size);
            return;
        }

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

    disable() {
        this.disabled = true;
    }

    enable() {
        this.disabled = false;
    }

    activate() {
        this.active = true;
    }

    deactivate() {
        this.active = false;
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
        return !!(this.mouseIsOnImage() && !this.isPressed);
    }

    mouseIsOnImage() {
        let imageX = map(mouseX - this.x, 0, this.size, 0, this.image.width);
        let imageY = map(mouseY - this.y, 0, this.size, 0, this.image.height);
        let pixelAlphaIndex = (imageX + imageY * this.image.width) * 4 + 3;

        return !this.disabled && mouseX > this.x && mouseX < this.x + this.size
            && mouseY > this.y && mouseY < this.y + this.size
            && this.image.pixels[pixelAlphaIndex] !== 0
    }
}