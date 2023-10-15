class MasterVolumePanel {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 100;
        this.height = 220;
        this.headerTextSize = 40;
        this.headerFont = loadFont("fonts/Pusingkali-BWxnB.ttf")

        this.dryWetSlider = new Slider(x + 33, y + this.headerTextSize, 200);
    }

    draw() {
        fill(0)
        textFont(this.headerFont);
        textSize(this.headerTextSize);
        textAlign(CENTER, TOP);
        text("Master Volume", this.x +  this.width / 2, this.y);

        noStroke();
        fill(color(0, 250, 154, 30))
        rect(this.x, this.y + this.headerTextSize,  this.width, this.height, 10);
    }
}