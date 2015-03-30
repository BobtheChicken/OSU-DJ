var bg;
var game;
var hitobjects = [];
var hitobjectsearly = [];

var hitcount = 0;
var hitcountearly = 0;

var ready = false;
var soundready = false;
var firsttime = true;

var once = false;

var source;

var imagetype = "source";

var theentries;

var thesong;

var searcher;

var imagesthing = [];

google.load("search", "1");

var imageurls = [];

var searchcount = 0;
var lasturl = "";


// $("#background").css('background-image','url('+imageurls[getRandomInt(0,7)]+')');


var start = new Date().getTime();

var sound = new Howl({
      urls: ['beatmaps/test/wonder.mp3']
    })

$(document).ready(function() {

  $.get('beatmaps/test/wonder.osu', function(data) {
        // alert(data);
          // var n = data.indexOf("[HitObjects]");
          // console.log(n);
          // var res = data.substring(n, data.length-1);
          // // console.log(res);
          // var stringarray = res.split("\n");
          // stringarray.splice(0, 1);
          // // console.log(stringarray);

          // // var hitobjects = [];
          // for(var i = 0; i < stringarray.length; i++)
          // {
          //     var hit = {};
          //     var rawstrings = stringarray[i].split(",");
          //     hit.x = parseInt(rawstrings[0]);
          //     hit.y = parseInt(rawstrings[1]);
          //     hit.time = parseInt(rawstrings[2]);

          //     hitobjects.push(hit);
          // }
          // start = new Date().getTime();
          // ready = true;

          // sound.play();

  });

});


setInterval(onTimerTick, 33); // 33 milliseconds = ~ 30 frames per sec
// $("#background").css('background-image','url(images/'+getRandomInt(1,24)+'.png)');

function onTimerTick() {
    // Do stuff.
    if(ready && soundready)
      {
        if(firsttime)
        {
          start = new Date().getTime();
          firsttime = false;
          audio = document.getElementById("audio");
          audio.play();
          // sound.play();
        }
        var now = new Date().getTime();
        var currenttime = now - start;

        // console.log("current: " + currenttime + " hitcount" + hitobjects[hitcount].time);
        // if(currenttime > 1000)
        if(currenttime > hitobjects[hitcount].time && !once)
        {
          hitcount++;
          // once = true;

          // $("#background").css('background-image','url(images/'+getRandomInt(1,24)+'.png)');
          if(imagetype == "source")
          {
            $("#background").css('background-image','url('+imageurls[getRandomInt(0,imageurls.length-1)]+')');
          }
          if(imagetype == "420")
          {
            $("#background").css('background-image','url(images/'+getRandomInt(1,24)+'.png)');
          }
          $("#background").empty();

          // for(var i = 0; i < 1; i++)
          // {
          //   var theClone = $("#background").clone().css({ opacity : (40)/50, position : 'absolute', top : 0 });

          //   $("#background").parent().append(theClone);

          //   var pos = $("#background").position();

          //   // theClone.animate({ right : i*10 }, 10);
          //   theClone.css({
          //           position: "absolute",
          //           top: pos.top + "px",
          //           left: (pos.left + (i*300)*-1) + "px"
          //       }).show();

          //   theClone.velocity({ left : 0 }, 1000,function(){
          //     $(this).remove();
          //   });
          // }


          // $('#background').addClass('animation-target');
          // $("#background").velocity("fadeIn", { duration: 100 });
          // $("#background").velocity("slideDown", { duration: 100 , queue: false});
        }
        if(currenttime > hitobjects[hitcountearly].time - 1000&& !once)
          {
            hitcountearly++;
            // {
              var theClone = $("<img>");

              theClone[0].src = "images/particle_blue.png";

              $("#background").parent().append(theClone);

              var pos = $("#background").position();

              // theClone.animate({ right : i*10 }, 10);
              theClone.css({
                      position: "absolute",
                      top: pos.top + "px",
                      left: (pos.left) + "px"
                  }).show();

              theClone.animate({ left : screen.width/2 }, 1000,function(){
                $(this).remove();
              });

              var theClone2 = $("<img>");

              theClone2[0].src = "images/particle_blue.png";

              $("#background").parent().append(theClone2);

              var pos = $("#background").position();

              // theClone.animate({ right : i*10 }, 10);
              theClone2.css({
                      position: "absolute",
                      top: pos.top + "px",
                      left: (screen.width) + "px"
                  }).show();

              theClone2.animate({ left : screen.width/2 }, 1000,function(){
                $(this).remove();
              });
            // once = true;
          }
      }
}


