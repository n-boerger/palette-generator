import Color from './Color.js';

export default class ImageColorData {
    static async fromFile(file) {
        const url = URL.createObjectURL(file);
        const imageColorData = await ImageColorData.fromUrl(url);

        URL.revokeObjectURL(url);

        return imageColorData;
    }

    static async fromUrl(url) {
        const imageData = await new Promise(resolve => {
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
            };

            image.src = url;
        });

        return new ImageColorData(imageData);
    }

    constructor(imageData) {
        this.#imageData = imageData.data;
    }

    colors() {
	const colors = [];

        for(let i = 0; i < this.#imageData.length; i += 4) {
            colors.push(new Color(
                this.#imageData[i],
                this.#imageData[i + 1],
                this.#imageData[i + 2],
                this.#imageData[i + 3],
            ));
        }

        return colors;
    }
}
