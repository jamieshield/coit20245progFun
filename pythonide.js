/*****
*
*   Typical usage:
* 
*   <form> 
*   <textarea id="code" cols="40" rows="10">import turtle
*
*   t = turtle.Turtle()
*   t.forward(100)
*
*   print "Hello World" 
*   </textarea><br /> 
*   <button type="button" onclick="runit()">Run</button> 
*   </form> 
*   <pre id="output" ></pre> 
*   <div id="canvas"></div> 
*
*   < script>
*       setupPythonIDE('code','output','canvas');
*   </ script>
*   JS modified to allow multiple IDEs in a page based on button
**/


// These will hold handles to asynchronous code that skulpt sets up. We need them to
// implement the stopit function
var intervalFuncVars = [];
var timeoutFuncVars = [];

// Stops any asynchronous functions still running
var stopit = function () {
	//let prog=$(button).closest(".maindiv")
    for (var i = 0; i < intervalFuncVars.length; i++) {
        window.clearInterval (intervalFuncVars[i]);
    }
    intervalFuncVars = [];
    for (var i = 0; i < timeoutFuncVars.length; i++) {
        window.clearTimeout (timeoutFuncVars[i]);
    }
    timeoutFuncVars = [];
}


// Capture the uncaught exception handler
var saveUncaughtException = Sk.uncaughtException;


// Must capture the setInterval function so that processing errors
// are caught and sent to the output and so we know which asynchronous
// processes were started
var oldSetInterval = window.setInterval;
var oldSetTimeout = window.setTimeout;

var restoreAsync = function () {
    window.setInterval = setInterval = oldSetInterval;
    window.setTimeout = setTimeout = oldSetTimeout;
}

//
// Temporary functions  overwritten by setupPythonIDE
//

// Runs the program loaded in the editor
var runit = function (button) {};

// Clears the output (both text and graphical)
var clearit = function (button) {};

// Sets the contents of the editor to program
var setProgram = function (button,program) {}

// Returns the contents of the editor
var getProgram = function (button) {}

// The codemirror editor
//var editor;
var editr={}

