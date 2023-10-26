        function setupSkulpt(idd,prog,args) {
		//if ($(document).find("#"+idd).innerHTML!=undefined) {
		//	return
		//}
	 let parms3 = {
		program :  // Initial skulpt program to show in the editor
		    //typeof(Storage) !== "undefined" && localStorage.getItem("skulptIdeProgram"+idd) ||
		 prog,
/*
		     ["from processing import *",
		    "",
		    "def draw():",
		    "    line(0,0,100,100)",
		    "",
		    "run()"].join("\n"),
*/
		 programName: //typeof(Storage) !== "undefined" && localStorage.getItem("skulptIdeProgramName"+idd) ||
            idd+".py", //"saveprogram.py",
		noTitle: false,  // Whether to hide the title
		noOutput: false, // Whether to hide the output panel
		autoRun: false, // Whether to run the initial program after load
		hideIde: false,  // Whether to hide the IDE buttons if autoRun is true
		showUrl: false,  // Whether to show an interactive button for showing an url for this sketch
	    };

	let template=`
    <div class="maindiv" id="drawline">
        <div class="IDE">
            <div id="title">
                <!--h3>Online Python development environment</h3-->
            </div>
            <div id="menu">
                <label class="button" onclick="newProgram(this)">New</label> 
                <label class="button" onclick="runProgram(this)">Run</label> 
                <label class="button" onclick="stopit(this)">Stop</label> 
                <label class="button" onclick="clearit(this)">Clear</label> 
                <label class="button" for="loadfile">Upload</label>
                    <input type="file" id="loadfile" name="files[]" style="visibility:hidden;display:none;" onchange="loadit(this)"></input>
                
                <label class="button" onclick="saveit(this)">Download as</label>
                <input id="savefilename" type="text" value="program.py"/>
                <br/><br/>
            </div> <!-- menu -->
        </div> <!-- IDE -->
	    <div id="outputpanel">
		<h4 class="IDE">Output</h4>
		<pre id="drawline_output">...</pre> 
	    </div>
        
        <div id="centralarea">
            <div id="drawline_canvas">
            </div>
            <div class="editor IDE">
                <textarea id="code" cols="60" rows="20">
                </textarea><br /> 
            </div>
        </div>
       <div style="display:none; "class="hiddenCodePre">HIDDENTEXTPRE</div>
       <div style="display:none; "class="hiddenCodePost">HIDDENTEXTPOST</div>
    

    <div id="showurl" style="display:none;">
        <label class="button" onclick="showUrl()">Show URL for this sketch</label><br/>
        <a id="myurl" href="" title=""></a>
    </div>
    </div> <!-- mainDIV -->
	`;


	template=template.replaceAll("drawline",idd)
	template=template.replaceAll("program.py",idd+".py")

	let hiddenCodePre=args["hiddenCodePre"]
	if (args["hiddenCodePre"]==undefined) {
		hiddenCodePre=""
	}
	template=template.replaceAll("HIDDENTEXTPRE",hiddenCodePre)

	let hiddenCodePost=args["hiddenCodePost"]
	if (args["hiddenCodePost"]==undefined) {
		hiddenCodePost=""
	}
	template=template.replaceAll("HIDDENTEXTPOST",hiddenCodePost)

	$(document).find("#"+idd).append(template);
	

	 //setup_($("#drawline").find(".button")[0],parms3)
	$(document).ready(function() { 
		for (let item of Object.keys(args)) {
			parms3[item]=args[item]
		}
		//if ($("#"+idd).find(".button")[0]==undefined) {
		//	return // pptxjs premature evals
		//}
		 setup_($("#"+idd).find(".button")[0],parms3)
		//template=template.replaceAll("20",args["rows"])
		//$(document).find("#"+idd).find(".CodeMirror").css("height:100%")
		//$(document).find("#"+idd).find(".editor").css("height",args["height"])
		 $(document).find("#"+idd).find(".CodeMirror").css("min-height",args["height"])
		 $(document).find("#"+idd).find(".CodeMirror").css("height",args["height"])
		 $(document).find("#"+idd).find(".CodeMirror").css("resize","both")
	});
		
	}
	//setupSkulpt(idd,prog)


Sk.externalLibraries = {
      numpy : {
        //path: 'https://raw.githubusercontent.com/ebertmi/skulpt_numpy/master/numpy/__init__.js',
        path: 'https://cdn.jsdelivr.net/gh/ebertmi/skulpt_numpy@master/dist/numpy/__init__.js',
      },
      'numpy.random' : {
        //path: 'https://raw.githubusercontent.com/ebertmi/skulpt_numpy/master/numpy/random/__init__.js',
        path: 'https://cdn.jsdelivr.net/gh/ebertmi/skulpt_numpy@master/dist/numpy/random/__init__.min.js',
      },
      matplotlib : {
        //path: 'https://raw.githubusercontent.com/ebertmi/skulpt_matplotlib/master/matplotlib/__init__.js',
        path: 'https://cdn.jsdelivr.net/gh/ebertmi/skulpt_matplotlib@master/matplotlib/__init__.js',
      },
      'matplotlib.pyplot' : {
        //path: 'https://raw.githubusercontent.com/ebertmi/skulpt_matplotlib/master/matplotlib/pyplot/__init__.js',
        path: 'https://cdn.jsdelivr.net/gh/ebertmi/skulpt_matplotlib@master/matplotlib/pyplot/__init__.js',
        dependencies: [
          //'https://raw.githubusercontent.com/ebertmi/skulpt_matplotlib/master/deps/d3.min.js',
          //'https://raw.githubusercontent.com/ebertmi/skulpt_matplotlib/master/deps/jquery.js',
        ],
      },
    };


