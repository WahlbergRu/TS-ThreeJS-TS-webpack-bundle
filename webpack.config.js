var webpack = require('webpack');
module.exports = {
    entry: './app/manifest.ts',
    output: {
        path: __dirname + '/dist',
        filename: 'bundle.js'
    },
    // Turn on sourcemaps
    devtool: 'eval-source-map',
    resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.js']
    },
    // Add minification
    plugins: [
        new webpack.optimize.UglifyJsPlugin()
    ],
    module: {
        loaders: [
            {
                test: /\.ts?$/,
                loader: 'webpack-typescript?target=ES5'
            }
        ]
    }
}