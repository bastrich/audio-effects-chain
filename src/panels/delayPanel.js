//start
class DelayPanel {
    constructor(
        x, y,
        onDelayTimeChange,
        onFeedbackChange,
        onLowpassFrequencyChange,
        onDryWetChange,
        onOutputLevelChange,
    ) {
        this.x = x;
        this.y = y;
        this.width = 370;
        this.height = 340;
        this.headerTextSize = 40;
        this.headerFont = loadFont("fonts/Pusingkali-BWxnB.ttf")
        this.labelFont = loadFont("fonts/CroissantOne-dpgZ.ttf")

        this.delayTimeKnob = new Knob(x + 10, y + this.headerTextSize + 50, 100, 0, 1, 0, onDelayTimeChange);
        this.feedbackKnob = new Knob(x + 130, y + this.headerTextSize + 50, 100, 0, 1, 0.5, onFeedbackChange);
        this.lowpassFrequencyKnob = new Knob(x + 250, y + this.headerTextSize + 50, 100, 10, 22050, 10, onLowpassFrequencyChange);
        this.dryWetSlider = new Slider(x + 103, y + this.headerTextSize + 185, 130, 0, onDryWetChange);
        this.outputLevelSlider = new Slider(x + 233, y + this.headerTextSize + 185, 130, 1, onOutputLevelChange);
    }

    draw() {
        fill(0)
        textFont(this.headerFont);
        textSize(this.headerTextSize);
        textAlign(CENTER, TOP);
        text("Delay", this.x +  this.width / 2, this.y);

        noStroke();
        fill(color(0, 250, 154, 30))
        rect(this.x, this.y + this.headerTextSize,  this.width, this.height, 10);

        this.drawLabel("Delay Time", this.x + 60, this.y + this.headerTextSize + 50);
        this.delayTimeKnob.draw();

        this.drawLabel("Feedback", this.x + 180, this.y + this.headerTextSize + 50);
        this.feedbackKnob.draw();

        this.drawLabel("Low-pass\nfrequency", this.x + 300, this.y + this.headerTextSize + 50);
        this.lowpassFrequencyKnob.draw();


        this.drawLabel("Dry/Wet", this.x + 120, this.y + this.headerTextSize + 190);
        this.drawLabel("Output\nLevel", this.x + 250, this.y + this.headerTextSize + 190);
    }

    cursorShouldBeHand() {
        return this.delayTimeKnob.cursorShouldBeHand()
            || this.feedbackKnob.cursorShouldBeHand()
            || this.lowpassFrequencyKnob.cursorShouldBeHand();
    }

    drawLabel(labelText, x, y) {
        fill(0)
        textFont(this.labelFont);
        textSize(14);
        textAlign(CENTER, BOTTOM);
        text(labelText, x, y);
    }

    mousePressed() {
        this.delayTimeKnob.mousePressed();
        this.feedbackKnob.mousePressed();
        this.lowpassFrequencyKnob.mousePressed();
    }

    mouseReleased() {
        this.delayTimeKnob.mouseReleased();
        this.feedbackKnob.mouseReleased();
        this.lowpassFrequencyKnob.mouseReleased();
    }
}
//end