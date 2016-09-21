var catalogGetData;

$(document).ready(function() {

    // Meta data calls for a list of all courses and extracts only the course names
    $("#metadata").click(function() {
        var metadataString = "";
        var map = new Object();

        $.get(metadataURL, function (data) {
            $.each(data["courses"], function (index, value) {

                if (map[value["subject"]] === undefined) {
                    map[value["subject"]] = true;
                    metadataString += value["subject"] + "<br>\n";
                }
            });

            $("#content").html(metadataString);
        });
        
    });

    // Main button calls the get url and parses the info into the html structure
    $(document).on('click', "#mainButton", function() {
        readSearchInput();
    });

    // Read enter button on main search bar
    $(document).on('keypress', "#mainSearch", function(data) {
       if(data.which === ENTER_KEY) {
           readSearchInput();
       }
    });

    // Click handler for class information
    $(document).on('click', ".classHeader", function() {
        displayClassInfo(this);
    });  // end .classHeader click

});