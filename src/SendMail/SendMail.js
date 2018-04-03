const nodemailer = require('nodemailer');
const wheater = require('../WheaterAPI/api');
const emails = require('./MailList');
const pathToSend  = '/home/mihai/Documents/GitHub/Homework-Angular-JS-Meteo/config.json';
const pathSends = '/home/mihai/Documents/GitHub/Homework-Angular-JS-Meteo/src/EmailSends/emails.json';

const isEmpty = obj =>  {
    return Object.keys(obj).length === 0;
}

emails.readFile(pathToSend)
    .then(email => { 
        (!isEmpty(email)) ? console.log('Succes') : console.log('Email list is empty');
           wheater()
                .then(wheater => {
                    if(!isEmpty(wheater))
                    emails.readSendEmails(pathSends)
                         .then(sends => {
                               return sendMessage(email, wheater, sends); 
                         })
                         .catch(err => {
                               console.log(err);
                        })
                        
                 })
                  .catch(err => {
                       console.log(err);
                  })
     })
     .catch(err => {
        console.log(err);
     })


const sendMessage = (email, wheater, sends) => {

    const emailSents = []; 
    let emailsInfo = {};
    const currentData = new Date();

    if(sends !== '') {
        const toSend = JSON.parse(sends);
        for(let i in toSend.emails) {
            emailSents.push(i);
        }
    }
     
     ((email !== '')) ? emailsInfo = JSON.parse(email) : emailsInfo = {};

    

    let transporter = nodemailer.createTransport({
            service: 'gmail',
            secure: false,
            port: 2525,
            auth: {
                user: 'undefiened.username@gmail.com',
                pass: 'test7777' 
            }
    });
    

    for(let i in emailsInfo.emails) {
    
        if(!emailSents.includes(i)) {

            let mailOptions = {
                from: '"Mihai Topala" <undefined.username@gmail.com>', 
                to: i,
                subject: 'Wheater in Chisinau',
                text: JSON.stringify(wheater)
            };

            emailsInfo.emails[i] = currentData;

            transporter.sendMail(mailOptions, (error, info) => {
                        if (error) { 
                            return console.log(error);
                        } 
                        console.log('Message sent succesyfull!!!');
                        
                        emails.writeFile(pathSends, JSON.stringify(emailsInfo, null, 4))
                        .then(data => {
                            console.log('Email was write in file!');
                        })
                        .catch(err => {
                            console.log('Some problem to write in file!');
                        })
                        
            });

        }  else {
                console.log('Message to ' + i + ' was already sent!!!');
        } 
    }

}
  