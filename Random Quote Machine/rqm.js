/*function tweet(message) {
  window.open('https://twitter.com/intent/tweet?hashtags= freecodecamp&text='   + encodeURIComponent(message));
}
*/

$(document).ready(function() {
  
  $("#getQuote").on("click", function() {
    
    /*$.getJSON("http://api.forismatic.com/api/1.0/?method=getQuote&key=XXXXX&format=jsonp&jsonp=?&lang=en", function(json) {
  $("#quote").html(JSON.stringify(json))
    });*/
    
    $.ajax({
      dataType: "json",
      url: "https://api.forismatic.com/api/1.0/?method=getQuote&key=XXXXX&format=jsonp&jsonp=?&lang=en",
      success: function(json){
        quote = json.quoteText;
        author = json.quoteAuthor;
        $("#quote").text(json.quoteText);
        $("#author").text(json.quoteAuthor);
      }
      
    });
    
  }); 
  
  $("#tweet").click(function() {
    $(this).attr('href', 'https://twitter.com/intent/tweet?hashtags= freecodecamp&text=' + encodeURIComponent('"' + quote + '" - ' + author));
  });
  
});