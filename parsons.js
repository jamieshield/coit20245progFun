


/* Parsons */
        function displayErrors(fb) {
            if(fb.errors.length > 0) {
                alert(fb.errors[0]);
            }
        }
        function setupParsons(idd,initial) {
		console.log("mod Parsons"+idd)
		let div='<div height="100px" id="sortableTrash'+idd+'" class="sortable-code"></div><div id="sortable'+idd+'" class="sortable-code"></div><div style="clear:both;"></div><p><label id="newInstanceLink'+idd+'">New instance</label> &nbsp; &nbsp; <label id="feedbackLink'+idd+'"">Get feedback</label></p>';
		$(document).find("#"+idd).append(div);
		setupParsons_(idd,initial);
		//$(document).ready(function() { setupParsons_(idd,initial); });
	}


        function setupParsons_(idd,initial) {
            var parson = new ParsonsWidget({
                'sortableId': "sortable"+idd,
                'trashId': "sortableTrash"+idd,
                'max_wrong_lines': 1,
                'feedback_cb' : displayErrors
            });
            parson.init(initial);
	    //$(document).find("#sortable"+idd).css("min-height:
            parson.shuffleLines();
            $("#newInstanceLink"+idd).click(function(event){
                event.preventDefault();
                parson.shuffleLines();
            });
            $("#feedbackLink"+idd).click(function(event){
                event.preventDefault();
                parson.getFeedback();
            });
        }


