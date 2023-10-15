class WaveshaperDistortionPanel {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 240;
        this.height = 340;
        this.headerTextSize = 40;
        this.headerFont = loadFont("fonts/Pusingkali-BWxnB.ttf")
        this.labelFont = loadFont("fonts/CroissantOne-dpgZ.ttf")

        this.cutoffFrequencyKnob = new Knob(x + 10, y + this.headerTextSize + 50, 100);
        this.resonanceKnob = new Knob(x + 130, y + this.headerTextSize + 50, 100);
        this.dryWetSlider = new Slider(x + 43, y + this.headerTextSize + 185, 130);
        this.outputLevelSlider = new Slider(x + 163, y + this.headerTextSize + 185, 130);
    }

    draw() {
        fill(0)
        textFont(this.headerFont);
        textSize(this.headerTextSize);
        textAlign(CENTER, TOP);
        text("Waveshaper Distortion", this.x +  this.width / 2, this.y);

        noStroke();
        fill(color(0, 250, 154, 30))
        rect(this.x, this.y + this.headerTextSize,  this.width, this.height, 10);

        this.drawLabel("Distortion\nAmount", this.x + 60, this.y + this.headerTextSize + 50);
        this.cutoffFrequencyKnob.draw();

        this.drawLabel("Oversample", this.x + 180, this.y + this.headerTextSize + 50);
        this.resonanceKnob.draw();


        this.drawLabel("Dry/Wet", this.x + 60, this.y + this.headerTextSize + 190);
        this.drawLabel("Output\nLevel", this.x + 180, this.y + this.headerTextSize + 190);
    }

    cursorShouldBeHand() {
        return this.cutoffFrequencyKnob.cursorShouldBeHand() || this.resonanceKnob.cursorShouldBeHand();
    }

    drawLabel(labelText, x, y) {
        fill(0)
        textFont(this.labelFont);
        textSize(14);
        textAlign(CENTER, BOTTOM);
        text(labelText, x, y);
    }

    mousePressed() {
        this.cutoffFrequencyKnob.mousePressed();
        this.resonanceKnob.mousePressed();
    }

    mouseReleased() {
        this.cutoffFrequencyKnob.mouseReleased();
        this.resonanceKnob.mouseReleased();
    }
}