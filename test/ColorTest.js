import test from 'unit.js';
import Color from './../src/Color.js';

describe('Test Color', function() {
    it('Has correct red value', function() {
        const value = 255;
        const color = new Color(value, 0, 0, 0);

        test.object(color)
            .hasOwnProperty('r', value);
    });

    it('Has correct green value', function() {
        const value = 255;
        const color = new Color(0, value, 0, 0);

        test.object(color)
            .hasOwnProperty('g', value);
    });

    it('Has correct blue value', function() {
        const value = 255;
        const color = new Color(0, 0, value, 0);

        test.object(color)
            .hasOwnProperty('b', value);
    });

    it('Has correct alpha value', function() {
        const value = 255;
        const color = new Color(0, 0, 0, value);

        test.object(color)
            .hasOwnProperty('a', value);
    });

    it('Has correct default values', function() {
        const color = new Color();

        test.object(color)
            .hasOwnProperty('r', 0)
            .hasOwnProperty('g', 0)
            .hasOwnProperty('b', 0)
            .hasOwnProperty('a', 0);
    });

    it('Can determine equality to another color', function() {
        const color = new Color(0, 10, 100, 200);
        const equal = new Color(0, 10, 100, 200);
        const differents = [
            new Color(0, 0, 0, 0),
            new Color(10, 10, 10, 10),
            new Color(100, 100, 100, 100),
            new Color(200, 200, 200, 200),
        ];

       test.bool(color.equals(equal)).isTrue();

       for(const different of differents) {
           test.bool(color.equals(different)).isFalse();
       }
    });

    it('Can calculate distance to another color', function() {
        const color = new Color(100, 200, 0, 10);
        const compare = new Color(200, 100, 10, 0);

        test.number(color.distanceTo(compare))
            .is(220);
    });

    it('Can convert to rgba', function() {
        const color = new Color(0.1, 0.2, 0.3, 127.5);

        test.string(color.toRGBAString())
            .is('rgba(0, 0, 0, 0.5)');
    });
});
