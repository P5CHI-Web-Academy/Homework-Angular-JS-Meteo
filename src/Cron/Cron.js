const CronJob = require('cron').CronJob;
const wheater = require('../WheaterAPI/api');
const emails = require('../SendMail/MailList');
const pathToSend  = '/home/mihai/Documents/Homework-Angular-JS-Meteo/config.json';
const pathSends = '/home/mihai/Documents/Homework-Angular-JS-Meteo/src/EmailSends/emails.json';
const mail = require('../SendMail/SendMail');


const isEmpty = obj =>  {
  return Object.keys(obj).length === 0;
}

const job = new CronJob({
  cronTime: '*/10 * * * * *',
  onTick: function() {
    emails.readFile(pathToSend)
    .then(email => { 
        (!isEmpty(email)) ? console.log('Succes') : console.log('Email list is empty');
           wheater()
                .then(wheater => {
                    if(!isEmpty(wheater))
                    emails.readSendEmails(pathSends)
                         .then(sends => {

                                mail.sendMessage(email, wheater, sends); 
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
  },
  start: true,
  timezone: 'Eastern European Summer Time'
});

module.exports = job;