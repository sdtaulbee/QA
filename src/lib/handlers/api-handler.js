'use strict';

const getInfo = async(request, h) => {

        const packageJsonPath = require('app-root-path').resolve('/package.json');
        let packageJson = packageJsonPath ? require(packageJsonPath) : {};
        let version = packageJson.version || '';
        let name = packageJson.name || '';


    return h.response({
        service: name,
        version: version
    });
};

module.exports = {
    getInfo: {
        handler: getInfo,
        description: 'Gets the current version of the API',
        notes: 'Gets the current version of the API',
        tags: ['api']
    }
};