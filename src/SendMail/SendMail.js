const nodemailer = require('nodemailer');
const emails = require('../SendMail/MailList');
const pathSends = '/home/mihai/Documents/Homework-Angular-JS-Meteo/src/EmailSends/emails.json';

exports.sendMessage = (email, wheater, sends) => {

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
                user: 'enter your existing gmail',
                pass: 'enter your existing password' 
            }
    });
    

    for(let i in emailsInfo.emails) {
    
        if(!emailSents.includes(i)) {

            let mailOptions = {
                from: '"Enter your name" <enter your existing email', 
                to: i,
                subject: 'Wheater in Moldova/Chisinau',
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