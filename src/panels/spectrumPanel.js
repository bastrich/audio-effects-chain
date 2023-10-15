class SpectrumPanel {
    constructor(x, y, width, height, audioSource) {
        this.fft = new p5.FFT();
        this.fft.setInput(audioSource)
    }

    draw() {
        let spectrum = this.fft.analyze();
        noStroke();
        for (let i = 0; i < spectrum.length; i++) {
            let x = map(i, 0, spectrum.length, 0, width);
            let h = -height + map(spectrum[i], 0, 255, height, 0);
            rect(x, height, width/spectrum.length, h);
        }
    }
}