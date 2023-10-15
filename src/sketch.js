let prerecordedAudio;

let playbackControlPanel;
let filterPanel;
let dynamicCompressorPanel;
let reverbPanel;
let waveshaperDistortionPanel;
let delayPanel;
let masterVolumePanel;


let spectrumInPanel;
let spectrumOutPanel;

function preload() {
    prerecordedAudio = loadSound('audio/prerecorded.wav');

    playbackControlPanel = new PlaybackControlPanel(
        0, 0,
        function () { prerecordedAudio.play(); },
        function () { prerecordedAudio.stop(); }
    );
    filterPanel = new FilterPanel(20, 70);
    dynamicCompressorPanel = new DynamicCompressorPanel(280, 70);
    reverbPanel = new ReverbPanel(20, 510);
    waveshaperDistortionPanel = new WaveshaperDistortionPanel(310, 570);
    delayPanel = new DelayPanel(600, 570);
    masterVolumePanel = new MasterVolumePanel(765, 180);
    spectrumInPanel = new SpectrumPanel(1000, 100, 470, 350, "Spectrum IN", prerecordedAudio);
    spectrumOutPanel = new SpectrumPanel(1000, 490, 470, 350, "Spectrum OUT", prerecordedAudio);
}

function setup() {
    createCanvas(1500, 980);


}

function draw() {
    background(color("LightGoldenrodYellow"));

    playbackControlPanel.draw();
    filterPanel.draw();
    dynamicCompressorPanel.draw();
    reverbPanel.draw();
    waveshaperDistortionPanel.draw();
    delayPanel.draw();
    masterVolumePanel.draw();
    spectrumInPanel.draw();
    spectrumOutPanel.draw();

    if (playbackControlPanel.cursorShouldBeHand()
        || filterPanel.cursorShouldBeHand()
        || dynamicCompressorPanel.cursorShouldBeHand()
        || reverbPanel.cursorShouldBeHand()
        || waveshaperDistortionPanel.cursorShouldBeHand()
        || delayPanel.cursorShouldBeHand()
    ) {
        cursor(HAND);
    } else {
        cursor(ARROW);
    }
}

function mousePressed() {
    playbackControlPanel.mousePressed();
    filterPanel.mousePressed();
    dynamicCompressorPanel.mousePressed();
    reverbPanel.mousePressed();
    waveshaperDistortionPanel.mousePressed();
    delayPanel.mousePressed();

    // return false;
}

function mouseReleased() {
    playbackControlPanel.mouseReleased();
    filterPanel.mouseReleased();
    dynamicCompressorPanel.mouseReleased();
    reverbPanel.mouseReleased();
    waveshaperDistortionPanel.mouseReleased();
    delayPanel.mouseReleased();
}