//start
class FilterPanel {
    constructor(
        x, y,
        onCutoffFrequencyChange,
        onResonanceChange,
        onFilterTypeChange,
        onDryWetChange,
        onOutputLevelChange,
    ) {
        this.x = x;
        this.y = y;
        this.width = 240;
        this.height = 380;
        this.headerTextSize = 40;
        this.headerFont = loadFont("fonts/Pusingkali-BWxnB.ttf")
        this.labelFont = loadFont("fonts/CroissantOne-dpgZ.ttf")

        this.filterTypeRadio = createRadio("filter-type-radio");
        this.filterTypeRadio.option('Low-pass');
        this.filterTypeRadio.option('High-pass');
        this.filterTypeRadio.option('Band-pass');
        this.filterTypeRadio.selected('Low-pass');
        this.filterTypeRadio.addClass('audi-radio');
        this.filterTypeRadio.style('width', (this.width - 10) + 'px');
        this.filterTypeRadio.style('height', 40 + 'px');
        this.filterTypeRadio.position(this.x + 5, this.y + this.headerTextSize + 5)
        this.filterTypeRadio.changed((event) => onFilterTypeChange(this.mapFilterTypeRadioValue(event.target.value)));

        this.cutoffFrequencyKnob = new Knob(x + 10, y + this.headerTextSize + 90, 100, 10, 22050, 10, onCutoffFrequencyChange);
        this.resonanceKnob = new Knob(x + 130, y + this.headerTextSize + 90, 100, 0.001, 1000, 0.001, onResonanceChange);
        this.dryWetSlider = new Slider(x + 43, y + this.headerTextSize + 225, 130, 0, onDryWetChange);
        this.outputLevelSlider = new Slider(x + 163, y + this.headerTextSize + 225, 130, 1, onOutputLevelChange);

        onFilterTypeChange(this.mapFilterTypeRadioValue('Low-pass'));
    }

    draw() {
        fill(0)
        textFont(this.headerFont);
        textSize(this.headerTextSize);
        textAlign(CENTER, TOP);
        text("Filter", this.x +  this.width / 2, this.y);

        noStroke();
        fill(color(0, 250, 154, 30))
        rect(this.x, this.y + this.headerTextSize,  this.width, this.height, 10);

        this.drawLabel("Cutoff\nFrequency", this.x + 60, this.y + this.headerTextSize + 90);
        this.cutoffFrequencyKnob.draw();

        this.drawLabel("Resonance", this.x + 180, this.y + this.headerTextSize + 90);
        this.resonanceKnob.draw();


        this.drawLabel("Dry/Wet", this.x + 60, this.y + this.headerTextSize + 230);
        this.drawLabel("Output\nLevel", this.x + 180, this.y + this.headerTextSize + 230);
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

    mapFilterTypeRadioValue(value) {
        switch (value) {
            case 'Low-pass':
                return 'lowpass';
            case 'High-pass':
                return 'highpass';
            case 'Band-pass':
                return 'bandpass';
        }
    }
}
//end