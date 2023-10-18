class PlaybackControlPanel {
    constructor(
        x, y,
        onPrerecordedAudio,
        onMicrophone,
        onPause,
        onPlay,
        onStop,
        onBackward,
        onForward,
        onLoop,
        onRecord,
    ) {
        this.modeRadio = createRadio('mode-radio');
        this.modeRadio.option('Prerecorded Audio');
        this.modeRadio.option('Microphone');
        this.modeRadio.selected('Prerecorded Audio');
        this.modeRadio.addClass('audi-radio');
        this.modeRadio.style('width', '200px');
        this.modeRadio.style('height','50px');
        this.modeRadio.position(x + 5, y + 10)
        this.modeRadio.elt.onchange = this.onRadioChangeFunction(onPrerecordedAudio, onMicrophone);

        let buttonX = x + 235;
        let buttonDistance = 70;
        let buttonY = y + 5;
        this.pauseButton = new MediaControlButton(loadImage("images/pause.png"), buttonX, buttonY, 50, this.onPauseFunction(onPause));
        this.playButton = new MediaControlButton(loadImage("images/play.png"), buttonX+=buttonDistance, buttonY, 50, this.onPlayFunction(onPlay));
        this.stopButton = new MediaControlButton(loadImage("images/stop.png"), buttonX+=buttonDistance, buttonY, 50, this.onStopFunction(onStop));
        this.backwardButton = new MediaControlButton(loadImage("images/backward.png"), buttonX+=buttonDistance, buttonY, 50, onBackward);
        this.forwardButton = new MediaControlButton(loadImage("images/forward.png"), buttonX+=buttonDistance, buttonY, 50, onForward);
        this.loopButton = new MediaControlButton(loadImage("images/loop.png"), buttonX+=buttonDistance, buttonY, 50, this.onLoopFunction(onLoop));
        this.recordButton = new MediaControlButton(loadImage("images/record.png"), buttonX+=buttonDistance, buttonY, 50, this.onRecordFunction(onRecord));

        this.onRadioChangeFunction(onPrerecordedAudio, onMicrophone)();
    }

    setup() {
        this.pauseButton.setup();
        this.playButton.setup()
        this.stopButton.setup()
        this.backwardButton.setup();
        this.forwardButton.setup();
        this.loopButton.setup();
        this.recordButton.setup();
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

    onPauseFunction(onPause) {
        let self = this;
        return function() {
            onPause();
            self.pauseButton.disable();
            self.playButton.enable();
            self.stopButton.enable();
            self.backwardButton.enable();
            self.forwardButton.enable();
            self.loopButton.disable();
            self.recordButton.disable();
        }
    }

    onPlayFunction(onPlay) {
        let self = this;
        return function() {
            onPlay();
            self.pauseButton.enable();
            self.playButton.disable();
            self.stopButton.enable();
            self.backwardButton.enable();
            self.forwardButton.enable();
            self.loopButton.disable();
            self.recordButton.enable();

            self.pauseButton.activate();
            self.playButton.activate();
            self.loopButton.activate();
            self.recordButton.activate();
        }
    }

    onStopFunction(onStop) {
        let self = this;
        return function() {
            onStop();
            self.pauseButton.disable();
            self.playButton.enable();
            self.stopButton.disable();
            self.backwardButton.disable();
            self.forwardButton.disable();
            self.loopButton.enable();
            self.recordButton.disable();
        }
    }

    onLoopFunction(onLoop) {
        let self = this;
        return function() {
            onLoop();
            self.pauseButton.enable();
            self.playButton.disable();
            self.stopButton.enable();
            self.backwardButton.enable();
            self.forwardButton.enable();
            self.loopButton.disable();
            self.recordButton.enable();
        }
    }

    onRecordFunction(onRecord) {
        let self = this;
        return function() {
            onRecord();
            self.pauseButton.disable();
            self.playButton.disable();
            self.stopButton.enable();
            self.backwardButton.disable();
            self.forwardButton.disable();
            self.loopButton.disable();
            self.recordButton.disable();
        }
    }

    onRadioChangeFunction(onPrerecordedAudio, onMicrophone) {
        let self = this;
        return function() {
            switch (self.modeRadio.value()) {
                case "Prerecorded Audio":
                    onPrerecordedAudio();
                    self.pauseButton.disable();
                    self.playButton.enable();
                    self.stopButton.disable();
                    self.backwardButton.disable();
                    self.forwardButton.disable();
                    self.loopButton.enable();
                    self.recordButton.disable();
                    break;
                case "Microphone":
                    onMicrophone();
                    self.pauseButton.disable();
                    self.playButton.disable();
                    self.stopButton.disable();
                    self.backwardButton.disable();
                    self.forwardButton.disable();
                    self.loopButton.disable();
                    self.recordButton.enable();
                    break;
            }
        }
    }
}