const meteo = require("./get-meteo-data.js");
const email = require("./mail-sender.js");
const fs = require('fs');
const moment = require('moment');

const rawEmailsList = fs.readFileSync('./src/mails.json');
var exports = module.exports = {};

let emailsObj = JSON.parse(rawEmailsList)

exports.runApp = function() {
  let emails = []

  for(key in emailsObj){
    if(emailsObj[key] !== moment().format('DD MM YYYY')){
      emails.push(key)
    }
  }

  if(emails.length > 0){
    meteo.getMeteoData().then((meteoResult) => {
      email.transporter.sendMail(email.mailOptions(meteoResult.data, emails), function(error, info){
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent to ' + emails + ' ' + info.response);
            emails.forEach( (email) => {
              emailsObj[email] = moment().format('DD MM YYYY')
            })
            fs.writeFileSync('./src/mails.json', JSON.stringify(emailsObj));
          }
        })
    })
  }
}