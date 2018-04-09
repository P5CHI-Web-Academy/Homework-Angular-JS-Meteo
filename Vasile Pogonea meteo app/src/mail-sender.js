var nodemailer = require('nodemailer');
var exports = module.exports = {};

exports.transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'example@gmail.com',
      pass: 'PASSWORD'
    }
  });

  exports.mailOptions = function (data, emails){
    return {
      from: 'example@gmail.com',
      to: emails,
      subject: 'Meteo Info',
      html: `Today are ${data.current.condition.text}, ${data.current.temp_c}° Celsius`
    }
  }