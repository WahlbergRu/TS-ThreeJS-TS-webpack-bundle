/**
 * Created by allin_000 on 22.01.2017.
 */
'use strict'

const path        = require('path');
const webpack     = require('webpack');
const Manifest    = require('manifest-revision-webpack-plugin');
const TextPlugin  = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin  = require('html-webpack-plugin');

module.exports = function(_path) {
    //define local variables
    let dependencies  = Object.keys(require(_path + '/package').dependencies);
    let rootAssetPath = _path + 'app';

    return {
        // точки входа
        entry: {
            application: _path + '/app/manifest.ts',
            vendors: dependencies
        },

        // то, что получим на выходе
        output: {
            filename: 'dist/assets/js/[name].bundle.[chunkhash].js',
            chunkFilename: '[id].bundle.[chunkhash].js',
            publicPath: '/'
        },

        // Небольшие настройки связанные с тем, где искать сторонние библиотеки
        resolve: {
            extensions: ['', '.webpack.js', '.web.js', '.ts', '.js', '.scss', '.css'],
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
                    test: /\.js?$/,
                    loader: 'babel-loader',
                    exclude: '/node_modules/',
                    query: {
                        presets: ['es2015']
                    }
                },
                {
                    // Row loader to load html as inline templates.
                    test: /\.html$/,
                    loader: 'raw',
                    exclude: '/node_modules/'
                },
                {
                    test: /\.ts?$/,
                    loader: 'ts-loader'
                },
                {
                    test: /\.json?$/,
                    loader: 'json-loader'
                },
                {
                    test: /\.(css|ttf|eot|woff|woff2|png|ico|jpg|jpeg|gif|svg)$/i,
                    loaders: ['file?context=' + rootAssetPath + '&name=assets/static/[ext]/[name].[hash].[ext]']
                },
                {
                    test: /\.scss$/,
                    loaders: ["style-loader", "css-loader", "sass-loader"]
                }
            ],
        },

        target: 'web',

        // загружаем плагины
        plugins: [
            new webpack.optimize.CommonsChunkPlugin('vendors', 'dist/assets/js/vendors.[hash].js'),
            new HtmlWebpackPlugin({
                // Required
                inject: false,
                template: require('html-webpack-template'),
                // template: 'node_modules/html-webpack-template/index.ejs',

                // Optional
                appMountId: 'app',
                baseHref: '/',
                devServer: 'http://localhost:8080',
                meta: [
                    {
                        name: 'description',
                        content: 'true RPG'
                    }
                ],
                filename: 'dist/index.html',
                mobile: true,
                inlineManifestWebpackName: 'webpackManifest',
                scripts: [],
                title: 'Adventure',
                // window: {
                //     env: {
                //         apiHost: 'http://myapi.com/api/v1'
                //     }
                // }

                // And any other config options from html-webpack-plugin:
                // https://github.com/ampedandwired/html-webpack-plugin#configuration
            })
        ]
    }
};