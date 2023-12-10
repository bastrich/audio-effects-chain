//start
let prerecordedAudio;
let microphone;
let recorder;
let recordedAudio;

let playbackControlPanel;

let filterPanel;
let dynamicCompressorPanel;
let reverbPanel;
let waveshaperDistortionPanel;
let delayPanel;

let masterVolumePanel;

let filterEffect;
let dynamicCompressorEffect;
let reverbEffect;
let waveshaperDistortionEffect;
let delayEffect;

let spectrumInPanel;
let spectrumOutPanel;

function preload() {
    prerecordedAudio = loadSound('audio/prerecorded.wav');
    prerecordedAudio.onended(onPlaybackEnded);

    filterEffect = new p5.Filter();
    dynamicCompressorEffect = new p5.Compressor();
    reverbEffect = new p5.Reverb();
    waveshaperDistortionEffect = new p5.Distortion();
    delayEffect = new p5.Delay();

    filterEffect.disconnect()
    dynamicCompressorEffect.disconnect()
    reverbEffect.disconnect()
    waveshaperDistortionEffect.disconnect()
    delayEffect.disconnect()
    filterEffect.chain(waveshaperDistortionEffect, delayEffect, dynamicCompressorEffect, reverbEffect, soundOut);

    playbackControlPanel = new PlaybackControlPanel(
        0, 0,
        onSwitchToPrerecordedAudio,
        onSwitchToMicrophone,
        onPause,
        onPlay,
        onStop,
        onBackward,
        onForward,
        onLoop,
        onRecord
    );
    filterPanel = new FilterPanel(
        20, 70,
        (value) => filterEffect.freq(value),
        (value) => filterEffect.res(value),
        (value) => filterEffect.setType(value),
        (value) => filterEffect.drywet(value),
        (value) => filterEffect.amp(value)
    );
    dynamicCompressorPanel = new DynamicCompressorPanel(
        280, 70,
        (value) => dynamicCompressorEffect.attack(value),
        (value) => dynamicCompressorEffect.knee(value),
        (value) => dynamicCompressorEffect.release(value),
        (value) => dynamicCompressorEffect.ratio(value),
        (value) => dynamicCompressorEffect.threshold(value),
        (value) => dynamicCompressorEffect.drywet(value),
        (value) => dynamicCompressorEffect.amp(value)
    );
    reverbPanel = new ReverbPanel(
        20, 510,
        (value) => reverbEffect.set(value),
        (value) => reverbEffect.set(null, value),
        (value) => reverbEffect.set(null, null, value),
        (value) => reverbEffect.drywet(value),
        (value) => reverbEffect.amp(value)
    );
    waveshaperDistortionPanel = new WaveshaperDistortionPanel(
        310, 570,
        (value) => waveshaperDistortionEffect.set(value),
        (value) => waveshaperDistortionEffect.set(null, value),
        (value) => waveshaperDistortionEffect.drywet(value),
        (value) => waveshaperDistortionEffect.amp(value)
    );
    delayPanel = new DelayPanel(
        600, 570,
        (value) => delayEffect.delayTime(value),
        (value) => delayEffect.feedback(value),
        (value) => delayEffect.filter(value),
        (value) => delayEffect.drywet(value),
        (value) => delayEffect.amp(value)
    );

    masterVolumePanel = new MasterVolumePanel(765, 180, (value) => outputVolume(value));
}

function setup() {
    createCanvas(1500, 980);

    microphone = new p5.AudioIn();

    playbackControlPanel.setup();

    spectrumInPanel = new SpectrumPanel(1000, 100, 470, 350, "Spectrum IN", prerecordedAudio);
    spectrumOutPanel = new SpectrumPanel(1000, 490, 470, 350, "Spectrum OUT", soundOut);
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

    updateCursorIcon();
}

function updateCursorIcon() {
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
}

function mouseReleased() {
    playbackControlPanel.mouseReleased();
    filterPanel.mouseReleased();
    dynamicCompressorPanel.mouseReleased();
    reverbPanel.mouseReleased();
    waveshaperDistortionPanel.mouseReleased();
    delayPanel.mouseReleased();
}

function onPlaybackEnded() {
    finishRecording();
    playbackControlPanel.playbackFinished();
}

function onSwitchToPrerecordedAudio() {
    finishRecording();
    prerecordedAudio.disconnect();
    if (microphone) {
        microphone.stop();
        microphone.disconnect();
    }
    prerecordedAudio.connect(filterEffect);
    if (spectrumInPanel) {
        spectrumInPanel.setInput(prerecordedAudio);
    }
}

function onSwitchToMicrophone() {
    userStartAudio();
    finishRecording();
    prerecordedAudio.stop();
    prerecordedAudio.disconnect();
    microphone.disconnect();
    microphone.start();
    microphone.connect(filterEffect);
    spectrumInPanel.setInput(microphone);
}

function onPause() {
    prerecordedAudio.pause()
}

function onPlay() {
    userStartAudio();
    prerecordedAudio.play();
}

function onStop() {
    prerecordedAudio.stop();
    finishRecording();
}

function onBackward() {
    prerecordedAudio.jump(prerecordedAudio.currentTime() - 5);
}

function onForward() {
    prerecordedAudio.jump(prerecordedAudio.currentTime() + 5);
}

function onLoop() {
    userStartAudio();
    prerecordedAudio.loop()
}

function onRecord() {
    recorder = new p5.SoundRecorder();
    recordedAudio = new p5.SoundFile();
    recorder.record(
        recordedAudio,
        null,
        () => {
            recordedAudio.save("processed-recording.wav");
            recordedAudio = null;
        }
    );
}

function finishRecording() {
    if (recorder) recorder.stop();
    recorder = null;
}
//end