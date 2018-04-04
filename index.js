var request = require('request');
request('https://api.apixu.com/v1/current.json?key=ab345132ce31424999e205857180204&q=Chisinau', 
	function (error, response, body) {
	  console.log('error:', error); // Print the error if one occurred
	  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
	  console.log('body:', body); // Print the HTML for the Google homepage.
});