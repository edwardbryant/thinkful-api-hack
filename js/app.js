
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
    text = text.replace(/-/g,' ');

    // remove remaining punc and leave no space
    text = text.replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()]/g,"");

    // trim any whitespace from start and end of str  
    text = text.trim();

    console.log("[" + text + "]");

}

var getMovieId = function(q) {
    console.log("API called to find movie id");
    var request = {
        api_key: "fed1050696146f0081c5285f5fd827c5",
        query: q
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
        getMovieDetails(id);
    });
}

var getMovieDetails = function(id){
    console.log(id);
    console.log("API called to get movie details");
    var request = {
        api_key: "fed1050696146f0081c5285f5fd827c5"
    };
    var result = $.ajax({
        url: "http://api.themoviedb.org/3/movie/" + id,
        data: request,
        dataType: "jsonp",
        type: "GET",
    })
    .done(function(result){
        console.log(result['overview']);
        console.log(result['poster_path']);
        console.log(result['release_date']);
        console.log(result['tagline']);
        console.log(result['title']);
    });
}


function getMovieInfo(query) {
    console.log("API function called.");
    var q = "Enemy";
    var searchRequest = {
        api_key: apiKey,
        query: q
    };
    var searchResult = $.ajax({
        url: "http://api.themoviedb.org/3/search/movie",
        data: searchRequest,
        dataType: "jsonp",
        type: "GET",
    })
    .done(function(searchResult){
        console.log("found id ... getting movie info with it.");
        var id = searchResult['results'][0]['id'];
        var infoRequest = {
            api_key: apiKey
        };
        var infoResult = $.ajax({
            url: "http://api.themoviedb.org/3/movie/" + id,
            data: infoRequest,
            dataType: "jsonp",
            type: "GET",
        })
        .done(function(infoResult){
            cleanText(infoRequest['overview']);
        })
        .fail(function(jqXHR, error, errorThrown){
            console.log(error);
        });  
    })
    .fail(function(jqXHR, error, errorThrown){
        console.log(error);
    });
} 






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
