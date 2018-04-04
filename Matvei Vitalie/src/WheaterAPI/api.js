const axios = require("axios");

const getMeteoData = async() => {
    try {
        const meteoResult = await axios.get("http://api.openweathermap.org/data/2.5/weather?q=Chisinau&appid=272e0582a4e6ab8cebacdf410c5184ac&units=metric");
        return meteoResult.data;
    } catch (error) {
        console.log("Error while getting meteo data: ", error);
    }
}

module.exports = getMeteoData;