'use strict';

const
    assert = require('chai').assert,
    fork = require('child_process').fork,
    validator = require('jsonschema').Validator,
    peopleSchema = require('./schema/people'),
    api = require('./helpers/api-helper');

let  apiUnderTest = null;

describe('People Endpoint API Tests', function(){
    this.timeout(10000);
  

    describe("General Tests", () => {

        it('Ensures the GetPeople Endpoint returns data when a range is supplied', async () => {
            const actual = await api.getRequest("/getPeople?fromId=0&toId=10");
           
            //should return 10 people from the API
            assert.deepEqual(actual.length,10);
       
        });

        it('Validates the resulting people json against a schema', async () => {
            const actual = await api.getRequest("/getPeople?fromId=0&toId=10");
           let val = new validator();
           let result = val.validate(actual, peopleSchema);
            assert.isTrue(result.valid,JSON.stringify(result.errors, null,4));
        });
    });
    
    after((done) => {

        done();
    });
});