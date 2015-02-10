



$(document).ready(function() {

    pulsate('#ticket');

});


function cleanText(text) {

    var text = " A movie about a fun-loving man's adventure in time. ";

    // replace hyphen with whitespace
    text = text.replace(/-/g,' ');

    // trim any whitespace from start and end of str  
    text = text.trim();

    console.log("[" + text + "]");

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
