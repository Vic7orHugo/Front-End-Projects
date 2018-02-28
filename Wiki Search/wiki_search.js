
// Global variables
//var api = "https://en.wikipedia.org/w/api.php?action=query&titles=Albert+Einstein&prop=text&rvprop=content&rvsection=0&format=json";
let api = "https://en.wikipedia.org/w/api.php";
let url = "https://en.wikipedia.org/wiki/";
let apiData = {
  action: "query",
  prop: "extracts",
  generator: "search",
  gsrsearch: "",
  gsrlimit: 5,
  exlimit: "max",
  exintro: 1,
  //explaintext: 1,
  exsentences: 1,
  format: "json",
  formatversion: 2
}

$(document).ready(function() {

  $("#search-entry").keypress(function(key) {
    // Checks if ENTER was pressed
    if (key.which === 13) {
      // Gets the value of the input field
      $("div.row").remove();
      apiData.gsrsearch = this.value;
      wikiSearch();
    } else {
      console.log("Waiting the key ENTER to be pressed.");
    }
  });
  
  /*
  $.getJSON(api, function(data) {
    $("#wiki-search").html(JSON.stringify(data));
  });
  */
  
});

function wikiSearch() {
  $.ajax( {
    url: api,
    data: apiData,
    dataType: 'jsonp', // So there is no need for the 'callback=?' parameter
    success: function(data){
      $(".searchbox").css("margin", '80px auto 100px auto');
      wikiPages = data.query.pages;
      for (let pageID = 0; pageID < apiData.gsrlimit; pageID++) {
        let header = wikiPages[pageID].title;
        let description = wikiPages[pageID].extract;
        $("p#random-wiki-search").append(wikiSearchBox(header, description));
        let newID = '#' + header.replace(/[\s()]/g, '-'); 
        console.log(newID);
        $(newID).attr("href", url + header);
      }
    }
  });
}

function wikiSearchBox(title, description) {
  let searchBox;
  searchBox = '<div class="row align-middle">\n' + '<div class="col-md-2"></div>\n' + '<div class="col-md-8 wiki-search-result text-left">\n<a id=' + title.replace(/[\s()]/g, '-') + ' class="text-black" target="_blank"><p>' + title + '<br />' + description + '</p></a></div>' + '<div class="col-md-2"></div>\n</div>';
  return searchBox;
}

//

//'<a id=' + title.replace(/ /g, '-') + ' target="_blank"><div  class="row align-middle">\n' + '<div class="col-md-2"></div>\n' + '<div class="col-md-8 wiki-search-result text-left text-black">\n<p>' + title + '<br />' + description + '</p></div>' + '<div class="col-md-2"></div>\n</div></a>';