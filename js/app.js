
$(document).ready(function() {
    
    updateDate();
    pulse('#ticket');
    

    getMovieId("star trek");

    getScore();



});


var updateDate = function() {
    var d = new Date();
    var days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
    var months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    var day = days[d.getDay()];
    var month = months[d.getMonth()];
    var date = d.getDate();
    $("#day").html("&bull;" + day + "&bull;"); 
    $("#month").text(month); 
    $("#date").text(date);
};
var pulse = function(element) {
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
};
var cleanText = function(text) {
    text = text.replace(/ -- /g,' ');
    text = text.replace(/ - /g,' ');
    text = text.replace(/-/g,' ');
    text = text.replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()]/g,"");
    text = text.toLowerCase();
    text = text.trim();
    return text;
};
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

var getScore = function(text) {


    var cKeywords = ["attractive","beautiful","beauty","breakup","boyfriend","bride","bridesmaid","bridesmaids","couple","couples","cry","dance","dancing","date","dating","diamond","diamonds","diary","diaries","divorce","divorced","dream","dreams","dress","dresses","emotion","emotional","emotions","estranged","ex","exboyfriend","exboyfriends","exgirlfriend","exgirlfriends","fashion","friend","friends","girlfriend","girlfriends","heart","hearts","intermingled","irresistible","kiss","kissing","love","loving","marriage","marry","paris","piano","pink","relationship","romance","romantic","sad","saddest","sensible","sister","sisterhood","spa","social","sweet","teen","teens","unfaithful","unlucky","vows","wedding","weddings"];

    var gKeywords = ["alien","apocalypse","apocalyptic","armor","army","athelete","atheletes","battle","baseball","blood","bloody","boxer","boxing","coach","coaching","corrupt","corruption","cop","cowboy","crime","crimes","criminal","cyborg","cyborgs","dead","death","die","disaster","destroy","destroys","destructive","dragon","dragons","drug","drugs","fbi","fight","fighter","fighting","football","gang","gangster","gangsters","gladiator","gladiators","golf","gun","guns","hockey","hostage","hostages","hunt","hunting","invade","invasion","jail","kill","killer","killing","maniac","marines","martial","maverick","military","mob","mobster","murder","navy","outlaw","outlaws","pentagon","platoon","police","prison","prisoners","psychopath","revenge","robbery","samurai","security","serial","shield","slaughter","soldier","soldiers","superhero","sword","syndicate","terror","terrorist","terrorists","victim","vikings","vietnam","violence","violent","war","warrior","warriors","world","zombie","zombies"];

    console.log("C Keywords ... " + cKeywords.length);
    console.log("G Keywords ... " + gKeywords.length);

    var score = 1;
    return score;
}


// testing stuff

var testR = function(details){
    console.log(details['overview_raw']);
    console.log(details['overview']);
};

