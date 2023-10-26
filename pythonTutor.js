

/*
window.optOverride = {}
window.optOverride.frontendLang = 'py311'; // hacky override before including visualize.bundle.js
// trace to render on the page as a demo for new visitors:
// use python tutor and search netowrk for webexec.py
var chicken={"code": "print(\"chicken\")\nprint(\"little\")", "trace": [{"line": 1, "event": "step_line", "func_name": "<module>", "globals": {}, "ordered_globals": [], "stack_to_render": [], "heap": {}, "stdout": ""}, {"line": 2, "event": "step_line", "func_name": "<module>", "globals": {}, "ordered_globals": [], "stack_to_render": [], "heap": {}, "stdout": "chicken\n"}, {"line": 2, "event": "return", "func_name": "<module>", "globals": {}, "ordered_globals": [], "stack_to_render": [], "heap": {}, "stdout": "chicken\nlittle\n"}]};
window.optOverride.demoDat = {"code":"list1 = ['This is', 'the only tool']\nlist2 = ['that', 'lets', 'you', 'visually']\nprint(' '.join(list1 + list2))\nmyTuple = ('debug code', 'step-by-step!')\nprint(' '.join(myTuple))\nfruitSet = {'apple',\n            'banana',\n            'cherry',\n            'durian'}","trace":[{"line":1,"event":"step_line","func_name":"<module>","globals":{},"ordered_globals":[],"stack_to_render":[],"heap":{},"stdout":""},{"line":2,"event":"step_line","func_name":"<module>","globals":{"list1":["REF",1]},"ordered_globals":["list1"],"stack_to_render":[],"heap":{"1":["LIST","This is","the only tool"]},"stdout":""},{"line":3,"event":"step_line","func_name":"<module>","globals":{"list1":["REF",1],"list2":["REF",2]},"ordered_globals":["list1","list2"],"stack_to_render":[],"heap":{"1":["LIST","This is","the only tool"],"2":["LIST","that","lets","you","visually"]},"stdout":""},{"line":4,"event":"step_line","func_name":"<module>","globals":{"list1":["REF",1],"list2":["REF",2]},"ordered_globals":["list1","list2"],"stack_to_render":[],"heap":{"1":["LIST","This is","the only tool"],"2":["LIST","that","lets","you","visually"]},"stdout":"This is the only tool that lets you visually\n"},{"line":5,"event":"step_line","func_name":"<module>","globals":{"list1":["REF",1],"list2":["REF",2],"myTuple":["REF",3]},"ordered_globals":["list1","list2","myTuple"],"stack_to_render":[],"heap":{"1":["LIST","This is","the only tool"],"2":["LIST","that","lets","you","visually"],"3":["TUPLE","debug code","step-by-step!"]},"stdout":"This is the only tool that lets you visually\n"},{"line":6,"event":"step_line","func_name":"<module>","globals":{"list1":["REF",1],"list2":["REF",2],"myTuple":["REF",3]},"ordered_globals":["list1","list2","myTuple"],"stack_to_render":[],"heap":{"1":["LIST","This is","the only tool"],"2":["LIST","that","lets","you","visually"],"3":["TUPLE","debug code","step-by-step!"]},"stdout":"This is the only tool that lets you visually\ndebug code step-by-step!\n"},{"line":6,"event":"return","func_name":"<module>","globals":{"list1":["REF",1],"list2":["REF",2],"myTuple":["REF",3],"fruitSet":["REF",4]},"ordered_globals":["list1","list2","myTuple","fruitSet"],"stack_to_render":[],"heap":{"1":["LIST","This is","the only tool"],"2":["LIST","that","lets","you","visually"],"3":["TUPLE","debug code","step-by-step!"],"4":["SET","banana","durian","cherry","apple"]},"stdout":"This is the only tool that lets you visually\ndebug code step-by-step!\n"}]};

*/

var py$,pytutor;
function hackpy($,pytutor_1,demoTrace) {
	console.log("hackpy")
	py$=$
	pytutor=pytutor_1
/*
$(document).ready(function () {
    var demoViz = new pytutor_1.ExecutionVisualizer('demoViz', demoTrace, { embeddedMode: true,
        lang: 'py36',
        startingInstruction: 10 });
    // redraw connector arrows on window resize
    $(window).resize(function () {
        demoViz.redrawConnectors();
    });
    demoViz.redrawConnectors(); // redraw once at the end to line up connectors
});

$(document).ready(function () {
    //var demoViz2 = new pytutor_1.ExecutionVisualizer('demoViz2', window.optOverride.demoDat , { //embeddedMode: true,
    var demoViz2 = new pytutor_1.ExecutionVisualizer('demoViz2', chicken, { //embeddedMode: true,
        lang: 'py311',
        verticalStack: true,
        startingInstruction: 0 });
    // redraw connector arrows on window resize
    $(window).resize(function () {
        demoViz2.redrawConnectors();
    });
    demoViz2.redrawConnectors(); // redraw once at the end to line up connectors
});
*/
}

function pythonTutor(divId,startingInstruction,lang,stackTraceJson) {
	console.log("pythonTutor")
	//if ($(document).find('#'+divId).innerHTML!="") {
	//	//console.log("pythonTutor already configured"+$(document).find('#'+divId).innerHTML!="")
	//	return
	//}


	py$(document).ready(function () {
    var demoViz2 = new pytutor.ExecutionVisualizer(divId, stackTraceJson, { //embeddedMode: true,
        lang: lang, //'py311',
        verticalStack: true,
        startingInstruction: startingInstruction });
    // redraw connector arrows on window resize
    $(window).resize(function () {
        demoViz2.redrawConnectors();
    });
    demoViz2.redrawConnectors(); // redraw once at the end to line up connectors
});


}

function cleanUnprintable(txt) {                                                           
	txt=txt.replaceAll(/___[\s\S.]*/g,'')
	txt=txt.replaceAll(/“/g,'"')
	txt=txt.replaceAll(/”/g,'"')
	txt=txt.replace(/‘/g,"'")
	txt=txt.replace(/’/g,"'")
	//txt=txt.replace(/\n/g,"<br/>")
	txt=txt.replace(/&lt;/g,"<")
	txt=txt.replace(/&gt;/g,">")
	//console.log(txt)
	return txt                                                                 
}
