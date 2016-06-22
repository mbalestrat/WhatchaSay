
var gotText = text.value;
var gotSentiment = jsonpRequest(gotText);
var sentiment= JSON.stringify(gotSentiment);

//function buttonHit(){
    //sentiment = jsonpRequest(gotText);
//}


function jsonpRequest(data) {
    var APIKEY = "5247ac4d4d28493eb85addb968cbc07d";
    var params = "https://api.dandelion.eu/datatxt/sent/v1/?lang=en&text=";
    params += data;

    params += "&token=";
    params += APIKEY;

    var script = document.createElement('script');
    script.src = params;
    document.body.appendChild(script);
    return script.src;
}

function callBack(response) {

        var result = response.sentiment;
        
        sentimentScore = response.sentiment.score;
        sentimentType = response.sentiment.type;

        document.body.appendChild(script);

       //callback(WeatherForecast);
    };



