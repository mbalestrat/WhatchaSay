var outputAreaRef = document.getElementById("outputArea");
var gotText;
var gotSentiment;
var sentiment;
var script;
var qualifier;


function buttonHit() {
    gotText = text.value;
    gotText = gotText.replace(/[`~!@#$%^&*()_|+\-=?;:'".<>\{\}\[\]\\\/]/gi, '');

    if (gotText == null || gotText == undefined || gotText == "") {
        outputAreaRef.innerHTML = "<p><strong>Please enter some text!</strong></p>";
    } else {
        gotSentiment = jsonpRequest(gotText);
        sentiment = JSON.parse(gotSentiment);
    }
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

    if (sentimentScore <= -0.5 || sentimentScore > 0.5) {
        qualifier = "very";
    } else if (sentimentScore >= -0.4 && sentimentScore <= 0) {
        qualifier = "slightly";
    } else if (sentimentScore <= 0.5) {
        qualifier = "quite";
    }

    document.body.appendChild(script);
    outputToPage(qualifier, sentimentType);
};

function outputToPage(qualifier, sentimentType) {

    var newOut = "<p><strong>Here's what we think:</strong> <br>";
    newOut += "This person's tone seems " + qualifier + " " + sentimentType + ". <br>";

    outputAreaRef.innerHTML = newOut;

}