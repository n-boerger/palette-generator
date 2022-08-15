export default class PaletteGenerator {
    #imageColorData;

    constructor(imageColorData) {
        this.#imageColorData = imageColorData;
    }

    generate(algorithm) {
        const colors = algorithm.calculate(this.#imageColorData.colors());

        return colors;
    }
}
