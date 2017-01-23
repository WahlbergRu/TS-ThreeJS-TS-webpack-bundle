'use strict';

/**
 * Production config
 */
module.exports = function(_path) {
    return {
        context: _path,
        debug: false,
        devtool: 'cheap-source-map',
        output: {
            publicPath: '/'
        }
    }
}