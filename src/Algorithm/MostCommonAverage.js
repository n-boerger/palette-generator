export default class MostCommonAverage {
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
        const average = this.#averageColors(common);

        return average.map(colorInfo => colorInfo.color);
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
            const similar = [sorted.shift()];

            similar.push(...sorted.filter(colorInfo => {
                return similar.distanceTo(colorInfo.color);
            }));

            common.push(similar);
        }

        return common;
    }

    #averageColors(common) {
        return common.map(similar => {
            const average = similar.shift();

            for(const color of similar) {
                average.color.r += (color.color.r - average.color.r) * (color.amount / average.amount);
                average.color.g += (color.color.g - average.color.g) * (color.amount / average.amount);
                average.color.b += (color.color.b - average.color.b) * (color.amount / average.amount);

                if(!this.#options.ignoreAlpha) {
                    average.color.a += (color.color.a - average.color.a) * (color.amount / average.amount);
                }

                average.amount += color.amount;
            }

            return average;
        });
    }
}
