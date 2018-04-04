var fs = require('fs');

module.exports = class ReadEmails {
    constructor(){
        this.obj = JSON.parse(fs.readFileSync('config.json','utf-8'));
    }
    getEmails(){
        return this.obj;
    }
    insert(emails = []){
        console.log(emails);
        fs.writeFile('config.json', JSON.stringify(emails) ,function(err){
            console.log(err);
        }); 
    }
}


