export default class Color {
    constructor(r = 0, g = 0, b = 0, a = 0) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }

    equals(color) {
        if(this.r !== color.r) return false;
        if(this.g !== color.g) return false;
        if(this.b !== color.b) return false;
        if(this.a !== color.a) return false;

        return true;
    }

    distanceTo(color) {
        return Math.abs(this.r - color.r) +
            Math.abs(this.g - color.g) +
            Math.abs(this.b - color.b) +
            Math.abs(this.a - color.a);
    }

    toRGBAString() {
        return `rgba(${Math.round(this.r)}, ${Math.round(this.g)}, ${Math.round(this.b)}, ${this.a / 255})`;
    }
}
