/* use
 * setupCodePlayer("convertTempCP",`[{"type":"settext","text":"print((32 - 32) * (5/9))\nprint((50 - 32) * (5/9)) \n","mess":"Add header"},{"type":"caret","position":0},{"type":"insertText","text":"\n"},{"type":"caret","position":0},{"type":"insertText","text":"\n"},{"type":"caret","position":0},{"type":"insertText","text":"def convert_","split":true},{"type":"pause","delay":1199},{"type":"insertText","text":"temperature():","split":true},{"type":"insertText"},{"type":"insertText","text":"    pass","split":true},{"type":"pause","delay":4280},{"type":"caret","start":37,"end":61},{"type":"pause","delay":4226,"mess":"Find common code"},{"type":"caret","start":31,"end":35},{"type":"insertText","text":"print((32 - 32) * (5/9))"},{"type":"pause","delay":2368,"mess":"Add parameters"},{"type":"caret","position":24},{"type":"insertText","text":"fa","split":true},{"type":"pause","delay":1106},{"type":"insertText","text":"hrenheit","split":true},{"type":"pause","delay":2000,"mess":"Parameterise code"},{"type":"caret","position":48},{"type":"deleteContentForward","repeat":2},{"type":"insertText","text":"fahrenheit","split":true},{"type":"pause","delay":1247},{"type":"caret","start":41,"end":47},{"type":"pause","delay":5000,"mess":"Add return"},{"type":"insertText","text":"return ","split":true},{"type":"caret","position":74},{"type":"deleteContentBackward"},{"type":"pause","delay":3894},{"type":"caret","position":75},{"type":"pause","delay":2240},{"type":"caret","start":4,"end":23},{"type":"pause","delay":1307,"mess":"Convert to function calls"},{"type":"caret","position":81},{"type":"insertText","text":"convert_temperature"},{"type":"caret","start":103,"end":118},{"type":"insertText","text":"))","split":true},{"type":"caret","position":112},{"type":"insertText","text":"convert_temperature"},{"type":"caret","start":134,"end":149},{"type":"insertText","text":"))","split":true}]`,10)

 */
function Player(player) {
	updateDiv(player)
	return player
}
function setCursor(player,cursor) {
	player.cursor=cursor
	delete player.start
	delete player.end
	updateDiv(player)
}
function getCursor(player) {
	return player.cursor
}

function deleteSelection(player) {
	player.text=player.text.substring(0,player.start)+player.text.substring(player.end)
	player.cursor=player.start
	delete player.start
	delete player.end
	updateDiv(player)
}

function setSelection(player,start,end) {
	player.start=start
	player.end=end
	delete player.cursor
	updateDiv(player)
}

let SPACE_CHAR="!"

function indexOfAll(haystack,needle) {
	// https://stackoverflow.com/questions/56446308/get-all-occurrences-of-a-substring-in-a-very-big-string
	const str = haystack;
	const searchKeyword = needle;

	const startingIndices = [];

	let indexOccurence = str.indexOf(searchKeyword, 0);

	while(indexOccurence >= 0) {
	    startingIndices.push(indexOccurence);

	    indexOccurence = str.indexOf(searchKeyword, indexOccurence + 1);
	}
	return startingIndices
}

console.assert(JSON.stringify(indexOfAll("aba aba","ba"))==JSON.stringify([1,5]),"test starting indices 1,5")
console.assert(JSON.stringify(indexOfAll("\naba aba","\naba"))==JSON.stringify([0]),"test starting indices newline")

function closestTo(needle,haystack) {
	closest=haystack[0]
	delta=Math.abs(haystack[0]-needle)
	for (let [i,v] of haystack.entries()) {
		if (Math.abs(v-needle)<delta) {
			closest=haystack[i]
			delta=Math.abs(v-needle)
		}
	}
	return closest
}

console.assert(closestTo(4,[1,4,6])==4,"closest =")
console.assert(closestTo(4,[1,3,6])==3,"closest 3 4")
console.assert(closestTo(4,[1,3,4,6])==4,"closest 3,4 4")
console.assert(closestTo(4,[1,5,6])==5,"closest 5 5")


