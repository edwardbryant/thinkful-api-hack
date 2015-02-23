
$(document).ready(function() {
    
    updateDate();
    pulse('#ticket');

    $('#ticket').on('click', function() {        
        $('#start').fadeOut(600, function(){
            $('#search').fadeIn(600);
        });
    })

    $('#btnSearch').on('click', function() {
        console.log("query option selected");     
        var q = $('#query').val()
        getMovieId(q);
        $('#search').fadeOut(600, function(){
            $('#results').fadeIn(600);
        });
    })

    $('#btnRandom').on('click', function() {
        console.log("random option selected");     
        getMovieIdRandom();
        $('#search').fadeOut(600, function(){
            $('#results').fadeIn(600);
        });
    })

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
        $(element).fadeTo('800', 0.8, function () {
            fadeItOut();
        });
    }
    // increase opacity 
    var fadeItOut = function() {
        $(element).fadeTo('800', 1.0, function () {
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
var getMovieIdRandom = function() {
    var page = Math.floor((Math.random() * 5) + 1);
    console.log("random page: " + page);
    var item = Math.floor((Math.random() * 20) + 1) - 1;
    console.log("random item: " + item);
    var request = {
        api_key: "fed1050696146f0081c5285f5fd827c5",
        page: page,
        language: "en"
    };
    var result = $.ajax({
        url: "http://api.themoviedb.org/3/movie/popular",
        data: request,
        dataType: "jsonp",
        type: "GET"
    })
    .done(function(result){
        console.log(result);
        var id = result['results'][item]['id']; 
        $('#test').text(test);
        console.log("API movie search randomly selected ID " + id)
        getMovieDetails(id);
    });
};
var getMovieId = function(q) {
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
        showDetails(displayDetails);

        // scoreResults()
        // testR(displayDetails);


    });
};
var showDetails = function(details){
    console.log("showing movie details");
    $('#result-poster > img').attr("src", details['poster']);
    $('#result-title').text(details['title']);
    $('#result-year').text(details['year']);
};


// testing stuff



var getScore = function(text) {


    var cKeywords = ["attractive","beautiful","beauty","breakup","boyfriend","bride","bridesmaid","bridesmaids","clique","cliques","couple","couples","cry","dance","dancing","date","dating","diamond","diamonds","diary","diaries","divorce","divorced","dream","dreams","dress","dresses","emotion","emotional","emotions","estranged","ex","exboyfriend","exboyfriends","exgirlfriend","exgirlfriends","fashion","friend","friends","girl","girls","girlfriend","girlfriends","heart","hearts","intermingled","irresistible","kiss","kissing","love","loving","marriage","marry","paris","piano","pink","relationship","romance","romantic","sad","saddest","sensible","single","singles","sister","sisterhood","spa","social","sweet","teen","teens","unfaithful","unlucky","vows","wedding","weddings"];

    var gKeywords = ["alien","apocalypse","apocalyptic","armor","army","athelete","atheletes","battle","baseball","blood","bloody","boxer","boxing","coach","coaching","corrupt","corruption","cop","cowboy","crime","crimes","criminal","cyborg","cyborgs","dead","death","die","disaster","destroy","destroys","destructive","dragon","dragons","drug","drugs","fbi","fight","fighter","fighting","football","gang","gangster","gangsters","gladiator","gladiators","golf","gun","guns","hockey","hostage","hostages","hunt","hunting","invade","invasion","jail","kill","killer","killing","maniac","marines","martial","maverick","military","mob","mobster","murder","navy","outlaw","outlaws","pentagon","platoon","police","prison","prisoners","psychopath","revenge","robbery","samurai","security","serial","shield","slaughter","soldier","soldiers","superhero","sword","syndicate","terror","terrorist","terrorists","victim","vikings","vietnam","violence","violent","war","warrior","warriors","world","zombie","zombies"];

    console.log("C Keywords ... " + cKeywords.length);
    console.log("G Keywords ... " + gKeywords.length);

    var score = 1;
    return score;
}



var testR = function(details){
    var stuff = $("<h3>" + details['title'] + " (" + details['year'] + ")</h3><div><img src='" + details['poster'] + "'></div>")
    $("#center-display-btn").fadeOut(200, function(){
        $('#center-display-results').append(stuff);
        $('#center-display-results').fadeIn(200);
    });
    console.log(details['title']);
    console.log(details['year']);
    // console.log(details['overview']);
    if (details['overview'].length < 20) {
        console.log("INSUFFICIENT DATA")
    }
};

