class Knob {
    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.barsSize = 15;
        this.knobSize = size - 2 * this.barsSize;

        this.minAngle = 0;
        this.maxAngle = 3 / 2 * PI;


        this.angle = this.minAngle;
        this.draggingStartAngleOffset = this.angle;
        this.dragging = false;

        this.image = loadImage("../images/knob.png");
    }

    draw() {
        this.drawBars();

        if (this.dragging) {
            let dx = mouseX - (this.x + this.size / 2);
            let dy = mouseY - (this.y + this.size / 2);

            let angle = (atan2(dy, dx) - this.draggingStartAngleOffset) % TWO_PI;
            if (angle < 0) {
                angle += TWO_PI;
            }

            if (angle >= this.minAngle && angle <= this.maxAngle) {
                this.angle = angle;
            } else if (angle > this.maxAngle) {
                if (angle > this.maxAngle + PI / 4) {
                    this.angle = this.minAngle;
                } else {
                    this.angle = this.maxAngle;
                }
            }

            drawingContext.shadowColor = color(0, 250, 154, 150);
            drawingContext.shadowBlur = 15;
        }


        push();
            translate(this.x + this.size / 2, this.y + this.size / 2);
            rotate(this.angle);
            imageMode(CENTER);
            image(this.image, 0, 0, this.knobSize, this.knobSize);
        pop();

        drawingContext.shadowBlur = 0;

        // Map is an amazing function that will map one range to another!
        // Here we take the knob's range and map it to a value between 0 and 255
        // Our angle is either between
        // let calcAngle = 0;
        // if (this.angle < 0) {
        //     calcAngle = map(this.angle, -PI, 0, PI, 0);
        // } else if (angle > 0) {
        //     calcAngle = map(this.angle, 0, PI, TWO_PI, PI);
        // }

    }

    drawBars() {
        let n = 20;
        let startWidth = 2;
        let endWidth = 2/3 * this.barsSize;
        let startAngle = - PI / 4;
        let endAngle = 5 * PI / 4 - atan2(5, this.knobSize / 2 + this.barsSize);

        let widthInterval = (endWidth - startWidth) / n;
        let angleInterval = (endAngle - startAngle) / n;

        for (let i = 0; i <= n; i++) {
            let currentWidth = startWidth + i * widthInterval;
            let currentAngle = startAngle + i * angleInterval;
            push()
                translate(this.x + this.size / 2, this.y + this.size / 2);
                rotate(currentAngle);
                translate(-this.knobSize / 2 - currentWidth - 1/3 * this.barsSize, -5);
                noStroke();

                if (this.angle > currentAngle + PI / 4) {
                    drawingContext.shadowColor = color("red")
                    drawingContext.shadowBlur = 5;
                    fill(color("red"))
                    // strokeWeight(0.5)
                    // stroke(0)
                } else {
                    fill(color("LightCoral"))
                }
                rect(0, 0, currentWidth, 5, 2);
            pop();
        }
    }

    cursorShouldBeHand() {
        return this.mouseIsOnImage();
    }

    mousePressed() {
        if (this.mouseIsOnImage()) {
            let dx = mouseX - (this.x + this.size / 2);
            let dy = mouseY - (this.y + this.size / 2);
            this.dragging = true;
            this.draggingStartAngleOffset = atan2(dy, dx) - this.angle;
        }
    }

    mouseReleased() {
        this.dragging = false;
    }

    mouseIsOnImage() {
        let imageX = map(mouseX - this.x - this.barsSize, 0, this.knobSize, 0, this.image.width);
        let imageY = map(mouseY - this.y - this.barsSize, 0, this.knobSize, 0, this.image.height);

        return mouseX > this.x + this.barsSize && mouseX < this.x + this.size - this.barsSize
            && mouseY > this.y + this.barsSize && mouseY < this.y + this.size - this.barsSize
            && this.image.get(imageX, imageY)[3] !== 0;
    }
}