
$(document).ready(function() {
    
    updateDate();
    pulse('#ticket');

    $('#ticket').on('click', function() {        
        $('#start').fadeOut(600, function(){
            $('#search').fadeIn(600);
        });
    })

    $('#btnSearch').on('click', function() {
        var q = $('#query').val()
        getMovieId(q);
        $('#search').fadeOut(600, function(){
            $('#results').fadeIn(600);
        });
    })

    $('#btnRandom').on('click', function() {
        getMovieIdRandom();
        $('#search').fadeOut(600, function(){
            $('#results').fadeIn(600);
        });
    })

    $('#btnReset').on('click', function() {
        $('#query').val("");
        $('#results').fadeOut(600, function(){
            $('#search').fadeIn(600);
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
        var id = result['results'][item]['id']; 
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
        console.log(result);
        var displayDetails = {
            title: result['title'],
            year: result['release_date'].substr(0,4),
            poster: "http://image.tmdb.org/t/p/w150/" + result['poster_path'],
            overview: result['overview']
        };        
        var textDetails = {
            title: cleanText(result['title']),
            tagline: cleanText(result['tagline']),
            overview: cleanText(result['overview'])
        };


        // if insufficient info    

        showDetails(displayDetails);
        showScores(textDetails);


    });
};
var showDetails = function(details){
    $('#result-title').text(details['title']);
    $('#result-year').text(details['year']);
    $('#result-poster > img').attr("src", details['poster']);
    $('#result-overview').text(details['overview']);

};
var showScores = function(details) {
    var cKeywords = ["attractive","beautiful","beauty","breakup","book","boyfriend","bride","bridesmaid","bridesmaids","clique","cliques","couple","couples","cry","dance","dancing","date","dating","diamond","diamonds","diary","diaries","divorce","divorced","divorcing","dream","dreams","dress","dresses","emotion","emotional","emotions","engaged","engagement","entangled","entanglement","entanglements","estranged","ex","exboyfriend","exboyfriends","exgirlfriend","exgirlfriends","fashion","fiance","flower","flowers","friend","friends","friendship","funeral","girl","girls","girlfriend","girlfriends","heart","hearts","intermingled","irresistible","kiss","kissing","literature","love","lovelorn","loves","loving","marriage","marry","paris","piano","pink","propose","proposal","relationship","romance","romantic","sad","saddest","secretly","sensible","sibling","single","singles","sister","sisterhood","spa","social","sweet","teen","teens","torrid","true","unfaithful","unlucky","vows","wedding","weddings","wife"];
    var gKeywords = ["alien","anarchy","apocalypse","apocalyptic","armor","army","assassin","assassinate","assassinated","athelete","atheletes","avenge","avengers","battle","baseball","batman","blood","bloody","bounty","boxer","boxing","brutal","brutality","cia","coach","coaching","corrupt","corruption","cop","cowboy","crime","crimes","criminal","cyborg","cyborgs","dead","death","dictator","die","disaster","dead","deadly","destroy","destroyed","destroys","destructive","dragon","dragons","drug","drugfueled","drugs","espionage","fbi","fight","fighter","fighting","football","galaxy","gang","gangster","gangsters","gladiator","gladiators","golf","gun","guns","hockey","hostage","hostages","hunt","hunting","invade","invasion","jail","kill","killer","killing","kingpin","knight","knights","lethal","maniac","marines","martial","maverick","menace","menacing","merc","mercenary","military","mob","mobster","murder","murdered","murdering","navy","outlaw","outlaws","pals","pentagon","platoon","police","power","powerful","powerhungry","prison","prisoners","psychopath","revenge","robbery","sadistic","samurai","security","serial","shield","slaughter","soldier","soldiers","space","spiderman","superhero","superheroes","sword","syndicate","terror","terrorist","terrorists","thug","thugs","undercover","victim","vietnam","vikings","villain","villainous","violence","violent","war","warrior","warriors","world","xmen","zombie","zombies"];
    var cScore = (countMatches(cKeywords,details['title']) * 12) + (countMatches(cKeywords,details['overview']) * 6);
    var gScore = (countMatches(gKeywords,details['title']) * 12) + (countMatches(gKeywords,details['overview']) * 6);
    if (cScore > 100) {
        cScore = 100;
    }
    if (gScore > 100) {
        gScore = 100;
    }
    if (cScore > gScore) {
        $('#result-winner').html('<i class="fa fa-check"></i> Chick Flic');
    } else if (gScore > cScore) {
        $('#result-winner').html('<i class="fa fa-check"></i> Guy Movie');
    } else {
        $('#result-winner').html('<i class="fa fa-check"></i> Tied');
    }

    $('#cScore').text(cScore+"%");
    $('#gScore').text(gScore+"%");

    console.log("C Keywords ... " + cKeywords.length);
    console.log("G Keywords ... " + gKeywords.length);



};

var countMatches = function(keywords,text){
    var count = 0;
    for(var i=0;i<keywords.length;i++) {
        var pattern = new RegExp("\\b"+keywords[i]+"\\b","g");
        var m = text.match(pattern);
        if (m != null) {
            count = count + m.length;
        }
    }
    return count;
};




// testing stuff

var getScore = function(text) {

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

