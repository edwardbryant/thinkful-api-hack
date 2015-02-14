
var apiKey = "fed1050696146f0081c5285f5fd827c5";

$(document).ready(function() {
    
    updateDate();
    pulsate('#ticket');

    getMovieId("Idiocracy");




});

function updateDate() {
    var d = new Date();
    var days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
    var months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    var day = days[d.getDay()];
    var month = months[d.getMonth()];
    var date = d.getDate();
    $("#day").html("&bull;" + day + "&bull;"); 
    $("#month").text(month); 
    $("#date").text(date);
}

function cleanText(text) {

    // var text = " A movie, which is a film, about a fun-loving man's adventure in time. You will love it!";

    // replace hyphen with whitespace, before punc stripped 
    text = text.replace(/ - /g,' ');
    text = text.replace(/-/g,' ');

    // remove remaining punc and leave no space
    text = text.replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()]/g,"");

    // trim any whitespace from start and end of str  
    text = text.trim();

    return text;

}

var getMovieId = function(q) {
    console.log("API called to find movie id");
    var request = {
        api_key: "fed1050696146f0081c5285f5fd827c5",
        query: q,
        language: "en",
        include_adult: false
    };
    var result = $.ajax({
        url: "http://api.themoviedb.org/3/search/movie",
        data: request,
        dataType: "jsonp",
        type: "GET",
    })
    .done(function(result){
        console.log(result);
        var id = result['results'][0]['id'];
        console.log("API movie search matched (" + q + ") to ID " + id)
        getMovieDetails(id);
    });
};

var getMovieDetails = function(id){
    console.log("API movie detail call on ID " + id);
    var request = {
        api_key: "fed1050696146f0081c5285f5fd827c5",
        language: "en"
    };
    var result = $.ajax({
        url: "http://api.themoviedb.org/3/movie/" + id,
        data: request,
        dataType: "jsonp",
        type: "GET",
    })
    .done(function(result){
        // console.log(result['overview']);
        // console.log(result['poster_path']);
        // console.log(result['release_date']);
        // console.log(result['tagline']);
        console.log(result);
        var displayDetails = {
            title: result['title'],
            year: result['release_date'].substr(0,4),
            poster: "http://image.tmdb.org/t/p/w150/" + result['poster_path']
        };        
        var textDetails = {
            title: result['title'],
            tagline: cleanText(result['tagline']),
            overview_raw: result['overview'],
            overview: cleanText(result['overview'])
        };
        testR(textDetails);


    });
};

var testR = function(details){
    console.log(details['overview_raw']);
    console.log(details['overview']);
};

function chicScore(text) {
    var chicWords = ["beautiful","beauty","breakup","boyfriend","bride","bridesmaid","bridesmaids","couple","couples","cry","dance","dancing","date","diamond","diamonds","diary","diaries","divorce","divorced","dream","fashion","friend","friends","girlfriend","girlfriends","heart","irresistible","kiss","kissing","love","marriage","paris","piano","pink","relationship","romance","romantic","sad","saddest","sister","sisterhood","spa","social","sweet","unfaithful","vows","wedding","weddings"];
    var score = 1;
    return score;
}

function pulsate(element) {
    // lower opacity 
    var fadeItIn = function() {
        $(element).fadeTo('600', 0.6, function () {
            fadeItOut();
        });
    }
    // increase opacity 
    var fadeItOut = function() {
        $(element).fadeTo('600', 1.0, function () {
            fadeItIn();
        });
    }
    // fadeIn if hidden, then start opacity cycling   
    $(element).fadeIn('slow', function() {
        fadeItOut();
    });
}
