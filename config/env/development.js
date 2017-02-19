'use strict';

/**
 * Development config
 */
module.exports = function(_path) {

    return {
        context: _path,
        debug: true,
        devtool: 'source-map',
        devServer: {
            contentBase: './dist',
            info: true,
            hot: true,
            inline: true
        }
    }
};