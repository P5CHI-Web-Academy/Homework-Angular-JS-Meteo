var axios = require("axios");
var exports = module.exports = {};

exports.getMeteoData = function (){
  return new Promise( function( succes, reject ){
    try {
        var meteoResult = axios.get("http://api.apixu.com/v1/current.json?key=a5db5df4bf9a4289ac8194119182603&q=Chisinau");
        succes(meteoResult)
    }
    catch (error) {
        reject(error)
    }
  })
}