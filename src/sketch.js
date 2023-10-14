let pauseImg;
let playImg;
let stopImg;
let backwardImg;
let forwardImg;
let loopImg;
let recordImg;

let pauseButton;
let playButton;
let stopButton;
let backwardButton;
let forwardButton;
let loopButton;
let recordButton;

let prerecordedAudio;

let knobImage;

let knob;

function preload() {
    pauseImg = loadImage("images/pause.png");
    playImg = loadImage("images/play.png");
    stopImg = loadImage("images/stop.png");
    backwardImg = loadImage("images/backward.png");
    forwardImg = loadImage("images/forward.png");
    loopImg = loadImage("images/loop.png");
    recordImg = loadImage("images/record.png");

    prerecordedAudio = loadSound('audio/prerecorded.wav');

    knobImage = loadImage("images/knob.png");
}

function setup() {
    createCanvas(1000, 800);

    let buttonX = 20;
    let buttonDistance = 130;
    pauseButton = new MediaControlButton(pauseImg, buttonX, 20, function () {});
    playButton = new MediaControlButton(playImg, buttonX+=buttonDistance, 20, function () { prerecordedAudio.play() });
    stopButton = new MediaControlButton(stopImg, buttonX+=buttonDistance, 20, function () { prerecordedAudio.stop() });
    backwardButton = new MediaControlButton(backwardImg, buttonX+=buttonDistance, 20, function () {});
    forwardButton = new MediaControlButton(forwardImg, buttonX+=buttonDistance, 20, function () {});
    loopButton = new MediaControlButton(loopImg, buttonX+=buttonDistance, 20, function () {});
    recordButton = new MediaControlButton(recordImg, buttonX+=buttonDistance, 20, function () {});

    knob = new Knob(200, 200);

    // setAttributes('willReadFrequently', true);
}

function draw() {
    background(color("LightGoldenrodYellow"));

    pauseButton.draw();
    playButton.draw();
    stopButton.draw();
    backwardButton.draw();
    forwardButton.draw();
    loopButton.draw();
    recordButton.draw();

    drawingContext.shadowOffsetX = 0;
    drawingContext.shadowOffsetY = 0;

    knob.draw();
}

function mousePressed() {
    pauseButton.mousePressed();
    playButton.mousePressed();
    stopButton.mousePressed();
    backwardButton.mousePressed();
    forwardButton.mousePressed();
    loopButton.mousePressed();
    recordButton.mousePressed();

    knob.mousePressed();
}

function mouseReleased() {
    pauseButton.mouseReleased();
    playButton.mouseReleased();
    stopButton.mouseReleased();
    backwardButton.mouseReleased();
    forwardButton.mouseReleased();
    loopButton.mouseReleased();
    recordButton.mouseReleased();

    knob.mouseReleased();
}

class Knob {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 150;
        this.height = 150;

        this.image = knobImage;

        this.minAngle = 0;
        this.maxAngle = 3 / 2 * PI;



        this.angle = this.minAngle;
        this.draggingStartAngle = this.angle;
        this.dragging = false;
    }

    draw() {
        // console.log(this.angle);

        this.drawBars();

        if (this.dragging) {
            let dx = mouseX - (this.x + this.width / 2);
            let dy = mouseY - (this.y + this.height / 2);

            let angle = atan2(dy, dx) - this.draggingStartAngle;

            // if (angle >= this.minAngle && angle <= this.maxAngle) {
                this.angle = angle;
            // }
        }


        // if (dragging) {
        //     fill(175);
        // } else {
        //     fill(255);
        // }


        console.log(this.angle)
        push();
            translate(this.x + this.width / 2, this.y + this.width / 2);
            rotate(this.angle);
            imageMode(CENTER);
            image(knobImage, 0, 0, this.width, this.height);
        pop();

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
        let startWidth = 10;
        let endWidth = 50;
        let startAngle = - PI / 4;
        let endAngle = 5 * PI / 4;

        let widthInterval = (endWidth - startWidth) / n;
        let angleInterval = (endAngle - startAngle) / n;

        for (let i = 0; i <= n; i++) {
            let currentWidth = startWidth + i * widthInterval;
            let currentAngle = startAngle + i * angleInterval;
            push()
                translate(this.x + this.width / 2, this.y + this.width / 2);
                rotate(currentAngle);
                translate(- this.width / 2 - currentWidth - 5, 0);
                rect(0, 0, currentWidth, 5);
            pop();
        }
    }

    mousePressed() {
        if (this.mouseIsOnImage()) {
            let dx = mouseX - (this.x + this.width / 2);
            let dy = mouseY - (this.y + this.height / 2);
            let mouseAngle = atan2(dy, dx);
            this.dragging = true;
            this.draggingStartAngle = mouseAngle - this.angle;
        }
    }

    mouseReleased() {
        this.dragging = false;
    }

    mouseIsOnImage() {
        let imageX = map(mouseX - this.x, 0, this.width, 0, this.image.width);
        let imageY = map(mouseY - this.y, 0, this.height, 0, this.image.height);

        return mouseX > this.x && mouseX < this.x + this.width
            && mouseY > this.y && mouseY < this.y + this.height
            && this.image.get(imageX, imageY)[3] !== 0;
    }
}