function searchstuff()
{

  var searchterm = $("#songsearch").val();
  //https://osu.hexide.com/search/maps.title.like.dance

  var oReq2 = new XMLHttpRequest();
  oReq2.open("GET", "https://osu.hexide.com/search/maps.title.like."+searchterm, true);
  oReq2.onload = function(oEvent) {
    var blob = oReq2.response;
    console.log(blob);
    var thejson = JSON.parse(blob);
    for(var i = 0; i < thejson.length; i++)
    {
      $("#background").append("<br><a href='#' onClick='selectsong("+thejson[i].ranked_id+")'>" + thejson[i].name + "</a>");
    }

  };
  oReq2.send();



}


function selectsong(rankedid)
{
  $("#background").html("loading m8");
  var oReq = new XMLHttpRequest();
  oReq.open("GET", "https://osu.hexide.com/beatmaps/"+rankedid+"/download", true);
  oReq.responseType = "blob";

  oReq.onload = function(oEvent) {
    var blob = oReq.response;

    zip.createReader(new zip.BlobReader(blob), function(reader) {
      console.log(">>>");

      // get all entries from the zip
      reader.getEntries(function(entries) {
        theentries = entries;
          for(var i = 0; i < entries.length; i++)
          {
            // console.log(entries[i].filename)

            // console.log("my boots");
          }
          readEntry(0);
        });


      });
    }
    // ...
  //};

  oReq.send();
}




function readEntry(index)
{
  if(theentries[index].filename.indexOf("osu") > -1)
  {
    $("#background").append("<br><a href='#' onClick='loadosu("+index+")'>" + theentries[index].filename + "</a>")
    if(index < theentries.length -1 )
    {
      readEntry(index+1);
    }
  }
  else if(theentries[index].filename.indexOf("mp3") > -1 || theentries[index].filename.indexOf(".ogg") > -1)
  {
    theentries[index].getData(new zip.BlobWriter(), function(text) {
          // text contains the entry data as a String
          console.log("found the " + theentries[index].filename);

          thesong = text;

          // var songurl = window.URL.createObjectURL(thesong);
          // console.log(songurl);

          // sound = new Howl({
          //     urls: [songurl]
          // });

          var url = URL.createObjectURL(thesong);
          audio = document.getElementById("audio");
          audio.src = url;
          audio.load();
          // audio.play();

          soundready = true;

            if(index < theentries.length -1 )
            {
              readEntry(index+1);
            }

        }, function(current, total) {
          // onprogress callback
        });
  }
  else
  {
    if(index < theentries.length -1 )
    {
      readEntry(index+1);
    }
  }
}


//https://ajax.googleapis.com/ajax/services/search/images?v=1.0&q=fuzzy%20monkey

function loadosu(index)
{
  theentries[index].getData(new zip.TextWriter(), function(text) {
        // text contains the entry data as a String
        console.log("found the " + theentries[index].filename);



          var data = text;
          var n = data.indexOf("[HitObjects]");
          // console.log(n);
          var res = data.substring(n, data.length-1);
          // console.log(res);
          var stringarray = res.split("\n");
          stringarray.splice(0, 1);
          for(var i = 0; i < stringarray.length; i++)
          {
              var hit = {};
              var rawstrings = stringarray[i].split(",");
              hit.x = parseInt(rawstrings[0]);
              hit.y = parseInt(rawstrings[1]);
              hit.time = parseInt(rawstrings[2]);

              hitobjects.push(hit);
          }

          source = "osu";
          var data2 = data.split("\n");
          for(var i = 0; i < data2.length; i++)
          {
            console.log(data2[i]);
            if(data2[i].indexOf("Source") > -1)
            {
              source = data2[i].substring(7,data2[i].length);
              console.log("hi there");
              // c
            }
          }

          console.log(source);


          console.log(source);

          // $.get( "https://ajax.googleapis.com/ajax/services/search/images?v=1.0&q="+source, function( imageres ) {
          //   var parsed = JSON.parse(imageres);
          //   console.log(parsed);
          //   ready = true;
          // });
          // Using YQL and JSONP
          // $.ajax({
          //     url: "https://ajax.googleapis.com/ajax/services/search/images?v=1.0&q="+source,
          //     // The name of the callback parameter, as specified by the YQL service
          //     jsonp: "callback",
          //     // Tell jQuery we're expecting JSONP
          //     dataType: "jsonp",
          //     // Tell YQL what we want and that we want JSON
          //     data: {
          //         q: "select title,abstract,url from search.news where query=\"cat\"",
          //         format: "json"
          //     },

          //     // Work with the response
          //     success: function( response ) {
          //         console.log( response ); // server response
          //     }
          // });


          searcher = new google.search.ImageSearch();
          searcher.setResultSetSize(8);
          // searcher.setSiteRestriction("imgur.com");
          searcher.setSearchCompleteCallback(this, searchComplete, null);
          searcher.gotoPage(0);
          console.log("cursor:" + searcher.cursor);
          searcher.execute(source + " wallpaper");


      }, function(current, total) {
        // onprogress callback
      });
}

