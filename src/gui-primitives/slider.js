class Slider {
    constructor(x, y, size, value, onChange) {
        this.slider = createSlider(0, 1, value, 0.001);
        this.slider.position(x, y);
        this.slider.style('width', size + 'px');
        this.slider.style('transform', 'rotate(-90deg)  translateY(-' + (size/2 - 13) + 'px) translateX(-' + (size/2 + 5) + 'px)');
        this.slider.addClass('audio-slider')
        this.slider.input((event) => onChange(Number(event.target.value)));
        onChange(Number(value));
    }
    get value() {
        return this.slider.value();
    }
}