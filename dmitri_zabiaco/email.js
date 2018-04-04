var nodemailer = require('nodemailer');
var readEmails = require('./readfile.js');
var moment = require('moment');
module.exports = class Email {
    
    createEmail(to="dmitri.delta@gmail.com", html = 'HTML'){
        const self = this;
        nodemailer.createTestAccount((err, account) => {
            
            let transporter = nodemailer.createTransport({
                
                service:'gmail',
                auth: {
                    user: 'dmitri.delta@gmail.com',
                    pass: 'pavlino999' 
                }
            });
        
           
            let mailOptions = {
                from: '"👻" <dmitri.delta@gmail.com>', 
                to: to, 
                subject: 'Weather forecast for today ✔', 
                html: html 
            };
        
            
            transporter.sendMail(mailOptions, (error, info) => {
                moment.locale('ro');
                var status = true;
                if (error) {
                    status = false;
                }
                
                const e = info.accepted;
                const accepted = [];
                for (var i=0; i<e.length; i++){
                    accepted.push({'email':e[i], 'status': status, 'date': moment().format('DD MM YYYY HH:MM:SS')})
                } 
                const read = new readEmails();
                const emails = read.insert(accepted);
            });
        });
    }
    insertToFile(emails, status){
        console.log(status);
        const accepted = [];
        for (var i=0; i<e.length; i++){
            accepted.push({'email':e[i], 'status': status, 'date': '12.12.2018'})
        } 
        const read = new readEmails();
        const emails = read.insert(accepted);
    }
    
}

