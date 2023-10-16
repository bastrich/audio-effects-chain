class ReverbPanel {
    constructor(
        x, y,
        onDurationChange,
        onDecayRateChange,
        onReverseChange,
        onDryWetChange,
        onOutputLevelChange,
    ) {
        this.x = x;
        this.y = y;
        this.width = 240;
        this.height = 400;
        this.headerTextSize = 40;
        this.headerFont = loadFont("fonts/Pusingkali-BWxnB.ttf")
        this.labelFont = loadFont("fonts/CroissantOne-dpgZ.ttf")

        this.reverseCheckbox = createCheckbox(false);
        this.reverseCheckbox.position(this.x + 20, this.y + this.headerTextSize + 170)
        this.reverseCheckbox.addClass('reverse-reverb-checkbox')
        this.reverseCheckbox.changed((event) => onReverseChange(event.target.checked));

        this.durationKnob = new Knob(x + 10, y + this.headerTextSize + 50, 100, 0, 10, 3, onDurationChange);
        this.decayRateKnob = new Knob(x + 130, y + this.headerTextSize + 50, 100, 0, 100, 2, onDecayRateChange);
        this.dryWetSlider = new Slider(x + 43, y + this.headerTextSize + 245, 130, 0, onDryWetChange);
        this.outputLevelSlider = new Slider(x + 163, y + this.headerTextSize + 245, 130, 0, onOutputLevelChange);

        onReverseChange(false);
    }

    draw() {
        fill(0)
        textFont(this.headerFont);
        textSize(this.headerTextSize);
        textAlign(CENTER, TOP);
        text("Reverb", this.x +  this.width / 2, this.y);

        noStroke();
        fill(color(0, 250, 154, 30))
        rect(this.x, this.y + this.headerTextSize,  this.width, this.height, 10);

        this.drawLabel("Reverb\nDuration", this.x + 60, this.y + this.headerTextSize + 50);
        this.durationKnob.draw();

        this.drawLabel("Decay\nRate", this.x + 180, this.y + this.headerTextSize + 50);
        this.decayRateKnob.draw();

        this.drawLabel("Reverse", this.x + 85, this.y + this.headerTextSize + 190);

        this.drawLabel("Dry/Wet", this.x + 60, this.y + this.headerTextSize + 250);
        this.drawLabel("Output\nLevel", this.x + 180, this.y + this.headerTextSize + 250);
    }

    cursorShouldBeHand() {
        return this.durationKnob.cursorShouldBeHand() || this.decayRateKnob.cursorShouldBeHand();
    }

    drawLabel(labelText, x, y) {
        fill(0)
        textFont(this.labelFont);
        textSize(14);
        textAlign(CENTER, BOTTOM);
        text(labelText, x, y);
    }

    mousePressed() {
        this.durationKnob.mousePressed();
        this.decayRateKnob.mousePressed();
    }

    mouseReleased() {
        this.durationKnob.mouseReleased();
        this.decayRateKnob.mouseReleased();
    }
}