
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview
    // YOUR CODE GOES HERE!
    var street = $("#street").val();
    var city = $("#city").val();
    var address = street +','+ city;
    $greeting.text('You want to live at '+address+' ?');
    $body.append('<img class="bgimg" src="https://maps.googleapis.com/maps/api/streetview?size=600x300&location= '+address+'">');

    // load NYTimes 
    var NYTurl = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + city + '&sort=newest&api-key=920e1807cf284da9bffc587e999c1f15';
    /*url += '?' + $.param({
        'api-key': "920e1807cf284da9bffc587e999c1f15",
        'q': "'+city+'"
    });*/

    $.getJSON(NYTurl, function(data){
        $nytHeaderElem.text('NYTimes articles about ' + city); //.text replaces the entire element of nytHeaderElem
        articles= data.response.docs;   //gets the responses
        for (var i = 0; i < articles.length; i++){
            $nytElem.append('<li class="article">'+
                '<a href="'+articles[i].web_url+'">'+articles[i].headline.main+'</a>'+
                '<p>'+articles[i].snippet+'</p>');
        }
    });

    return false;
}

$('#form-container').submit(loadData);
