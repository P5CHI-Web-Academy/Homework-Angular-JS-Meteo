const fs  = require('fs');

/**Read file in the desktop**/
const readFile = (path, opts = 'utf8') => 
    new Promise((res, rej) => {
        fs.readFile(path, opts, (err, data) => {
            if (err)
              rej(err)
             else
              res(data)
        })
    })

/**Write file in EmailsSends: emails.json**/
const writeFile = (path, sendEmail) => 
    new Promise((res, rej) => {
        fs.writeFile(path, sendEmail, (err, data) => {
            if (err)
                rej(err)
             else
                res(data)
        })
    })

const readSendEmails = (path, opts = 'utf8') => 
    new Promise((res, rej) => {
        fs.readFile(path, opts, (err, data) => {
            if (err)
              rej(err)
             else
              res(data)
        })
    })
    
module.exports = {
    readFile,
    writeFile,
    readSendEmails
}