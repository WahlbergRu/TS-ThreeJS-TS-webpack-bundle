'use strict';

const _ = require('lodash');
const _configs = {
    global: require(__dirname + '/config/global'),
    production: require(__dirname + '/config/env/production'),
    development: require(__dirname + '/config/env/development')
};

const _load = function(environment) {
    // Проверяем окружение
    if (!environment) throw 'Can\'t find local environment variable via process.env.NODE_ENV';
    if (!_configs[environment]) throw 'Can\'t find environments see _config object';

    // load config file by environment
    return _configs && _.merge(
            _configs[environment](__dirname),
            _configs['global'](__dirname)
        );
};

/**
 * Export WebPack config
 * @type {[type]}
 */
module.exports = _load(process.env.NODE_ENV);
