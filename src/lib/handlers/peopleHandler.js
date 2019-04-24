'use strict';

const service = require('../services/jsonDataService'),
    joi = require('joi'),
    logger = require('pino')();


const getAllPeople = () => {
    return service.getJSONDataFile('people');
}



const getRange = async (request, h) => {
    try {
        let data = await getAllPeople()
        let clone = JSON.parse(JSON.stringify(data));
        let response = clone.filter(item => {
            if (item.id >= request.query.fromId && item.id <= request.query.toId) {
                return true;
            }
            else {
                return false;
            }
        })
        return h.response(response);
    }
    catch (error) {
        logger.error(error);
        throw new Error(error);
    }
}

const searchByName = async (request, h) => {
    try {
        let data = await getAllPeople()
        let clone = JSON.parse(JSON.stringify(data));
        let response = clone.filter(item => {
            if (item.firstName.toLowerCase().includes(request.query.firstName.toLowerCase()) && item.lastName.toLowerCase().includes(request.query.lastName.toLowerCase())) {
                return true;
            }
            else {
                return false;
            }
        })
        return h.response(response);
    }
    catch (error) {
        logger.error(error);
        throw new Error(error);
    }
}

const getPersonByEmail = async (request, h) => {
    try {
        let data = await getAllPeople()
        let clone = JSON.parse(JSON.stringify(data));
        let response = clone.find(item => item.email.toLowerCase() === request.params.email.toLowerCase())
        return h.response(response);
    }
    catch (error) {
        logger.error(error);
        throw new Error(error);
    }
}

const getPeopleByState = async (request, h) => {
    try {
        let data = await getAllPeople()
        let clone = JSON.parse(JSON.stringify(data));
        let response = clone.find(item => item.state.toLowerCase() === request.params.state.toLowerCase())
        return h.response(response);
    }
    catch (error) {
        logger.error(error);
        throw new Error(error);
    }
}

const savePerson = async (request, h) => {
    try {
        let data = await getAllPeople()
        let clone = JSON.parse(JSON.stringify(data));
        let response = clone.find(item => item.state.toLowerCase() === request.params.state.toLowerCase())
        return h.response(request.payload);
    }
    catch (error) {
        logger.error(error);
        throw new Error(error);
    }
}

module.exports = {
    getRange: {
        handler: getRange,
        description: 'Gets people by id in a range',
        notes: 'Gets people by id in a range',
        tags: ['api', 'people'],
        validate: {
            query: {
                fromId: joi.required().description('start of the range'),
                toId: joi.required().description('end of the range'),

            }
        }
    },
    getPersonByEmail: {
        handler: getPersonByEmail,
        description: 'Gets a person by email',
        notes: 'Gets a person by email',
        tags: ['api', 'people'],
        validate: {
            params: {
                email: joi.required().description('email of person')


            }
        }
    },
    searchByName: {
        handler: searchByName,
        description: 'Search for people by name',
        notes: 'Search for people by name',
        tags: ['api', 'people'],
        validate: {
            query: {
                firstName: joi.required().description('First name of person'),
                lastName: joi.required().description('Last name of person'),

            }
        }
    },
    getPeopleByState: {
        handler: getPeopleByState,
        description: 'Gets people by State',
        notes: 'Gets people by State',
        tags: ['api', 'people'],
        validate: {
            params: {
                state: joi.required().description('state of USA')


            }
        }
    },
    savePerson: {
        handler: savePerson,
        description: 'Gets people by State',
        notes: 'Gets people by State',
        tags: ['api', 'people'],
        validate: {
            payload: {
                "firstName": joi.required().description('First Name'),
                "lastName": joi.required().description('Last Name'),
                "email": joi.required().description('Email'),
                "gender": joi.required().description('Gender'),
                "country": joi.required().description('Country'),
                "state": joi.required().description('State of the USA'),
            }
        }
    },
};