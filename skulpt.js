

        var hackDontRepeat=[]
        function setupSkulpt(idd,prog,args) {
	  if (hackDontRepeat.indexOf(idd)>=0) { 
		  console.log("moreJs setupSkulp"+idd+" repeated")
		return }
	  hackDontRepeat=hackDontRepeat.concat([idd])
	  console.log("moreJs setupSkulp"+idd)
		//if ($(document).find("#"+idd).innerHTML!=undefined) {
			//console.log("skulpt already configured")
			//console.log($(document).find("#"+idd))
			//console.log($(document).find("#"+idd).innerHTML)
		//	return
		//}
	  //console.log(prog)
	    //console.log(typeof(Storage) !== "undefined")
		//console.log(localStorage.getItem("skulptIdeProgram"+idd))
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


	//console.log(idd);
	//console.log(prog);
	//console.log(template);
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
	console.log("more:hcpost"+hiddenCodePost)
	template=template.replaceAll("HIDDENTEXTPOST",hiddenCodePost)

	$(document).find("#"+idd).append(template);
	

	 //setup_($("#drawline").find(".button")[0],parms3)
	$(document).ready(function() { 
		for (let item of Object.keys(args)) {
			parms3[item]=args[item]
			//console.log(item+":"+args[item])
		}
		//console.log(JSON.parse(JSON.stringify(parms3)))
		//console.log(parms3)
		//if ($("#"+idd).find(".button")[0]==undefined) {
		//	return // pptxjs premature evals
		//}
		 setup_($("#"+idd).find(".button")[0],parms3)
		console.log("CodeMirror:"+args["height"])
		//template=template.replaceAll("20",args["rows"])
		//$(document).find("#"+idd).find(".CodeMirror").css("height:100%")
		//$(document).find("#"+idd).find(".editor").css("height",args["height"])
		 $(document).find("#"+idd).find(".CodeMirror").css("min-height",args["height"])
		 $(document).find("#"+idd).find(".CodeMirror").css("height",args["height"])
		 $(document).find("#"+idd).find(".CodeMirror").css("resize","both")
		 //console.log($("#"+idd).find(".button")[0])
	});
		
	}
	//setupSkulpt(idd,prog)


Sk.externalLibraries = {
      numpy : {
        //path: 'https://raw.githubusercontent.com/ebertmi/skulpt_numpy/master/numpy/__init__.js',
        //path: 'https://cdn.jsdelivr.net/gh/ebertmi/skulpt_numpy@master/dist/numpy/__init__.js',
        path: numpyJS,
      },
      'numpy.random' : {
        //path: 'https://raw.githubusercontent.com/ebertmi/skulpt_numpy/master/numpy/random/__init__.js',
        //path: 'https://cdn.jsdelivr.net/gh/ebertmi/skulpt_numpy@master/dist/numpy/random/__init__.min.js',
        path: numpyrandomJS,
      },
      matplotlib : {
        //path: 'https://raw.githubusercontent.com/ebertmi/skulpt_matplotlib/master/matplotlib/__init__.js',
        //path: 'https://cdn.jsdelivr.net/gh/ebertmi/skulpt_matplotlib@master/matplotlib/__init__.js',
        path: matplotlibJS,
      },
      'matplotlib.pyplot' : {
        //path: 'https://raw.githubusercontent.com/ebertmi/skulpt_matplotlib/master/matplotlib/pyplot/__init__.js',
        //path: 'https://cdn.jsdelivr.net/gh/ebertmi/skulpt_matplotlib@master/matplotlib/pyplot/__init__.js',
        path: matplotlibpyplotJS,
        dependencies: [
          //'https://raw.githubusercontent.com/ebertmi/skulpt_matplotlib/master/deps/d3.min.js',
          //'https://raw.githubusercontent.com/ebertmi/skulpt_matplotlib/master/deps/jquery.js',
        ],
      },
      'a.txt' : {
        path: "a.txt",
      },

    };



