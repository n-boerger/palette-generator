


export default {
    input: 'index.js',
    output: [
        {
            file: 'dist/palette-generator.js',
            format: 'iife',
            name: 'PaletteGenerator',
        },
    ],
    plugins: [ json() ],
};
