//CODE BUGS:
// you have to click twice to load the gifs.  Also second gifs append twice 

//starting array
var topics = ["bender","roberto","exploding eddie","bad santa",
"professor farnsworth","zoidberg","leela","spongebob","patrick star",
"squidward","homer simpson","bart simpson","peter griffin","ned flanders"]
var response = "";

$(document).ready(function() {

//turns starting array into buttons and puts them on the page
for (i=0; i < topics.length; i++) {
    var newButton = $("<button>")
    // newButton.attr("id", "btnss")
    newButton.addClass("btns").text(topics[i])
    $("#gif-buttons").append(newButton)
}
//grabs value entered by user and appends new button
// CURRENT ERROR: new buttons do not seem to receive class .btn 
// when called in following on click function...however CSS they receive same styling...wtf
$(".btn").on("click", function() {
    var addBtn = $(".form-control").val();
    var addedButton = $("<button>")
    topics.push(addBtn)
    addedButton.addClass("btns")
    addedButton.text(addBtn)
    $("#gif-buttons").append(addedButton)
});

$('#gif-buttons').on('click', '.btns', function() {
    $(".btns").on("click", function() {
        var searchBtn = $(this).text()
        var key = "ClQtp7UovcQoe3gclsYj7juncwa6X7CK"
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + searchBtn + "&api_key=" + key
        // - add line to remove old contents of div when a new button is pressed
        // $("gif-div-container").remove();
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            for (i=0; i<12; i++) {
                var gifImg = $("<img>");
                var gifDiv = $("<div>");
                var gifRating = $("<h6>")
                gifImg.attr("src", response.data[i].images.fixed_height_still.url);
                gifImg.attr("data-stop", response.data[i].images.fixed_height_still.url);
                gifImg.attr("data-play", response.data[i].images.fixed_height.url);
                gifImg.attr("data-state", "stop");
                gifRating.text("GIF Rating: " + response.data[i].rating);
                gifDiv.append(gifImg);
                gifDiv.append(gifRating);
                $("#gif-div-container").append(gifDiv);
            }
            $("img").on("click", function(){
                var state = $(this).attr("data-state")
                if (state === "stop") {
                    // gifImg.attr("src", $(this).attr("data-play")) - why doesnt this work as well as using $(this)
                    $(this).attr("src", $(this).attr("data-play"))
                    $(this).attr("data-state", "play")
                    console.log($(this).attr("data-state"))
                } else {
                    $(this).attr("src", $(this).attr("data-stop"))
                    $(this).attr("data-state", "stop")
                }
            });
        });
    });
});

});
