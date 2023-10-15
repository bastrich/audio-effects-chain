let prerecordedAudio;

let filterPanel;
let playbackControlPanel;

function preload() {
    prerecordedAudio = loadSound('audio/prerecorded.wav');

    playbackControlPanel = new PlaybackControlPanel(0, 0);
    filterPanel = new FilterPanel(20, 70);
}

function setup() {
    createCanvas(1000, 800);
}

function draw() {
    background(color("LightGoldenrodYellow"));
    playbackControlPanel.draw();


    drawingContext.shadowOffsetX = 0;
    drawingContext.shadowOffsetY = 0;

    filterPanel.draw();

    if (playbackControlPanel.cursorShouldBeHand() || filterPanel.cursorShouldBeHand()) {
        cursor(HAND);
    } else {
        cursor(ARROW);
    }
}

function mousePressed() {
    playbackControlPanel.mousePressed();
    filterPanel.mousePressed();

    // return false;
}

function mouseReleased() {
    playbackControlPanel.mouseReleased();
    filterPanel.mouseReleased();
}