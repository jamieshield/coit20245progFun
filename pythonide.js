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

// https://github.com/skulpt/skulpt/issues/855
function loadDependency(filename) {
     return new Promise(function(resolve, reject) {
         var scriptElement = document.createElement("script");
         scriptElement.type = "text/javascript";
         scriptElement.src = filename;
         scriptElement.onload = function() {
              // we don't really care about the return type but a bool will do. 
              resolve(true);
         }
         scriptElement.onerror = function() {
               resolve(false);
         }
         document.body.appendChild(scriptElement);
    });
}


    // What to use to read from input
    function builtinRead(x) {
	console.log("read "+x)
	// https://github.com/skulpt/skulpt/issues/855
	/*
	 let filename=x
	 if (filename in externalLibraries) {
	     console.log("ext "+JSON.stringify(externalLibraries))
             var extLib = externalLibs[filename];
		console.log("external "+extLib)
             if (typeof extLib === "string") {
                  fileToLoad = extLib;
                  dependencies = [];
             } else {
                  fileToLoad = extLib.path;
                  dependencies = extLib.dependencies;
             }

             return Sk.misceval.promiseToSuspension(
                 // load the dependencies in order, this because in your example
                 // highcharts-more requires highchairs to be loaded but you can also
                 // imagine a situation where you want to load them in parallel 
                 // you could use Promise.all for those situations.
                 dependencies
                     .reduce(function (acc, filename) {
                         return acc.then(function() {
                             return loadDependency(fileName);
                         });
                     }, Promise.resolve())
                     .then(fetch(fileToLoad))
                     .then(r => r.text())
            );
        }
*/
	if (x=="a.txt") { return "Hello world\n"; }
	//console.log(Sk.builtinFiles["files"][x])
        Sk.builtinFiles["files"]['src/lib/hashlib.py'] = `
# https://github.com/ajalt/python-sha1/blob/master/README.md
#from __future__ import print_function
import struct
import io

try:
    range = xrange
except NameError:
    pass


def _left_rotate(n, b):
    """Left rotate a 32-bit integer n by b bits."""
    return ((n << b) | (n >> (32 - b))) & 0xffffffff


def _process_chunk(chunk, h0, h1, h2, h3, h4):
    """Process a chunk of data and return the new digest variables."""
    assert len(chunk) == 64

    w = [0] * 80

    # Break chunk into sixteen 4-byte big-endian words w[i]
    for i in range(16):
        w[i] = struct.unpack(b'>I', chunk[i * 4:i * 4 + 4])[0]

    # Extend the sixteen 4-byte words into eighty 4-byte words
    for i in range(16, 80):
        w[i] = _left_rotate(w[i - 3] ^ w[i - 8] ^ w[i - 14] ^ w[i - 16], 1)

    # Initialize hash value for this chunk
    a = h0
    b = h1
    c = h2
    d = h3
    e = h4

    for i in range(80):
        if 0 <= i <= 19:
            # Use alternative 1 for f from FIPS PB 180-1 to avoid bitwise not
            f = d ^ (b & (c ^ d))
            k = 0x5A827999
        elif 20 <= i <= 39:
            f = b ^ c ^ d
            k = 0x6ED9EBA1
        elif 40 <= i <= 59:
            f = (b & c) | (b & d) | (c & d)
            k = 0x8F1BBCDC
        elif 60 <= i <= 79:
            f = b ^ c ^ d
            k = 0xCA62C1D6

        a, b, c, d, e = ((_left_rotate(a, 5) + f + e + k + w[i]) & 0xffffffff,
                         a, _left_rotate(b, 30), c, d)

    # Add this chunk's hash to result so far
    h0 = (h0 + a) & 0xffffffff
    h1 = (h1 + b) & 0xffffffff
    h2 = (h2 + c) & 0xffffffff
    h3 = (h3 + d) & 0xffffffff
    h4 = (h4 + e) & 0xffffffff

    return h0, h1, h2, h3, h4


class Sha1Hash(object):
    """A class that mimics that hashlib api and implements the SHA-1 algorithm."""

    name = 'python-sha1'
    digest_size = 20
    block_size = 64

    def __init__(self):
        # Initial digest variables
        self._h = (
            0x67452301,
            0xEFCDAB89,
            0x98BADCFE,
            0x10325476,
            0xC3D2E1F0,
        )

        # bytes object with 0 <= len < 64 used to store the end of the message
        # if the message length is not congruent to 64
        self._unprocessed = b''
        # Length in bytes of all data that has been processed so far
        self._message_byte_length = 0

    def update(self, arg):
        """Update the current digest.

        This may be called repeatedly, even after calling digest or hexdigest.

        Arguments:
            arg: bytes, bytearray, or BytesIO object to read from.
        """
        if isinstance(arg, (bytes, bytearray)):
            arg = io.BytesIO(arg)

        # Try to build a chunk out of the unprocessed data, if any
        chunk = self._unprocessed + arg.read(64 - len(self._unprocessed))

        # Read the rest of the data, 64 bytes at a time
        while len(chunk) == 64:
            self._h = _process_chunk(chunk, *self._h)
            self._message_byte_length += 64
            chunk = arg.read(64)

        self._unprocessed = chunk
        return self

    def digest(self):
        """Produce the final hash value (big-endian) as a bytes object"""
        return b''.join(struct.pack(b'>I', h) for h in self._produce_digest())

    def hexdigest(self):
        """Produce the final hash value (big-endian) as a hex string"""
        return '%08x%08x%08x%08x%08x' % self._produce_digest()

    def _produce_digest(self):
        """Return finalized digest variables for the data processed so far."""
        # Pre-processing:
        message = self._unprocessed
        message_byte_length = self._message_byte_length + len(message)

        # append the bit '1' to the message
        message += b'\\x80' # JS

        # append 0 <= k < 512 bits '0', so that the resulting message length (in bytes)
        # is congruent to 56 (mod 64)
        message += b'\\x00' * ((56 - (message_byte_length + 1) % 64) % 64) #JS\\

        # append length of message (before pre-processing), in bits, as 64-bit big-endian integer
        message_bit_length = message_byte_length * 8
        message += struct.pack(b'>Q', message_bit_length)

        # Process the final chunk
        # At this point, the length of the message is either 64 or 128 bytes.
        h = _process_chunk(message[:64], *self._h)
        if len(message) == 64:
            return h
        return _process_chunk(message[64:], *h)


def _sha1(data):
    """SHA-1 Hashing Function

    A custom SHA-1 hashing function implemented entirely in Python.

    Arguments:
        data: A bytes or BytesIO object containing the input message to hash.

    Returns:
        A hex SHA-1 digest of the input message.
    """
    return Sha1Hash().update(data).hexdigest()

def sha1(data):
    return Sha1Hash().update(data)

`
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
	//console.log("pide:"+JSON.stringify(hiddencodePost))
	hiddencodePost=hiddencodePost.text()
	//console.log("pide:"+JSON.stringify(hiddencodePost))

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
        Sk.configure({output:setup_outf(button), read:builtinRead }); 
	    //,__future__: Sk.python3
	//Sk.python3 = true
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
