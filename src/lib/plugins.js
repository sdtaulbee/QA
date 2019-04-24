'use strict';

const config = require('../config');
const Inert = require('inert');
const Vision = require('vision');

let plugins = module.exports = [];


// this is where all reusable service methods are defined.
let servicePlugins = (server, options, next) => {
    return next();
};

servicePlugins.attributes = {
    name: 'service-methods',
    version: '1.0.0'
};

if (config.options.LOG_REQUESTS) {
        plugins.push({
        register: require('./plugins/pino')
    });
}

plugins.push({
    register: servicePlugins
});

if(process.env.SWAGGER_PROTOCOL){
    config.swagger.schema = [process.env.SWAGGER_PROTOCOL];
}

plugins.push(require('hapi-accept-language'));
plugins.push(Inert);
plugins.push(Vision);
plugins.push({
    register: require('hapi-swagger'),
    options: config.swagger
});
