let request = require('request');
let date = require('./date');

function getMessage(callback) {

    let apiKey = 'f32fcf9720ff1dc07b95529ca44289c1';
    let city = 'chisinau';
    let url = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`

    request(url, function (err, response, body) {
        if (err) {
            console.log('error:', error);
        } else {

            let weather = JSON.parse(body);
            let tomorrowForecast = weather.list
                .filter(el => el.dt * 1000 >= date.nextDayStart().valueOf()
                    && el.dt * 1000 <= date.nextDayEnd().valueOf());

            let options = { hour: 'numeric', minute: 'numeric' };
            let temperatures = tomorrowForecast
                .map(el => (new Date(el.dt * 1000)).toLocaleDateString('ro-RO', options).split(' ')[1]
                    + ' - ' + el.main.temp + ' °C');

            let message = temperatures.join('\n');
            callback(message);
        }
    });
}
exports.getMessage = getMessage;