// 
// Call this function after setting up a <textarea> for the program (id=codeId),
// a <pre> for text output (id=outputId) and a <div> for the graphical output (id = canvasId).
// It creates a codemirror-based text editor, and several functions for managing the 
// skulpt based python environment (runit,stopit,clearit,setProgram,getProgram)
//
function setupPythonIDE (button,codeId,outputId,canvasId) {
	//	let prog=$(button).closest(".maindiv")

    codeId = codeId || 'code';         // Id of a <textarea> where the code is edited
    outputId = outputId || 'output';   // Id of a <pre> tag where the output of the code is printed
    canvasId = canvasId || 'canvas';   // Id of a <div> where graphical output is to be presented

    // output functions are configurable.  This one just appends some text
    // to a pre element.
    function setup_outf(button) {
	    return function outf(text) { 
		let prog=$(button).closest(".maindiv")
		//var mypre = document.getElementById(outputId); 
		//var mypre = prog.find("#"+prog[0]+"_"+outputId)[0]; 
		var mypre = prog.find("#"+prog[0].id+"_"+outputId)[0]; 
		mypre.innerHTML = mypre.innerHTML + text; 
	    }
    } 


    // What to use to read from input
    function builtinRead(x) {
        if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][x] === undefined)
                throw "File not found: '" + x + "'";
        return Sk.builtinFiles["files"][x];
    }


    // Clears outputId and canvasId
    clearit = function (button) {
	let prog=$(button).closest(".maindiv")
        stopit();
        //var mypre = document.getElementById(outputId); 
        //var mypre = prog.find("#"+prog[0].id+"_"+outputId)[0]; 
        console.log("#"+prog[0].id+"_"+outputId); 
        var mypre = $(document).find("#"+prog[0].id+"_"+outputId)[0]; 
        //var mypre = document.getElementById("#"+prog[0].id+"_"+outputId); 
	console.log(mypre)
        mypre.innerHTML = "";   
        //var can = document.getElementById(canvasId);
        //var can = prog.find("#"+prog[0].id+"_"+canvasId)[0];
        var can = prog.find("#"+prog[0].id+"_"+canvasId)[0];
        //var can = document.getElementById("#"+prog[0].id+"_"+canvasId)[0];
        can.innerHTML = "";     
    }

    

    // Here's everything you need to run a python program in skulpt
    // grab the code from your textarea
    // get a reference to your pre element for output
    // configure the output function
    // call Sk.importMainWithBody()
    runit = function (button) { 
	let prg=$(button).closest(".maindiv")
	let hiddencodePre=$(prg).find(".hiddenCodePre").text()
	let hiddencodePost=$(prg).find(".hiddenCodePost")
	console.log("pide:"+hiddencodePost)
	hiddencodePost=hiddencodePost.text()
	console.log("pide:"+hiddencodePost)

        stopit();
        clearit(button);

        //var prog = editor.getValue(); 
        var prog = editr[prg[0].id].getValue(); 
	var progWithHiddenCode = hiddencodePre+"\n"+prog+"\n"+hiddencodePost;
	console.log("pide:proHidden"+progWithHiddenCode)

        //var mypre = document.getElementById(outputId); 
        var mypre = prg.find("#"+prg[0].id+"_"+outputId)[0]; 
        mypre.innerHTML = ''; 
        Sk.pre = prg[0].id+"_"+outputId;
        Sk.canvas = prg[0].id+"_"+canvasId;
        //var can = document.getElementById(Sk.canvas);
        var can = prg.find("#"+Sk.canvas)[0];
        can.style.display = 'table';
        if (can) {
           can.width = can.width;
           if (Sk.tg) {
               Sk.tg.canvasInit = false;
               Sk.tg.turtleList = [];
           }
        }
        Sk.configure({output:setup_outf(button), read:builtinRead}); 
        (Sk.TurtleGraphics || (Sk.TurtleGraphics = {})).target = prg[0].id+"_"+canvasId;


        window.setInterval = setInterval = function (f,t) {
            var handle = 
            oldSetInterval (function () {
                try {
                    f()
                } catch (err) {
                    // Report error and abort
                    restoreAsync();
                    setup_outf(button)(err.toString());
                    stopit();
                }
            },t);
            intervalFuncVars.push(handle);
        }


        window.setTimeout = setTimeout = function (f,t) {
            var handle = 
            oldSetTimeout (function () {
                try {
                    f();
                } catch (err) {
                    // Report error and abort
                    restoreAsync();
                    setup_outf(button)(err.toString());
                    stopit();
                }
            },t);
            timeoutFuncVars.push(handle);
        }

        // Capture the error message
        Sk.uncaughtException = function (e) {
            var msg = e.toString();
            setup_outf(button)(msg);
            stopit();
            restoreAsync();
            saveUncaughtException(e);
        }

        var myPromise = Sk.misceval.asyncToPromise(function() {
            return Sk.importMainWithBody("<stdin>", false, progWithHiddenCode, true);
        });

        myPromise.then(function(mod) {
        // console.log('success');
        },
           Sk.uncaughtException 
        );

        // Restore the old setInterval function
        restoreAsync();
    } 

    //
    // Replace the textarea by a codemirror editor
    // 
    function createEditor (button) {
	let prog=$(button).closest(".maindiv")
        //var textarea = document.getElementById(codeId);
        var textarea = prog.find("#"+codeId)[0];
	//console.log(textarea)
        //editor = CodeMirror.fromTextArea(textarea, {
        //console.log(prog[0].id)
        editr[prog[0].id] = CodeMirror.fromTextArea(textarea, {
            mode: {name: "python",
                   version: 2,
                   singleLineStringErrors: false
               },
            lineNumbers: true,
            textWrapping: false,
            indentUnit: 4,
            indentWithTabs: false,
            fontSize: "10pt",
            autoMatchParens: true,
            matchBrackets: true,
            theme: "solarized",
            extraKeys:{
                Tab: function (cm) {
                    if (cm.doc.somethingSelected()) {
                        return CodeMirror.Pass;
                    }
                    var spacesPerTab = cm.getOption("indentUnit");
                    var spacesToInsert = spacesPerTab - (cm.doc.getCursor("start").ch % spacesPerTab);    
                    var spaces = Array(spacesToInsert + 1).join(" ");
                    cm.replaceSelection(spaces, "end", "+input");
                }
            }
        });
        
    }

    //createEditor ();
    createEditor (button);

    // export the function to get contents of the editor
    //getProgram = function (button) { return editor.getValue() };
    getProgram = function (button) { 
	let prog=$(button).closest(".maindiv")
	return editr[prog[0].id].getValue() 
    };

    // export the function to set the contents of the editor
    //setProgram = function (prog) { editor.setValue(prog); }
    setProgram = function (button,prog) { 
	let prg=$(button).closest(".maindiv")
	editr[prg[0].id].setValue(prog); 
    }
}
