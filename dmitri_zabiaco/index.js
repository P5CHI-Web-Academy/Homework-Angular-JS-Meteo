var _ = require('lodash');
const request= require('request');
const http = require('http');
const email = require('./email.js');
var cron = require('node-cron');
var readEmails = require('./readfile.js');
var fs = require('fs');
var express =require('express');

var app = express();




class BaseModel{
    constructor(url){
        this.url=url;
    }

    getData(){
        request({
            url:this.url,
            json:true
        },(error,response,body)=>{
            const html = `Weather today in ${body.location.name} ${body.location.country} is: <br> ${body.current.temp_c} and will be ${body.current.condition.text}`;
            const read = new readEmails();
            const emails = read.getEmails();
            const to = _.map(emails, 'email').join(',');
            const sendEmail = new email();
            sendEmail.createEmail(to,html);            
        });
    }

    sendRequests(){
        const self = this;
        const task = cron.schedule('0 12 * * *', function() {
            self.getData();
            console.log('start sending emails');
        }, false);
        task.start();
    }

}

const base= new BaseModel('https://api.apixu.com/v1/current.json?key=040d38db6ee94cc691f90101180104&q=Chisinau');
base.sendRequests();


 app.get('/',function(req,res){
   res.send(JSON.parse(fs.readFileSync('config.json','utf-8')));
    //base.sendRequests();
 });

 app.listen(3000, function(){
     
     base.sendRequests();
 });








