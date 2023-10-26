
    // Obtain the url parameter with name theParameter. Returns false
    // if not specified.
    function getParameter(theParameter) {
        var params = window.location.search.substr(1).split('&');

        for (var i = 0; i < params.length; i++) {
            var p=params[i].split('=');
            if (p[0] == theParameter) {
                if (p.length>1)
                    return p[1]; 
                else
                    return true;
            }
        }
        return false;
    }

    // Saves the current state to the browser's store
    function storeProgram (button) {
	let prog=$(button).closest(".maindiv")
	//console.log(prog[0].id)
        localStorage.setItem("skulptIdeProgram"+prog[0].id, getProgram(button));

        //localStorage.setItem("skulptIdeProgramName"+prog, document.getElementById("savefilename").value);
        localStorage.setItem("skulptIdeProgramName"+prog[0].id, prog.find("#savefilename")[0].value);
    }

    // Callback for "run"
    function runProgram(button) {
        storeProgram(button);
        runit(button);
    }

    // Callback for "new"
    function newProgram(button) {
	let prog=$(button).closest(".maindiv")
        //if (changeCount!=0) {
            var yes = confirm ("Are you sure you want to start a new sketch?");
            if (!yes) return;
        //} 
        clearit(button);
        setProgram(button,"");
        //changeCount = 0;
        //document.getElementById("savefilename").value = "saveprogram.py";
        prog.find("#savefilename")[0].value = "saveprogram.py";
    }

    // Callback for "load"
    function loadit(input) {
	let prog=$(input).closest(".maindiv")
	// Fix

        var components = input.value.split("/");
        if (components.length < 2) components = input.value.split("\\");
        var filename = components [components.length-1];
        var fileobj = input.files[0];
        var reader = new FileReader();

        // Closure to capture the file information.
        reader.onload = (function (theFile) {
            return function (e) {
                var text = e.target.result;
                setProgram(input,text);
                storeProgram(input);
                // clear the input element so that a new load on the same file will work
                input.value = "";
                //document.getElementById("savefilename").value = filename;
                prog.find("#savefilename")[0].value = filename;
            };
        }) (fileobj);

        // Read in the file as a data URL.
        reader.readAsText(fileobj);
    }

    // Callback for "download as"
    function saveit(button) {
	let prog=$(button).closest(".maindiv")

        var data = getProgram(button);
        //var filename = document.getElementById("savefilename").value;
        var filename = prog.find("#savefilename")[0].value;
        var blob = new Blob([data], {type: "text/plain;charset=utf-8"});
        saveAs(blob, filename);
        changeCount = 0;
    }

    // Setup 
    function setup (button,parms) {
	//let prog=$(button).closest(".maindiv")

        // Setup skulpt and editor
        setupPythonIDE(button,'code','output','canvas');

        // Arrange for counting the total number of changes
        //editor.on('change', function(cm) {changeCount++;});

        // Set the initial program
	//console.log("in setup")
	//console.log(parms.program)
        setProgram (button,parms.program);

        // Reset the change Counter
        //changeCount = 0;

        // Arrange to run it automatically if requested
        if (parms.autoRun) {
            //setTimeout(function() { runit(button) }, 50)
            $(document).ready(function() { runit(button); });
        }
    }

    

    // Loads program from a given url using XMLHttprequest (must be on the same domain)
    function loadUrl (button,parms,url) {
        function reqListener () {
            //console.log(url+" loaded");
            parms.program = this.responseText;
            setup (button,parms);
        }

        var oReq = new XMLHttpRequest();
        oReq.addEventListener("load", reqListener);
        oReq.open("GET", url); 
        oReq.send();
    }

    // Includes an encoded url for this sketch at the bottom of the screen
    function showUrl(button,parms) {
	let prog=$(button).closest(".maindiv")

        var link = document.URL;
        var i = link.indexOf("?");
        if (i>=0) link = link.substr(0,i);
        var pgm = getProgram(button); 
        var s1 = LZString.compressToEncodedURIComponent(pgm);
        var s2 = encodeURIComponent(pgm);
        if (s1.length<s2.length)
            link = link+"?lzsrc="+s1;
        else 
            link = link+"?source="+s2;
        if (parms.autoRun) link = link+"&autorun";
        if (parms.hideIde) link = link+"&hideide";
        if (parms.noTitle) link = link+"&notitle";        
        if (parms.noOutput) link = link+"&nooutput";
        $("#myurl").attr("href",link).text(link);
    }

    function setup_(button,parms) {
	//console.log("setup_")
	//console.log(parms.program)
	let prog=$(button).closest(".maindiv")

	    // Load the program name into the box
	    //document.getElementById("savefilename").value = parms.programName;
	    prog.find("#savefilename")[0].value = parms.programName;

	    // Whether to start the program immediately
	    parms.autoRun = getParameter("autorun") || getParameter("autoRun");

	    // Whether to hide the IDE 
	    parms.hideIde = getParameter("hideide") || getParameter("hideIde") ||
                    getParameter("noide") || getParameter("noIde");

	    // Whether to hide the title 
	    parms.noTitle = getParameter("notitle") || getParameter("noTitle");

	    // Whether to hide the output panel 
	    parms.noOutput = getParameter("nooutput") || getParameter("noOutput");

	    // Whether to show the "showurl" button
	    parms.showUrl = getParameter("showurl") || getParameter("showUrl");

	    // Unhide the showurl div if requested
	    if (parms.showUrl) {
		//document.getElementById("showurl").style.display = "inline";
		prog[0].getElementById("showurl").style.display = "inline";
	    }

	    // Hide the title div if requested
	    if (parms.noTitle) {
		//document.getElementById("title").style.display = "none";
		prog[0].getElementById("title").style.display = "none";
	    }

	    // Hide the outputpanel div if requested
	    if (parms.noOutput) {
		//document.getElementById("outputpanel").style.display = "none";
		prog[0].getElementById("outputpanel").style.display = "none";
	    }

	    // See if there is a source program encoded in the url
	    var source = getParameter ("source");
	    if (source) { 
		parms.program = decodeURIComponent(source); 
	    }
	    var lzsource = getParameter("lzsrc");
	    if (lzsource) {
		parms.program = LZString.decompressFromEncodedURIComponent(lzsource);
	    }

	    // Whether to hide interface
	    if (parms.hideIde) {
		//var elements = document.getElementsByClassName('IDE');
		var elements = prog[0].getElementsByClassName('IDE');
		for(var i=0; i<elements.length; i++) {
		    elements[i].style.display = "none";
		}
	    }

	    // Load an external program if its url is passed as parameter 'program'
	    var programUrl = getParameter("program");
	    if (programUrl) {
		// Load from file
		programUrl = decodeURIComponent(programUrl);
		var components = programUrl.split("/")
		//document.getElementById("savefilename").value = components[components.length-1];
	        prog.find("#savefilename")[0].value = components[components.length-1];
		loadUrl (button,parms,programUrl);
	    } 
	    else { 
		// Load the initial program
		//console.log("setup")
		//console.log(parms.program)
		setup(button,parms);
	    }

	    // Prevent silently navigating away from the IDE
	    window.onbeforeunload = function() {
		//if (changeCount==0) return null;
		return "Have you saved your program?";
	    }

	    // Try to save the program to local storage before leaving
		// FIX
	    window.onunload = storeProgram(button);

	}

	//console.log($("#drawline").find(".button")[0])
	//setup_($("#drawline").find(".button")[0],parms1)
	//setup_($("#drawline2").find(".button")[0],parms2)


