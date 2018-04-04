const express = require('express');
const bodyParser = require('body-parser');
const cron = require('./Cron/Cron');

const app = express();

app.listen(3000, () => {
    console.log('Server Started');
})

module.exports = app;