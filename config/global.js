/**
 * Created by allin_000 on 22.01.2017.
 */
'use strict'

var path        = require('path');
var webpack     = require('webpack');
var Manifest    = require('manifest-revision-webpack-plugin');
var TextPlugin  = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin  = require('html-webpack-plugin');

module.exports = function(_path) {
    //define local variables
    var dependencies  = Object.keys(require(_path + '/package').dependencies);
    var rootAssetPath = _path + 'app';

    return {
        // точки входа
        entry: {
            application: _path + '/app/manifest.ts',
            vendors: dependencies
        },

        // то, что получим на выходе
        output: {
            path: path.join(_path, 'dist'),
            filename: path.join('assets', 'js', '[name].bundle.[chunkhash].js'),
            chunkFilename: '[id].bundle.[chunkhash].js',
            publicPath: '/'
        },

        // Небольшие настройки связанные с тем, где искать сторонние библиотеки
        resolve: {
            extensions: ['', '.js', '.ts'],
            modulesDirectories: ['node_modules'],
            // Алиасы - очень важный инструмент для определения области видимости ex. require('_modules/test/index')
            alias: {
                _svg:         path.join(_path, 'app', 'assets', 'svg'),
                _data:        path.join(_path, 'app', 'data'),
                _fonts:       path.join(_path, 'app', 'assets', 'fonts'),
                _modules:     path.join(_path, 'app', 'modules'),
                _images:      path.join(_path, 'app', 'assets', 'images'),
                _stylesheets: path.join(_path, 'app', 'assets', 'stylesheets'),
                _templates:   path.join(_path, 'app', 'assets', 'templates')
            }
        },
        // Настройка загрузчиков, они выполняют роль обработчика исходного файла в конечный
        module: {
            loaders: [
                {
                    test: /\.ts?$/,
                    loader: 'ts-loader'
                },
                {
                    // Row loader to load html as inline templates.
                    test: /\.html$/,
                    loader: 'raw',
                    exclude: '/node_modules/'
                },
                {
                    test: /\.scss$/,
                    loaders: ["style-loader", "css-loader", "sass-loader"]
                },
                { test: /\.jade$/, loader: 'jade-loader' },
                { test: /\.(css|ttf|eot|woff|woff2|png|ico|jpg|jpeg|gif|svg)$/i, loaders: ['file?context=' + rootAssetPath + '&name=assets/static/[ext]/[name].[hash].[ext]'] },
            ]
        },

        // загружаем плагины
        plugins: [
            new webpack.optimize.CommonsChunkPlugin('vendors', 'assets/js/vendors.[hash].js'),
            new Manifest(path.join(_path + '/config', 'manifest.json'), {
                rootAssetPath: rootAssetPath
            }),
            // Этот файл будет являться "корневым" index.template.html
            new HtmlWebpackPlugin({
                title: 'ThreeJS, TS - webpack bundle',
                chunks: ['application', 'vendors'],
                template: path.join(_path, 'app', 'index.ejs'),
                baseHref: '/',
            })
        ]
    }
};