const express = require('express')
const app = express()
const main = require('./src/main.js')
const CronJob = require('cron').CronJob;

app.get('/', (req, res) => {
    res.send('App')
    const job = new CronJob({
      cronTime: '* */4 * * *',
      onTick: function() {
        main.runApp();
      },
      start: true,
      timeZone: 'Europe/Chisinau'
    });
})

app.listen(3000, () => console.log('App listening on port 3000!'))