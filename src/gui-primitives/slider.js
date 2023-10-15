class Slider {
    constructor(x, y, size) {
        this.slider = createSlider(0, 255, 100);
        this.slider.position(x, y);
        this.slider.style('width', size + 'px');
        this.slider.style('transform', 'rotate(-90deg)  translateY(-' + (size/2 - 13) + 'px) translateX(-' + (size/2 + 5) + 'px)');
        // slider.style('');
        this.slider.addClass('audio-slider')
    }
}