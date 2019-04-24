'use strict';

const config = require('../config'),
    request = require('request'),
    api = config.api;
    

let options = {};
options.headers =  {...api.headers};

function getRequest(uri) {
    options.url = api.root + uri;
    options.method = 'GET';
    return new Promise (function (res, rej){
        request(options, function (error, response, body) {
            if (!error && response.statusCode < 500) {
                try {
                    var info = JSON.parse(body);
                } catch (error) {
                    throw (error);
                }
            res(info);
            }
        });
    });
}

function deleteRequest(uri) {
    options.url = api.root + uri;
    options.method = 'DELETE';
    return new Promise (function (res, rej){
        request(options, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                try {
                    var info = JSON.parse(body);
                } catch (error) {
                    throw (error);
                }
            res(info);
            }
        });
    });
}

module.exports={
    getRequest,
    deleteRequest
};