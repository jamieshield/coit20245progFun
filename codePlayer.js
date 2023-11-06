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
	for (let edit of actionsArray) {
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
					setCursor(player,edit.position)
				} else if (edit.start) {
					setSelection(player,edit.start,edit.end)
				} else {
					console.log("unkown edit:"+edit.type)
					console.log(edit)
				}
				break;
			//{"type":"insertText","text":"\n"}
			case "insertText":
				let text=edit.text
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
				del(player,repeat)
				break;

			//{"type":"deleteContentForward","repeat":2}
			case "deleteContentForward":
				delForward(player,repeat)
				break;
			default:
				console.log("unkown edit:"+edit.type)
				console.log(edit)
		}
		//await blink(player,1)
	}
	setMessage(player,"The end")
	await blink(player,10)
    } // while
}

