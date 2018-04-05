let nodemailer = require('nodemailer');
let fs = require('fs');
let date = require('./date');

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function sendMsg(message) {
    let clients = JSON.parse(fs.readFileSync('config.json').toString());
    let outdated = clients.filter(el => el.lastDate != date.nextDateStr() && validateEmail(el.email)).map(el => el.email);

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: '***@gmail.com',
            pass: '***'
        }
    });

    message = '<p>' + message.split('\n').join('<br>') + '</p>';

    var mailOptions = {
        from: 'meteo@meteo.meteo', // sender address
        to: outdated.join(', '), // list of receivers
        subject: 'Daily forecasts', // Subject line
        html: message
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error.message);
        }
        else {
            console.log('Message sent: ' + info.response);
        }
    });

    clients.forEach(el => {
        if (outdated.includes(el.email)) {
            el['lastDate'] = date.nextDateStr();
        }
    });

    fs.writeFile('config.json', JSON.stringify(clients), (error) => {
        if (error) {
            console.log(error);
        }
    });
}

exports.sendMsg = sendMsg;