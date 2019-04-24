'use strict';

const Hapi = require('hapi'),
    routes = require('./lib/routes'),
    inert = require('inert'),
    vision = require('vision'),
    hapiSwagger = require('hapi-swagger'),
    Pack = require('../package');


let host = process.env.VCAP_APP_HOST || 'localhost';
let port = process.env.PORT || 1338;
let swaggerHost =  `${host}:${port}` ;
//let swaggerHost = process.env.VCAP_APP_HOST ? 'interview-project.ldschurch.org' :`${host}:${port}` ;


const server = Hapi.Server({
    host: host,
    port: port,
    routes:{
        cors:true
    }
   
});
const swaggerOptions = {
    info: {
            'title': 'SDET Interview Test',
            'version': Pack.version,
            
 
        },
    host: swaggerHost,
    basePath: '/',
    documentationPath: '/'
    };



server.route(routes);

const init = async () => {
    await server.register([
        inert,
        vision,
        {
            plugin: hapiSwagger,
            options: swaggerOptions
        }
        // {
        // plugin: require('hapi-pino'),
        // options: {
        //     prettyPrint: true,
        //     }
        // }
    ]);
    
    await server.start();
    console.log(`Server running at: ${server.info.uri} `+ `(${swaggerHost})`);

};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();
