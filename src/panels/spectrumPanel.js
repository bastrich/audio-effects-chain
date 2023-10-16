class SpectrumPanel {
    constructor(x, y, width, height, title, audioInput) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.title = title;
        this.headerTextSize = 40;
        this.headerFont = loadFont("fonts/Pusingkali-BWxnB.ttf")

        // this.audioSource = audioSource;

        this.fft = new p5.FFT();
        this.fft.setInput(audioInput)
    }

    draw() {
        fill(0)
        textFont(this.headerFont);
        textSize(this.headerTextSize);
        textAlign(CENTER, TOP);
        text(this.title, this.x +  this.width / 2, this.y);


        noStroke();
        fill(color(0, 250, 154, 30))
        rect(this.x, this.y + this.headerTextSize,  this.width, this.height, 10);


        let spectrum = this.fft.analyze();
        // let freqPerBin = this.audioSource.sampleRate() / 2 / this.fft.bins;
        noStroke();
        fill(color(0, 250, 154, 240));
        for (let i = 0; i < spectrum.length; i++) {
            let width = (this.width - 10)/spectrum.length;
            let height = map(spectrum[i], 0, 255, 0, this.height - 10);
            let x = this.x + 5 + map(i, 0, spectrum.length - 1, 0, this.width - 10);
            let y = this.y + this.headerTextSize + (this.height - 5 - height);
            rect(x, y, width, height);
        }
    }
}