function resolveContext(player,edit,type) {
	let contextChars=20
	start=0
	end=0
	if (player.hasOwnProperty("cursor")) {
		start=player.cursor
		end=player.cursor
	} else {
		start=player.start
		end=player.end
	}
	startFloor=Math.max(start-contextChars,0)
	console.assert(startFloor>=0,"startFloor>=0 "+startFloor)
	console.assert(startFloor>=0,"start>=0 "+start)
	let text=getText(player)
	endCeiling=Math.min(text.length,end+contextChars)
	if (edit.hasOwnProperty('context')) {
		/*
			contextChars=10
			player.text="abc def ghi     abc def ghi" 
			player2.text="zabc def ghi     abc def ghi"  tc2
			player.cursor=5 // d
			edit.context="abc def gh"
			startFloor=0
			edit.contextStartDiff=5
 
                 */	
		fromStart=-1
		startingIndices=[]
		while (fromStart*2<edit.context.length && startingIndices.length==0) {
			fromStart=fromStart+1
			let needle=edit.context.substring(fromStart,edit.context.length-fromStart)
			let haystack=text
			console.log(haystack)
			console.log(needle)
			startingIndices=indexOfAll(haystack,needle) // 0, 15 or something; tc2: 1,16
			// find number closest to startFloor
		}
		console.log(startingIndices)
		closest=closestTo(startFloor,startingIndices) // 0, testcase 2: 1
		newCursor=closest+edit.contextStartDiff // 5=0+5 tc2: 6=1+5
		console.log(newCursor)
		console.log(closest)
		console.log(edit)
		if (edit.hasOwnProperty("position")) {
			console.assert(player.hasOwnProperty("cursor"),"player has a cursor")
			//console.assert(edit.position==newCursor,"newCursor same "+edit.position+"=="+newCursor+JSON.stringify(edit))
			edit.position=newCursor
		} else {
			//if (player.hasOwnProperty("start")) {
				console.assert(player.hasOwnProperty("start"),"player has a selection"+JSON.stringify(edit))
				cursorDiff=newCursor-edit.start
				edit.end=edit.end+cursorDiff
				console.assert(edit.start==newCursor,"newCursor same "+edit.start+"=="+newCursor)
				edit.start=newCursor
			//} else {
			//}
		}
		
	} else {
		edit.context=text.substring(startFloor,endCeiling)
		edit.contextStartDiff=start-startFloor // 20
	}
	return edit
}
function insertChar(player,char) {
	if (player.hasOwnProperty('start')) {
		deleteSelection(player)
	}
	if (char==' ') { char=SPACE_CHAR }
	player.text=getText(player).substring(0,getCursor(player))+char+getText(player).substring(getCursor(player))
	setCursor(player,getCursor(player)+1)
	updateDiv(player)
}

function setText(player,text) {
	player.text=text
	player.cursor=0
	delete player.start
	delete player.end
	updateDiv(player)
}
function getText(player) {
	return player.text
}

function cursorToggle(player) {
	player.cursorOn=!player.cursorOn
	updateDiv(player)
}

function updateDiv(player) {
	let text=player.text
	//console.log(text)
	if (player.hasOwnProperty('cursor')) {
		if (player.cursorOn) {
			if (text[player.cursor]=='\n') {
				text=text.substring(0,player.cursor)+"<span style='background-color: yellow;'>&nbsp;</span>"+text.substring(player.cursor)
			} else {
				text=text.substring(0,player.cursor)+"<span style='background-color: yellow;'>"+text[player.cursor]+"</span>"+text.substring(player.cursor+1)
			}

		}
	} else { // no multiline selections yets
		let start=text.substring(0,player.start)
		let mid=text.substring(player.start,player.end+1)
		let end=text.substring(player.end+1)
		if (text[player.end]=='\n') {
			mid=text.substring(player.start,player.end)
			text=start+"<span style='background-color: yellow;'>"+mid+"</span>\n"+end

		} else {
			text=start+"<span style='background-color: yellow;'>"+mid+"</span>"+end
		}
			//}

	}
	text=text.replaceAll('\n','<br/>')
	text=text.replaceAll(SPACE_CHAR,'&nbsp;')
	player.editor.innerHTML=text
	let message="&nbsp;"
	if (player.hasOwnProperty("message")) {
		message=player.message+ "&nbsp;"
	}
	text="<h3>"+message+"</h3>"
	player.messageDiv.innerHTML=text
}

function setMessage(player,message) {
	player.message=message
	updateDiv(player)
}

function quickblink(player,delayOn,delayOff) {
	cursorToggle(player)
}

var CODE_PLAYERSPEED=20 // delay
var codePlayerSpeed=CODE_PLAYERSPEED // delay
var codePlayerPause=false // delay
async function ticktock(player) {
   let variation=400
   let delay=codePlayerSpeed*(1+(Math.random()*variation)/200)
   await new Promise(r => setTimeout(r, delay));
}
async function blink(player,times) {
	let delayOn=10
	let delayOff=delayOn
	let speed=codePlayerSpeed
	delayOn=delayOn*codePlayerSpeed
	delayOff=delayOff*codePlayerSpeed
	for (let i=1; i<=times; i++) {
		cursorToggle(player)
		await new Promise(r => setTimeout(r, delayOn));
		//quickblink(player,delay,delay)
		cursorToggle(player)
		await new Promise(r => setTimeout(r, delayOff));
	}
}
function delForward(player,numChars) {
	//console.log('delForward')
	//console.log(player)
	//console.log(numChars)
	if (numChars==0) { return }
	player.cursor=player.cursor+1
	del(player,1)
	//console.log(player.cursor)
	delForward(player,numChars-1)
}

