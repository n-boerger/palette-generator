import { version } from './package.json';
import MostCommonMode from './src/Algorithm/MostCommonMode.js';
import MostCommonAverage from './src/Algorithm/MostCommonAverage.js';
import PaletteGenerator from './src/PaletteGenerator.js';

export default new class {
    static get version() {
        return version;
    }

    static get Algorithm {
        return {
            MostCommonMode,
            MostCommonAverage,
        };
    }

    static get Generator {
        return PaletteGenerator;
    }
}
