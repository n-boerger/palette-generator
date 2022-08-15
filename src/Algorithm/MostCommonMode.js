export default class MostCommonMode {
    #options = {
        paletteSize: 5,
        ignoreAlpha: true,
    };

    constructor(options) {
        this.#options = {...this.#options, ...options};
    }

    calculate(colors) {
        const distinct = this.#distinctColors(colors);
        const common = this.#mostCommonColors(distinct);

        return common.map(colorInfo => colorInfo.color);
    }

    #distinctColors(colors) {
        const distinct = {};

        for(const color of colors) {
            let key = `${color.r}_${color.g}_${color.b}`;

            if(!this.#options.ignoreAlpha) {
                key += `_${color.a}`;
            }

            if(typeof distinct[key] === 'undefined') {
                distinct[key] = {
                    color,
                    amount: 0,
                };
            }

            distinct[key].amount++;
        }

        return Object.values(distinct);
    }

    #mostCommonColors(distinct) {
        const common = [];
        const maxDistance = (this.#options.ignoreAlpha ? 3 : 4) * 255 / this.#options.paletteSize;

        let sorted = distinct
            .sort((colorA, colorB) => {
                return colorB.amount - colorA.amount;
            });

        for(let i = 0; i < this.#options.paletteSize; i++) {
            const mostCommon = sorted.shift();

            sorted = sorted.filter(colorInfo => {
                return mostCommon.distanceTo(colorInfo.color);
            });

            common.push(mostCommon);
        }

        return common;
    }
}
