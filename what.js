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
};


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
};

function callBack(response) {

    var result = response.sentiment;
    var icon;

    sentimentScore = response.sentiment.score;
    sentimentType = response.sentiment.type;

    if (sentimentScore <= -0.5) {
        qualifier = "very";
        icon = "sentiment_very_dissatisfied";
    } else if (sentimentScore >= -0.4 && sentimentScore <= 0) {
        qualifier = "slightly";
        icon = "sentiment_neutral";
    } else if (sentimentScore > 0 && sentimentScore <= 0.5) {
        qualifier = "quite";
        icon = "sentiment_satisfied";
    } else if (sentimentScore > 0.5) {
        qualifier = "really";
        icon = "sentiment_very_satisfied";
    }

    if (sentimentType == "negative") {
        sentimentType = "salty";
    } else if (sentimentType == "positive") {
        sentimentType = "friendly";
    } else if (sentimentType == "neutral") {
        icon = "sentiment_neutral";
    }

    document.body.appendChild(script);
    outputToPage(qualifier, sentimentType, icon);
};

function outputToPage(qualifier, sentimentType, icon) {

    var newOut = "<p><strong>Here's what we think:</strong> <br>";
    newOut += "<i class=" + "\"material-icons md-48\">" + icon + "</i><br>";
    newOut += "This person's tone seems " + qualifier + " " + sentimentType + ". <br>";

    outputAreaRef.innerHTML = newOut;

};