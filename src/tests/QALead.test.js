const
    assert = require('chai').assert,
    fork = require('child_process').fork,
    validator = require('jsonschema').Validator,
    peopleSchema = require('./schema/people'),
    api = require('./helpers/api-helper');


    describe('QA Lead Test Assignment', function(){
        this.timeout(10000);
      
    
        describe("/searchByName", () => {
    
            it('Returns valid data for sample person', async () => {
                const happyPath = await api.getRequest("/searchByName?firstName=Pern&lastName=Jeck");

                //should return one entry, with fixed id.  Could be issue if this name disappears
                assert.equal(happyPath.length,1);
                assert.equal(happyPath[0].id,11);
            });

            it('Checks people schema', async () => {
                const s = await api.getRequest("/searchByName?firstName=Pern&lastName=Jeck");

                let val = new validator();
                let result = val.validate(s, peopleSchema);
                 assert.isTrue(result.valid,JSON.stringify(result.errors, null,4));
            });
            
            it('Checks for empty array with known unmatched data', async () => {
                const actual = await api.getRequest("/searchByName?firstName=xxxx&lastName=yyyy");

                assert.deepEqual(actual,[]);
            });
            it('Checks for empty array with firstName == null', async () => {
                const actual = await api.getRequest("/searchByName?firstName=&lastName=Jeck");
                
                //Swagger requires an entry for first and last names.  This api test fails because data is returned.  Bug in the API or the Swagger contract
                assert.deepEqual(actual,[]);
            });
            

            it('Checks for empty array with lastName == null', async () => {
                const actual = await api.getRequest("/searchByName?firstName=Pern&lastName=");

                //Swagger requires an entry for first and last names.  This api test fails because data is returned.  Bug in the API or the Swagger contract
                assert.deepEqual(actual,[]);
            });

            it('Checks for empty array with lastName == null and firstName == null', async () => {
                const actual = await api.getRequest("/searchByName?firstName=&lastName=");
                
                //Swagger requires an entry for first and last names.  This api test fails because data is returned (all entries).  Bug in the API or the Swagger contract
                assert.equal(actual.length,0);
            });
            it('Checks for empty array with lastName == " <double quote> and firstName == <single quote>', async () => {
                const actual = await api.getRequest("/searchByName?firstName='&lastName=%22");
                
                //Swagger returns an empty array with firstName == ' <single quote> and lastName == " <double quote, which is converted to %22.  
                assert.equal(actual.length,0);
            });

            it('Checks for unlisted Parameter returning 400 status', async () => {
                const actual = await api.getRequest("/searchByName?firstName=Pern&lastName=Jeck&middleName=");

                //should return bad request for using an unlisted parameter  
                assert.equal(actual.statusCode,400);
            });

            it('Checks for no Parameters returning error status', async () => {
                const actual = await api.getRequest("/searchByName");
                
                //should return undefined when excluding parameters 
                assert.equal(actual.statusCode,400);
            });
        });
        
        after((done) => {
    
            done();
        });
    });