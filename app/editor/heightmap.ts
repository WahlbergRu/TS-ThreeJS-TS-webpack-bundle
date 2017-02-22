import * as THREE from 'three';

export class HeightMap{

    public plane: THREE.Plane;

    constructor(){
        // terrain
        let img: any = new Image();

        img.src = require("../assets/images/heightmap/heightmap_128.jpg");

        img.onload = () => {

            let data = this.getHeightData(img);

            console.log(data);

            // // plane
            // this.plane = new THREE.Plane(100, 100, 127, 127);
            //
            // for (let i = 0, l = this.plane.vertices.length; i < l; i++) {
            //     this.plane.vertices[i].position.z = data[i];
            // }
            return data;

        };


    }

    public getHeightData(img:HTMLImageElement) {
        let canvas = document.createElement('canvas');
        canvas.width = 128;
        canvas.height = 128;
        let context = canvas.getContext('2d');

        let size = 128 * 128,
            data = new Float32Array(size);

        context.drawImage(img, 0, 0);

        for (let i = 0; i < size; i++) {
            data[i] = 0
        }

        let pix = context.getImageData(0, 0, 128, 128).data;

        let j = 0;
        for (let i = 0, n = pix.length; i < n; i += (4)) {
            let all = pix[i] + pix[i + 1] + pix[i + 2];
            data[j++] = all / 30;
        }

        return data;
    }

}