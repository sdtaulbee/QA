'use strict';

const apiHandler = require('./handlers/api-handler');
const peopleHandler = require('./handlers/peopleHandler');



let routes = [
    {method: 'GET',     path: '/api-info',    config: apiHandler.getInfo},
    {method: 'GET',     path: '/getPeople',    config: peopleHandler.getRange},
    {method: 'GET',     path: '/getPersonByEmail/{email}',    config: peopleHandler.getPersonByEmail},
    {method: 'GET',     path: '/searchByName',    config: peopleHandler.searchByName},
    {method: 'GET',     path: '/getPeopleByState/{state}',    config: peopleHandler.getPeopleByState},
    {method: 'POST',     path: '/savePerson',    config: peopleHandler.savePerson},



];

module.exports = routes;