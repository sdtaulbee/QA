const jsonfile = require('jsonfile');

let appData =[];

var path = require('path');
global.appRoot = path.dirname(require.main.filename);

module.exports={
    getJSONDataFile: (fileName)=>{
        return new Promise(resolve =>{
            if(appData[fileName] !== undefined){
                resolve(appData[fileName]);
            }
            else {
                let file = `${appRoot}/data/${fileName}.json`;
                try {
                    jsonfile.readFile(file, function (err, obj) {
                        appData[fileName] = obj;
                        resolve(appData[fileName]);
                    });
                }catch(err){
                    throw new Error(err);
                }
            }
        })
              
    }
};
