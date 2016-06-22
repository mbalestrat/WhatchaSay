var outputAreaRef = document.getElementById("outputArea");
var gotText;
var gotSentiment;
var sentiment;
var script;


function buttonHit() {
    gotText = text.value;
    gotSentiment = jsonpRequest(gotText);
    sentiment = JSON.parse(gotSentiment);
}


function jsonpRequest(data) {
    var APIKEY = "5247ac4d4d28493eb85addb968cbc07d";
    var params = "https://api.dandelion.eu/datatxt/sent/v1/?lang=en&text=";
    params += data;

    params += "&token=";
    params += APIKEY;
    params += "&callback=callBack";

    script = document.createElement('script');
    script.src = params;
    document.body.appendChild(script);
    return script.src;
}

function callBack(response) {

    var result = response.sentiment;

    sentimentScore = response.sentiment.score;
    sentimentType = response.sentiment.type;

    document.body.appendChild(script);
    outputToPage(sentimentScore, sentimentType);

    //callback(WeatherForecast);
};

function outputToPage(sentimentScore, sentimentType) {

    var newOut = "<p><strong>Here's what we think:</strong> <br>";
    newOut += "This person's tone seems " + sentimentType + ". <br>";
    newOut += "On a rating of -10 to 10 (with 10 being very friendly) <br>"
    newOut += "We'd say this person's tone rates " + sentimentScore + "</p>";

    outputAreaRef.innerHTML = newOut;

}