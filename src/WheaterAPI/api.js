const axios = require("axios");

const getMeteoData= async () => {
        try {
           const meteoResult = await axios.get("http://api.apixu.com/v1/current.json?key=72d521d39e654a07b32170404183103&q=Chisinau");
             return meteoResult.data;
        }
        catch (error) {
            console.log("Error while getting meteo data: ", error); 
        }
}

module.exports = getMeteoData;
