import * as THREE from 'three';

export class HeightMap{

    constructor(){
        // terrain
        let img = new Image();
        let plane;

        img.onload = function () {
            let data = this.getHeightData(img);

            // plane
            plane = new THREE.Plane(100, 100, 127, 127);

            for (let i = 0, l = plane.vertices.length; i < l; i++) {
                plane.vertices[i].position.z = data[i];
            }

            // Что это за хуйня? Оо  - PLANE

        };

        img.src = require("./assets/images/heightmap/heightmap_128.jpg");

    }

    public getHeightData(img) {
        let canvas = document.createElement('canvas');
        canvas.width = 128;
        canvas.height = 128;
        let context = canvas.getContext('2d');

        let size = 128 * 128, data = new Float32Array(size);

        context.drawImage(img, 0, 0);

        for (let i = 0; i < size; i++) {
            data[i] = 0
        }

        let imgd = context.getImageData(0, 0, 128, 128);
        let pix = imgd.data;

        let j = 0;
        for (let i = 0, n = pix.length; i < n; i += (4)) {
            let all = pix[i] + pix[i + 1] + pix[i + 2];
            data[j++] = all / 30;
        }

        return data;
    }

}