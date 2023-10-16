class PlaybackControlPanel {
    constructor(
        x, y,
        onPrerecordedAudio,
        onMicrophone,
        onPlay,
        onStop
    ) {
        this.onPrerecordedAudio = onPrerecordedAudio;
        this.onMicrophone = onMicrophone;


        this.modeRadio = createRadio('mode-radio');
        this.modeRadio.option('Prerecorded Audio');
        this.modeRadio.option('Microphone');
        this.modeRadio.selected('Prerecorded Audio');
        this.modeRadio.addClass('audi-radio');
        this.modeRadio.style('width', '200px');
        this.modeRadio.style('height','50px');
        this.modeRadio.position(x + 5, y + 10)
        this.modeRadio.elt.onchange = this.onRadioChangeFunction();

        let buttonX = x + 205;
        let buttonDistance = 50;
        let buttonY = y + 5;
        this.pauseButton = new MediaControlButton(loadImage("images/pause.png"), buttonX, buttonY, 50, function () {});
        this.playButton = new MediaControlButton(loadImage("images/play.png"), buttonX+=buttonDistance, buttonY, 50, onPlay);
        this.stopButton = new MediaControlButton(loadImage("images/stop.png"), buttonX+=buttonDistance, buttonY, 50, onStop);
        this.backwardButton = new MediaControlButton(loadImage("images/backward.png"), buttonX+=buttonDistance, buttonY, 50, function () {});
        this.forwardButton = new MediaControlButton(loadImage("images/forward.png"), buttonX+=buttonDistance, buttonY, 50, function () {});
        this.loopButton = new MediaControlButton(loadImage("images/loop.png"), buttonX+=buttonDistance, buttonY, 50, function () {});
        this.recordButton = new MediaControlButton(loadImage("images/record.png"), buttonX+=buttonDistance, buttonY, 50, function () {});
    }

    draw() {
        this.pauseButton.draw();
        this.playButton.draw();
        this.stopButton.draw();
        this.backwardButton.draw();
        this.forwardButton.draw();
        this.loopButton.draw();
        this.recordButton.draw();
    }

    cursorShouldBeHand() {
        return this.pauseButton.cursorShouldBeHand()
            || this.playButton.cursorShouldBeHand()
            || this.stopButton.cursorShouldBeHand()
            || this.backwardButton.cursorShouldBeHand()
            || this.forwardButton.cursorShouldBeHand()
            || this.loopButton.cursorShouldBeHand()
            || this.recordButton.cursorShouldBeHand();
    }

    mousePressed() {
        this.pauseButton.mousePressed();
        this.playButton.mousePressed();
        this.stopButton.mousePressed();
        this.backwardButton.mousePressed();
        this.forwardButton.mousePressed();
        this.loopButton.mousePressed();
        this.recordButton.mousePressed();
    }

    mouseReleased() {
        this.pauseButton.mouseReleased();
        this.playButton.mouseReleased();
        this.stopButton.mouseReleased();
        this.backwardButton.mouseReleased();
        this.forwardButton.mouseReleased();
        this.loopButton.mouseReleased();
        this.recordButton.mouseReleased();
    }

    onRadioChangeFunction() {
        let self = this;
        return function() {
            switch (self.modeRadio.value()) {
                case "Prerecorded Audio":
                    self.onPrerecordedAudio();
                    break;
                case "Microphone":
                    self.onMicrophone();
                    break;
            }
        }
    }
}