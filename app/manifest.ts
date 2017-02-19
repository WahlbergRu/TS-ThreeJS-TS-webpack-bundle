import {Game}  from './game/game';
// import {Api} from './api/api'

// import {CubicGrid} from './elements/cubic-grid';
// import {Grid}      from './elements/grid';

// var css = require("!loader!sass-loader!./index.scss");

// console.log(css);

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

let Core = new Game;

window.onload = function() {

    let settings  = {
        camera: {
            d: 50
        }
    }
    // main logic/render loop
    function animation() {
        window.requestAnimationFrame( animation );
        Core.update();
    }

    Core.init(settings);
};