function del(player,numChars) {
	//console.log(player)
	let delay=30
	let variation=delay*30
	if (numChars==0) { return }
	player.text=player.text.substring(0,player.cursor-1)+player.text.substring(player.cursor)
	player.cursor=player.cursor-1
	//console.log(player.cursor)
	quickblink(player,delay*(1+(Math.random()*variation)/100),0)
	del(player,numChars-1)
}

async function setupCodePlayer(divIdPlayer,edits,maxlines) {
	edits=edits.replaceAll("\\t"," ")
	edits=edits.replaceAll("¶","\\n")
	edits=edits.replaceAll("\n","\\n")
	edits=edits.replaceAll("\r","")
	//console.log(edits)
	let actionsArray=JSON.parse(edits)
	//console.log(actionsArray)
	//let textarea=document.getElementsByClassName("edit")[0]
	let playerDiv=document.getElementById(divIdPlayer)
	playerDiv.style.minheight=maxlines*20+"px"
	playerDiv.innerHTML=`<div>
	<button onclick="codePlayerSpeed=codePlayerSpeed/2; console.log(codePlayerSpeed); if (codePlayerSpeed<0) { codePlayerSpeed=0;}  ">Faster</button>
	<button onclick="codePlayerSpeed++; codePlayerSpeed=codePlayerSpeed*2; console.log(codePlayerSpeed); if (codePlayerSpeed<0) { codePlayerSpeed=0;}  ">Slower</button>
	<button onclick="codePlayerPause=true;  ">Stop</button>
	<button onclick="codePlayerPause=false;">Go</button>
	<div class="codePlayerMessage" style=""></div>
	<div class="codePlayerPlayer" style="min-height: 200px; font-family:monospace"></div>
`
	let editor=playerDiv.getElementsByClassName("codePlayerPlayer")[0]
	let messageDiv=playerDiv.getElementsByClassName("codePlayerMessage")[0]
	//let orig=textarea.value
	//editor.innerText=orig

    let player = Player({'editor':editor,'messageDiv':messageDiv,'cursor':0,'text':"",'cursorOn':false})
    while (true) {
	//setText(player,orig)
	for (let [editi,edit] of actionsArray.entries()) {
		while (codePlayerPause) {
			await blink(player,1)
		}
		let repeat=1
		if (edit.hasOwnProperty('repeat')) { repeat=edit.repeat }
		switch (edit.type) {
			case "settext":
				setMessage(player,edit.mess)
				setText(player,edit.text)
				await blink(player,4)
				//setMessage(player,"")
				break;
			//{"type":"caret","position":0}
			case "caret":
				if (edit.hasOwnProperty('position')) {
					resolveContext(player,edit)
					setCursor(player,edit.position)
					actionsArray[editi]=resolveContext(player,edit)
				} else if (edit.start) {
					resolveContext(player,edit)
					setSelection(player,edit.start,edit.end)
					actionsArray[editi]=resolveContext(player,edit)
				} else {
					console.log("unkown edit:"+edit.type)
					console.log(edit)
				}
				break;
			//{"type":"insertText","text":"\n"}
			case "insertText":
				let text=edit.text
				//actionsArray[editi]=resolveContext(player,edit)
				if (!edit.hasOwnProperty("text")) { text="\n" }
				// bring to top for async
				let blinkEvery=20
				let every=1
				for (let char of text) {
					every=every%blinkEvery
					if (every==1) { 
						//await blink(player,1)
					}
					
					let delay=1
					let variation=delay*30
					insertChar(player,char)
					quickblink(player,delay*(1+(Math.random()*variation)/100),0)
					await ticktock(player)
					//await new Promise(r => setTimeout(r, variation));
				}
				break;
			//{"type":"pause","delay":1980}
			case "pause":
				if (edit.hasOwnProperty("mess")) {
					setMessage(player,edit.mess)
					//await blink(player,3)
				}
				await blink(player,edit.delay/2000)
				//setMessage(player,"")
				break;
			//{"type":"deleteContentBackward"}
			case "deleteContentBackward":
				//actionsArray[editi]=resolveContext(player,edit)
				del(player,repeat)
				break;

			//{"type":"deleteContentForward","repeat":2}
			case "deleteContentForward":
				//actionsArray[editi]=resolveContext(player,edit)
				delForward(player,repeat)
				break;
			default:
				console.log("unkown edit:"+edit.type)
				console.log(edit)
		}
		//await blink(player,1)
	}
	setMessage(player,"The end")
	console.log(JSON.stringify(actionsArray))
	await blink(player,10)
    } // while
}