for(var i = 1; i < 24; i++)
    {
        $('<img/>')[0].src = "images/"+i+".png";
        // console.log("trying to ")
        // IsValidImageUrl(arrayOfImages[i]);
        // Alternatively you could use:
        // (new Image()).src = this;
    }


function preload(arrayOfImages) {
    for(var i = 0; i < arrayOfImages.length; i++)
    {
        $('<img/>')[0].src = arrayOfImages[i];
        // console.log("trying to ")
        IsValidImageUrl(arrayOfImages[i]);
        // Alternatively you could use:
        // (new Image()).src = this;
    }
}

function IsValidImageUrl(url) {
$("<img>", {
    src: url,
    error: function() {
      console.log("removed a url");
      removeFromImagelist(url);
    },
    load: function() {

    }
});

if(url.indexOf("photobucket") > -1)
{
  removeFromImagelist(url);
}
}

function removeFromImagelist(theurl)
{
  console.log("removing image " + theurl);
  var index = imageurls.indexOf(theurl);    // <-- Not supported in <IE9
  if (index !== -1) {
      imageurls.splice(index, 1);
  }
}


function searchComplete()
{
  searchcount++;
  var testurl = searcher.results[0].url;
  console.log("testurl: " + testurl);
  console.log("cursor:" + searcher.cursor);

  if (searcher.results && searcher.results.length > 0 && testurl != lasturl) {
    lasturl = testurl;
    var results = searcher.results;
    // var topreload = [];
          for (var i = 0; i < results.length; i++) {
            // For each result write it's title and image to the screen
            var result = results[i].url;
            // topreload.push(result)
            console.log(result);
            imageurls.push(result);
            // $("#preload").append("<img src='"+result+"'>");
          }
          preload(imageurls);

          // ready = true;
  }

  if(searchcount >= 8)
  {
    ready = true;
  }
  else
  {
    // searcher = new google.search.ImageSearch();
    searcher.setResultSetSize(8);
    // searcher.setSiteRestriction("imgur.com");
    searcher.setSearchCompleteCallback(this, searchComplete, null);
    console.log("executing another with page" + searchcount);
    searcher.gotoPage(searchcount);
    // searcher.execute(source);

  }
}





function readFile(file, onLoadCallback){
    var reader = new FileReader();
    reader.onload = onLoadCallback;
    reader.readAsDataURL(file);
}



// $.get( "https://osu.hexide.com/beatmaps/1/download/novid", function( data ) {
//   console.log("asdasd");
//   console.log("lol" + data);

//   // zip.createReader(new zip.BlobReader(data), function(reader) {
//   //   console.log(">>>");

//   //   // get all entries from the zip
//   //   reader.getEntries(function(entries) {
//   //       for(var i = 0; i < entries.length; i++)
//   //       {
//   //         // console.log(entries[i].name)
//   //         console.log("my boots");
//   //       }
//   //     });


//   //   });
//   // }

// });




// enchant();

// window.onload = function(){
//     game = new Core(0, 0);
//     game.fps = 30;
//     // game.scale = 0.5;
//     for(var i = 1; i < 25; i++)
//     {
//       // game.preload("images/"+i+".png");
//     }

//     game.rootScene.addEventListener('enterframe', function(){



//     });


//     // Bg = Class.create(Sprite, { // declare a custom class called Bear
//     //     initialize:function(image){ // initialize the class (constructor)
//     //         Sprite.call(this,1280,720); // initialize the sprite
//     //         this.image = game.assets["images/"+image+".png"];
//     //         this.scaleX = (screen.width)/1280;
//     //         this.scaleY = (screen.height)/720;
//     //         this.x = (screen.width - 1280)/2;
//     //         this.y = (screen.height - 720)/2;
//     //         this.frame = 5;
//     //         game.rootScene.addChild(this);


//     //     },
//     //     onenterframe:function()
//     //     { // enterframe event listener

//     //     }
//     // });


//     game.onload = function(){
//         // bg = new Bg(2);
//     };
//     game.start();
// };




function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
