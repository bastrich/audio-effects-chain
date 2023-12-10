//start
class DynamicCompressorPanel {
    constructor(
        x, y,
        onAttackChange,
        onKneeChange,
        onReleaseChange,
        onRationChange,
        onThresholdChange,
        onDryWetChange,
        onOutputLevelChange,
    ) {
        this.x = x;
        this.y = y;
        this.width = 370;
        this.height = 440;
        this.headerTextSize = 40;
        this.headerFont = loadFont("fonts/Pusingkali-BWxnB.ttf")
        this.labelFont = loadFont("fonts/CroissantOne-dpgZ.ttf")

        this.attackKnob = new Knob(x + 10, y + this.headerTextSize + 30, 100, 0, 1, 0.003, onAttackChange);
        this.kneeKnob = new Knob(x + 130, y + this.headerTextSize + 30, 100, 0, 40, 30, onKneeChange);
        this.releaseKnob = new Knob(x + 250, y + this.headerTextSize + 30, 100, 0, 1, 0.25, onReleaseChange);
        this.ratioKnob = new Knob(x + 70, y + this.headerTextSize + 150, 100, 1, 20, 12, onRationChange);
        this.thresholdKnob = new Knob(x + 200, y + this.headerTextSize + 150, 100, -100, 0, -24, onThresholdChange);
        this.dryWetSlider = new Slider(x + 103, y + this.headerTextSize + 285, 130, 0, onDryWetChange);
        this.outputLevelSlider = new Slider(x + 233, y + this.headerTextSize + 285, 130, 1, onOutputLevelChange);
    }

    draw() {
        fill(0)
        textFont(this.headerFont);
        textSize(this.headerTextSize);
        textAlign(CENTER, TOP);
        text("Dynamic Compressor", this.x +  this.width / 2, this.y);

        noStroke();
        fill(color(0, 250, 154, 30))
        rect(this.x, this.y + this.headerTextSize,  this.width, this.height, 10);

        this.drawLabel("Attack", this.x + 60, this.y + this.headerTextSize + 30);
        this.attackKnob.draw();

        this.drawLabel("Knee", this.x + 180, this.y + this.headerTextSize + 30);
        this.kneeKnob.draw();

        this.drawLabel("Release", this.x + 300, this.y + this.headerTextSize + 30);
        this.releaseKnob.draw();

        this.drawLabel("Ratio", this.x + 120, this.y + this.headerTextSize + 150);
        this.ratioKnob.draw();

        this.drawLabel("Threshold", this.x + 250, this.y + this.headerTextSize + 150);
        this.thresholdKnob.draw();


        this.drawLabel("Dry/Wet", this.x + 120, this.y + this.headerTextSize + 290);
        this.drawLabel("Output\nLevel", this.x + 250, this.y + this.headerTextSize + 290);
    }

    cursorShouldBeHand() {
        return this.attackKnob.cursorShouldBeHand()
            || this.kneeKnob.cursorShouldBeHand()
            || this.releaseKnob.cursorShouldBeHand()
            || this.ratioKnob.cursorShouldBeHand()
            || this.thresholdKnob.cursorShouldBeHand();
    }

    drawLabel(labelText, x, y) {
        fill(0)
        textFont(this.labelFont);
        textSize(14);
        textAlign(CENTER, BOTTOM);
        text(labelText, x, y);
    }

    mousePressed() {
        this.attackKnob.mousePressed();
        this.kneeKnob.mousePressed();
        this.releaseKnob.mousePressed();
        this.ratioKnob.mousePressed();
        this.thresholdKnob.mousePressed();
    }

    mouseReleased() {
        this.attackKnob.mouseReleased();
        this.kneeKnob.mouseReleased();
        this.releaseKnob.mouseReleased();
        this.ratioKnob.mouseReleased();
        this.thresholdKnob.mouseReleased();
    }
}
//end