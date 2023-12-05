class WaveshaperDistortionPanel {
    constructor(
        x, y,
        onDistortionAmountChange,
        onOversampleChange,
        onDryWetChange,
        onOutputLevelChange,
    ) {
        this.x = x;
        this.y = y;
        this.width = 240;
        this.height = 340;
        this.headerTextSize = 40;
        this.headerFont = loadFont("fonts/Pusingkali-BWxnB.ttf")
        this.labelFont = loadFont("fonts/CroissantOne-dpgZ.ttf")

        this.distortionAmountKnob = new Knob(x + 10, y + this.headerTextSize + 50, 100, 0, 1, 0.25, onDistortionAmountChange);
        this.oversampleKnob = new Knob(x + 130, y + this.headerTextSize + 50, 100, 0, 3, 0, (value) => onOversampleChange(this.mapOversampleKnobValue(value)), this.mapOversampleKnobValue);
        this.dryWetSlider = new Slider(x + 43, y + this.headerTextSize + 185, 130, 0, onDryWetChange);
        this.outputLevelSlider = new Slider(x + 163, y + this.headerTextSize + 185, 130, 1, onOutputLevelChange);
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
        this.distortionAmountKnob.draw();

        this.drawLabel("Oversample", this.x + 180, this.y + this.headerTextSize + 50);
        this.oversampleKnob.draw();

        this.drawLabel("Dry/Wet", this.x + 60, this.y + this.headerTextSize + 190);
        this.drawLabel("Output\nLevel", this.x + 180, this.y + this.headerTextSize + 190);
    }

    cursorShouldBeHand() {
        return this.distortionAmountKnob.cursorShouldBeHand() || this.oversampleKnob.cursorShouldBeHand();
    }

    drawLabel(labelText, x, y) {
        fill(0)
        textFont(this.labelFont);
        textSize(14);
        textAlign(CENTER, BOTTOM);
        text(labelText, x, y);
    }

    mousePressed() {
        this.distortionAmountKnob.mousePressed();
        this.oversampleKnob.mousePressed();
    }

    mouseReleased() {
        this.distortionAmountKnob.mouseReleased();
        this.oversampleKnob.mouseReleased();
    }

    mapOversampleKnobValue(value) {
        if (value < 1) {
            return 'none';
        }
        if (value <= 2) {
            return '2x';
        }
        return '4x';
    }
}