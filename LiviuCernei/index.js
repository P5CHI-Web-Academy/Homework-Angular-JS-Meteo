let meteo = require('./meteo');
let date = require('./date');
let sender = require('./sender');
var CronJob = require('cron').CronJob;

new CronJob('0 */2 * * *', function () {    //every 2 hours: 0 */2 * * *
    meteo.getMessage((msg) => {
        sender.sendMsg(date.nextDateStr() + '\n' + msg);
    })

}, null, true, 'America/Los_Angeles');