export class HeightMap{

    constructor(){}

    public parseImageToGeo(img:HTMLImageElement){
        return new Promise((resolve, reject) => {
            img.onload = () => {
                let data = this.getGeoHeight(img);
                resolve(data);
            };
        });
    }

    /**
     *
     * @param img
     * @returns {Array of Array of numbers}
     */
    public getGeoHeight(img:HTMLImageElement):Array<Array<number>> {
        let canvas = document.createElement('canvas');
        canvas.width  = img.width;
        canvas.height = img.height;

        let context = canvas.getContext('2d');
            context.drawImage(img, 0, 0);

        let pix = context.getImageData(0, 0, img.width, img.height).data,
            coordinates = [];

        for (let i = 0, n = pix.length; i < n; i += (4)) {
            coordinates.push([pix[i], pix[i+1], pix[i+2]]);
        }

        return coordinates;
    }

}