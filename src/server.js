const express = require('express');
const bodyParser = require('body-parser');
const SendEmail = require('./SendMail/SendMail');

const app = express();

app.listen(3000, () => {
    console.log('Server Started');
})

module.exports = app;