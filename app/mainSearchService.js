// Read search input and display
/**
 * Reads the search input, makes corresponding service call, and pushes information to HTML
 * @returns {boolean} Return false if input is invalid
 */
function readSearchInput() {
    var input = $('#mainSearch').val().toUpperCase();

    // Check if input matches regex of subject titles
    if(!input.match(courseTitleRegEx)) {
        console.log("Not a valid course input: " + input);
        return false;
    }

    var readUrl = URL + input;

    $.when($.get(TEMPLATE_SEARCH_RETURN_DISPLAY, function(data) {
        $("body").html(data);
    })).done(function() {

        $('#mainSearch').val(input);

        // Empty the result content of previous results
        $("#content").empty();

        // Perform get call
        $.get(readUrl, function (data) {
            console.log("Get was performed on " + readUrl);


            // Store the catalog get data for when filtering is applied
            catalogGetData = data;
            var classes = data["classes"];

            displayClasses(classes);

        });
    });
}

/**
 * Receives a class data JSON and pushes the information into the class box display HTML template
 * @param classesData Class data JSON
 */
function displayClasses(classesData) {
    var courseListArray = new Array();
    var courseMap = new Object();
    // Wait for the template html to load then input the data into each template
    $.when($.get(TEMPLATE_CLASS_BOX_DISPLAY, function(data) {
        resultBox = data;
    })).done(function() {
        // These are the same

        /*for (var key in classes) {
         console.log(classes[key]["title"]);
         console.log(key);

         $("#content2").append(resultBox);
         $(".courseNumber").last().html(key);
         $(".title").last().html(classes[key]["title"]);
         }*/

        $.each(classesData, function(index, value) {

            // Old content appending before data roll up
            /*$("#content").append(resultBox);

             var tempCourseNum = index + " " + value["catalog_number"]

             $(".courseNumber").last().html(tempCourseNum);
             $(".title").last().html(value["title"]);
             $(".description").last().html(value["description"]);

             // TODO: iterate through professors array and concat for display
             if(value["instructors"].length >= 1) {
             $(".prof").last().html(value["instructors"][0]["instructor"]);
             }

             // TODO: iterate through meeting array and concat for display
             if(value["meetings"].length >= 1) {
             $(".timeSlot").last().html(value["meetings"][0]["days"]);
             }*/


            var courseInfo = new Object();

            if(courseMap[value["catalog_number"]] === undefined) {
                courseInfo = new Object();

                courseInfo["catalog_number"] = value["catalog_number"];
                courseInfo["title"] = value["title"];
                courseInfo["description"] = value["description"];

                // TODO: Extract to another function
                appendInstructor(courseInfo, value["instructors"]);

                courseMap[value["catalog_number"]] = courseInfo;
                courseListArray.push(value["catalog_number"]);
            } else {
                courseInfo = courseMap[value["catalog_number"]];

                var instructors = courseInfo["instructors"];

                appendInstructor(courseInfo, value["instructors"]);

                // Append instructor to course info
                // Append time slot to course info
            }

            // Data roll up:
            // 1a - add a course hash of the course info to the total courses hash
            //      (key is course num), add course to array list of courses for retrieval
            // 1b - get the hash of course info
            // 2  - append instructor to instructor array in course hash
            // 3  - add course info html structure to content
            // 4  - iterate through entire hash: pull course info and swap into html structure

        });

        $.map(courseMap, function(val, i) {
            console.log(val["title"] + " " + i);

            $("#content").append(resultBox);


            $(".courseNumber").last().html(val["catalog_number"]);
            $(".title").last().html(val["title"]);
            $(".description").last().html(val["description"]);
            $(".prof").last().html(val["instructors"]);
        });

        // TODO: This can be achieved by the above function.
        // TODO: This would display labs after lectures though (i.e. 110 then 110L)
        // TODO: which the above function does not do.
/*        for(var i = 0; i < courseListArray.length; i++) {
            var courseInfo = courseMap[courseListArray[i]];

            $("#content").append(resultBox);

            $(".courseNumber").last().html(courseListArray[i]);
            $(".title").last().html(courseInfo["title"]);
            $(".description").last().html(courseInfo["description"]);
            $(".prof").last().html(courseInfo["instructors"]);
        }*/

        $(".resultBox").fadeIn("slow");
    });  // end class box template load when
}

/**
 * Receives a course info hash map and list of instructors
 * Adds the list of instructors to the hash map as a string
 * @param courseInfo - hash map of course info
 * @param instructors - array list of instructors
 */
function appendInstructor(courseInfo, instructors) {
    if(instructors.length >= 1) {
        var instructorString = (courseInfo["instructors"] ? courseInfo["instructors"] : "");
        for(var i = 0; i < instructors.length; i++) {
            instructorString += instructors[i]["instructor"] + "<br>";
        }
        courseInfo["instructors"] = instructorString;
    }
}

/**
 * Opens the descriptive information for a class result
 * @param classBox The classBox HTML that was clicked on
 */
function displayClassInfo(classBox) {
    // Get the parent result box of the class header clicked on
    var clickedResultBox = jQuery(classBox).parent();

    // Get the child course info box of the class box clicked on
    var courseInfo = clickedResultBox.children(".courseInfo");

    // TODO: Remove these hard coded CSS changes
    if( courseInfo.is(":visible") ) {
        courseInfo.slideUp("fast");
        clickedResultBox.css("padding-bottom", "25px");
    } else {
        courseInfo.slideDown("fast");
        clickedResultBox.css("padding-bottom", "100px");
    }
}