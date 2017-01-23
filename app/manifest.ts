import {Game}  from './game/game';
import {Api} from './api/api'

import CubicGrid from './elements/cubic-grid';
import Grid from './elements/grid';

var css     = require("!raw-loader!sass-loader!./file.scss");


console.log(css)
function getHeightData(img) {
    let canvas = document.createElement( 'canvas' );
    canvas.width = 128;
    canvas.height = 128;
    let context = canvas.getContext( '2d' );

    let size = 128 * 128, data = new Float32Array( size );

    context.drawImage(img,0,0);

    for ( let i = 0; i < size; i ++ ) {
        data[i] = 0
    }

    let imgd = context.getImageData(0, 0, 128, 128);
    let pix = imgd.data;

    let j=0;
    for (let i = 0, n = pix.length; i < n; i += (4)) {
        let all = pix[i]+pix[i+1]+pix[i+2];
        data[j++] = all/30;
    }

    return data;
}

// terrain
var img = new Image();
img.onload = function () {
    var data = getHeightData(img);

    // plane
    plane = new Plane( 100, 100, 127, 127 );

    for ( var i = 0, l = plane.vertices.length; i < l; i++ ) {
        plane.vertices[i].position.z = data[i];
    }

    // Что это за хуйня? Оо  - PLANE

};
img.src = require("./assets/heightmap/heightmap_128.jpg");


// import Cloud from './resources/cloud/cloud';

// import FirTree from './resources/tree/fir-tree';


// var dataRequest = {
//     url: 'example/data-names.json',
//     method: 'GET',
//     statusAcceptence: [200, 201, 204],
//     headers: [
//         {
//             name: 'Content-Type',
//             value: 'application/json'
//         }
//     ]
// };
//
// Api.request(dataRequest).then(
//     function(res){
//         console.log(res);
//     },
//     function(err){
//         console.log(err);
//     }
// );

window.onload = function() {

    let settings  = {
        camera: {
            d: 50
        }
    }

    Game.init(settings);

    // Game.component(Cloud);
    // Game.component(FirTree);
    Game.component(CubicGrid);
    Game.component(Grid);

};