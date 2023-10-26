
/*
 * Requires: javascript and python generator
 * Requires: shared procedures
 */
//https://blocklycodelabs.dev/codelabs/getting-started/index.html?index=..%2F..index#5
function infrastructureBlockly() {
	javascript.javascriptGenerator.forBlock['play_sound'] = function(block) {
	  let value = '\'' + block.getFieldValue('VALUE') + '\'';
	  return 'MusicMaker.queueSound(' + value + ');\n';
	};
	python.pythonGenerator.forBlock['play_sound'] = function(block) {
	  let value = '\'' + block.getFieldValue('VALUE') + '\'';
	  return "# play "+value+"\n";
	  return 'MusicMaker.queueSound(' + value + ');\n';
	};

	// https://groups.google.com/g/blockly/c/uqaIw04orio 
		//block-shareable-procedures
	unregisterProcedureBlocks();
	Blockly.common.defineBlocks(blocks);
}
var workspaceDict=new Object();

 function runCode(divId) { // Blockly
	const div = document.getElementById(divId)
	const workspace = workspaceDict[divId].workspace
	const args = workspaceDict[divId].args
	let codePost = ""
	if (args!=undefined) {
		if (args.codePost!=undefined) {
			codePost=args.codePost
		}
	}	
	
      // Generate JavaScript code and run it.
      window.LoopTrap = 1000;
      javascript.javascriptGenerator.INFINITE_LOOP_TRAP =
          'if (--window.LoopTrap < 0) throw "Infinite loop.";\n';
      var code = javascript.javascriptGenerator.workspaceToCode(workspace);
      javascript.javascriptGenerator.INFINITE_LOOP_TRAP = null;
      try {
	const pythonCode = python.pythonGenerator.workspaceToCode(workspace);
	div.nextSibling.innerText="Python code:\n"+pythonCode
	const blockjson=Blockly.serialization.workspaces.save(workspace)
      } catch (e) {
	      // blocklyDiv serialisation error
        //alert(e);
      }
	code=code+codePost
      try {
        eval(code);
      } catch (e) {
        alert(e);
      }
    }

function setupBlockly(divId,startCode,workspaceOptions,css,args) {
	// https://github.com/google/blockly-samples/blob/master/examples/generator-demo/index.html
	const div=document.getElementById(divId)
	if (div.innerHTML!="") {
		return
	}
	const pythonOutput = document.createElement("pre")
	div.style=css
	div.parentNode.insertBefore(pythonOutput,div.nextSibling)
	const button = document.createElement("button")
	//button onclick="runCode('divId')" Run /button
	//button.id="button"+divId
	//$(button).onclick="runCode('"+divId+"');"
	$(button).click(function() { runCode(divId); });
	button.innerHTML="Run"
	div.parentNode.insertBefore(button,pythonOutput.nextSibling)

	const workspace = Blockly.inject(divId, workspaceOptions); //{toolbox: toolbox});
	workspaceDict[divId]={'workspace':workspace,'args':args};

	  Blockly.serialization.workspaces.load(startCode, workspace);
	//const jsCode = javascript.javascriptGenerator.workspaceToCode(workspace);
	let toolbox=workspaceOptions['toolbox']['contents']
	for (let item of toolbox) {
		if (item['type']=="allocate_variable") {
			workspace.registerButtonCallback(item['callbackKey'], function (button) {Blockly.Variables.createVariableButtonHandler(button.getTargetWorkspace(), null, item['vartype']);} );
		}
	}
}

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
 const MusicMaker = {
  queue_: [],
  player_: new Audio(),
  queueSound: function(soundUrl) {
    this.queue_.push(soundUrl);
  },
  play: function() {
    let next = this.queue_.shift();
    if (next) {
      this.player_.src = next;
      this.player_.play();
    }
  },
};

MusicMaker.player_.addEventListener(
    'ended', MusicMaker.play.bind(MusicMaker));

// Blockly
// https://blocklycodelabs.dev/codelabs/getting-started/index.html?index=..%2F..index#5
Blockly.common.defineBlocksWithJsonArray([
  {
    "type": "play_sound",
    "message0": "Play %1",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "VALUE",
        "options": [
          //"https://github.com/google/blockly-games/blob/master/third-party/soundfonts/piano/A3.mp3
          //["C4", "sounds/c4.m4a",
          ["C4", "https://github.com/google/blockly-games/raw/master/third-party/soundfonts/piano/C4.mp3"],
          ["D4", "https://github.com/google/blockly-games/raw/master/third-party/soundfonts/piano/D4.mp3"],
          ["E4", "https://github.com/google/blockly-games/raw/master/third-party/soundfonts/piano/E4.mp3"],
          ["F4", "https://github.com/google/blockly-games/raw/master/third-party/soundfonts/piano/F4.mp3"],
          ["G4", "https://github.com/google/blockly-games/raw/master/third-party/soundfonts/piano/G4.mp3"],
          //["D4", "sounds/d4.m4a"],
          //["E4", "sounds/e4.m4a"],
          //["F4", "sounds/f4.m4a"],
          //["G4", "sounds/g4.m4a"]
          ["click", "https://unpkg.com/blockly@10.2.2/media/click.mp3"],
          ["delete", "https://blockly-demo.appspot.com/static/media/delete.mp3"],
          ["disconnect", "https://blockly-demo.appspot.com/static/media/disconnect.wav"],
        ]
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 355
  }
]);

