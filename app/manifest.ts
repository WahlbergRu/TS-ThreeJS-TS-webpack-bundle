require("!style-loader!css-loader!sass-loader!./index.scss");

import {Game}  from './game/game';
// import {Api} from './api/api'

// import {CubicGrid} from './elements/cubic-grid';
// import {Grid}      from './elements/grid';

// var css = require("!loader!sass-loader!./index.scss");

// console.log(css);

// import Cloud from './resources/cloud/cloud';

// import FirTree from './resources/tree/fir-tree';




window.onload = function() {
    console.log('init');
    let Core = new Game();
    Core.settings = {
        camera: {
            d: 40
        }
    };
    Core.init();

};