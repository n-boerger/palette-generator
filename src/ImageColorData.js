import Color from './Color.js';

export default class ImageColorData {
    static async fromFile(file) {
        const url = URL.createObjectURL(file);
        const imageColorData = await ImageColorData.fromUrl(url);

        URL.revokeObjectURL(url);

        return imageColorData;
    }

    static async fromUrl(url) {
        const image = new Image();
        const imageData = await new Promise((resolve) => {
            const image = new Image();

            image.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.width = image.width;
                canvas.height = image.height;

                const context = canvas.getContext('2d');
                context.drawImage(image, 0, 0);

                resolve(
                    context.getImageData(0, 0, image.width, image.height)
                );
        });

        return new ImageColorData(imageData);
    }

    #colors = [];

    constructor(imageData) {
        this.#imageData = imageData.data;
    }

    colors() {
        if(this.#colors.length !== 0) return this.#colors;

        for(let i = 0; i < this.#imageData.length; i += 4) {
            this.#colors.push(new Color(
                this.#imageData[i],
                this.#imageData[i + 1],
                this.#imageData[i + 2],
                this.#imageData[i + 3],
            ));
        }

        return this.#colors;
    }
}
