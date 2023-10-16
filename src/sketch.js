let prerecordedAudio;

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

let effectChain;

let spectrumInPanel;
let spectrumOutPanel;

function preload() {
    prerecordedAudio = loadSound('audio/prerecorded.wav');

    filterEffect =  new p5.Filter();
    dynamicCompressorEffect = new p5.Compressor();
    reverbEffect = new p5.Reverb();
    waveshaperDistortionEffect = new p5.Distortion();
    delayEffect = new p5.Delay();

    playbackControlPanel = new PlaybackControlPanel(
        0, 0,
        function () { },
        function () { },
        function () {
            prerecordedAudio.disconnect();
            prerecordedAudio.connect(filterEffect);
            prerecordedAudio.play();
            },
        function () { prerecordedAudio.stop(); }
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
        (value) => console.log(value),
        (value) => console.log(value),
        (value) => console.log(value),
        (value) => console.log(value),
        (value) => console.log(value),
        (value) => console.log(value),
        (value) => console.log(value)
    );
    reverbPanel = new ReverbPanel(
        20, 510,
        (value) => console.log(value),
        (value) => console.log(value),
        (value) => console.log(value),
        (value) => console.log(value),
        (value) => console.log(value)
    );
    waveshaperDistortionPanel = new WaveshaperDistortionPanel(
        310, 570,
        (value) => console.log(value),
        (value) => console.log(value),
        (value) => console.log(value),
        (value) => console.log(value)
    );
    delayPanel = new DelayPanel(
        600, 570,
        (value) => console.log(value),
        (value) => console.log(value),
        (value) => console.log(value),
        (value) => console.log(value),
        (value) => console.log(value)
    );

    masterVolumePanel = new MasterVolumePanel(765, 180, (value) => masterVolume(value));
}

function setup() {
    createCanvas(1500, 980);



    // effectChain = filterEffect.chain(waveshaperDistortionEffect, delayEffect, dynamicCompressorEffect, reverbEffect);

    spectrumInPanel = new SpectrumPanel(1000, 100, 470, 350, "Spectrum IN", prerecordedAudio);
    spectrumOutPanel = new SpectrumPanel(1000, 490, 470, 350, "Spectrum OUT", filterEffect);


    // let mic = new p5.AudioIn();
    // mic.start()
    // mic.connect();
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

    // updateEffectParams();
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

function updateEffectParams() {


    dynamicCompressorEffect.attack(dynamicCompressorPanel.attack);
    dynamicCompressorEffect.knee(dynamicCompressorPanel.knee);
    dynamicCompressorEffect.release(dynamicCompressorPanel.release);
    dynamicCompressorEffect.ratio(dynamicCompressorPanel.ratio);
    dynamicCompressorEffect.threshold(dynamicCompressorPanel.threshold);
    dynamicCompressorEffect.drywet(dynamicCompressorPanel.dryWet)
    dynamicCompressorEffect.amp(dynamicCompressorPanel.outputLevel)

    reverbEffect.set(reverbPanel.duration, reverbPanel.decayRate, reverbPanel.reverse);
    reverbEffect.drywet(reverbPanel.dryWet)
    reverbEffect.amp(reverbPanel.outputLevel)

    waveshaperDistortionEffect.set(waveshaperDistortionPanel.distortionAmount, waveshaperDistortionPanel.oversample);
    waveshaperDistortionEffect.drywet(waveshaperDistortionPanel.dryWet)
    waveshaperDistortionEffect.amp(waveshaperDistortionPanel.outputLevel)

    delayEffect.delayTime(delayPanel.delayTime);
    delayEffect.feedback(delayPanel.feedback);
    delayEffect.filter(delayPanel.lowpassFrequency);
    delayEffect.drywet(delayPanel.dryWet)
    delayEffect.amp(delayPanel.outputLevel)
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