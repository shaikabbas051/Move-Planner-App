
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
    var street = $("#street").val(); //get the input value of street
    var city = $("#city").val();    //get the input value of city   
    var address = street +','+ city;
    $greeting.text('You want to live at '+address+' ?');
    $body.append('<img class="bgimg" src="https://maps.googleapis.com/maps/api/streetview?size=600x300&location= '+address+'">');//changing the background image to the location entereed

    // load NYTimes 
    var NYTurl = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + city + '&sort=newest&api-key=920e1807cf284da9bffc587e999c1f15';//newyork times api(enter this link in the browser to see the exact response)
    /*url += '?' + $.param({
        'api-key': "920e1807cf284da9bffc587e999c1f15",
        'q': "'+city+'"
    });*/

    $.getJSON(NYTurl, function(data){ //using JSON to display the article
        $nytHeaderElem.text('NYTimes articles about ' + city); //.text replaces the entire element of nytHeaderElem
        articles= data.response.docs;   //gets the responses
        for (var i = 0; i < articles.length; i++){
            $nytElem.append('<li class="article">'+
                '<a href="'+articles[i].web_url+'">'+articles[i].headline.main+'</a>'+
                '<p>'+articles[i].snippet+'</p>');
        }
    })
    .fail(function(e){    //if something went wrong then, it shows the message 
        $nytHeaderElem.text('no article found');
    });

    //Load Wikipedia
    //show the error message if the data is failed to load
    var wikierror = setTimeout(function(){
        $wikiElem.text('Fail to get Wiki Links')//error message
    }, 2000);//if the data is not loaded within this time then it should display the error message 
    var wikilink = 'http://en.wikipedia.org/w/api.php?action=opensearch&search='+city+'&format=json&callback=wikiCallback';
    $.ajax(wikilink,{
        dataType: "jsonp", //If a user script or gadget needs to make an API call against another MediaWiki site (e.g. a script on the English Wikipedia needs to check image information on Commons), it must use JSONP or CORS.
        success: function(data){
            var wikipedia = data[1]; //only first element of response is required, so its 1
            for (var i = 0; i < wikipedia.length; i++){//itterate through the data
                $wikiElem.append('<li>' +
                    '<a href="' + 'https://en.wikipedia.org/wiki/'+ wikipedia[i] +'">' + wikipedia[i] + '</a>');
                    clearTimeout(wikierror);//clear timeout if data is successfully loaded
            }
        }
    });

    return false;
}
$('#form-container').submit(loadData);