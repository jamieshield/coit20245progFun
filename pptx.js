
   function pptxToHtmlCallback(scripts) {
	   //console.log(scripts)
	//$(document).find("#hiddenProgs").append(scripts)
	   //let sc=document.createElement("script")
	   //$(document).append(sc)
	   //sc.innerHTML=scripth
	   let scrs=scripts.matchAll(/\<script\>[\s\S.]*?\<\/script\>/g)
	   for (let script of scrs) {
	   	let scrpt=script[0]
	   	//console.log(scrpt)
		   let sc=document.createElement('script')
	            scrpt=scrpt.replace(/\<\/script\>/,"\n")
		    scrpt=scrpt.replace(/\<script\>/,"\n")
		   sc.text = scrpt 
		   	console.log(scrpt)
		   document.head.appendChild(sc)
	   //processNotesScripts=processNotesScripts.replace(/\<\/script\>[.\s\S]*$/g,"< /script>")
		}

	console.log("// move the h5p activities")
   $(".notes").each(function (i,slide) {
	   //console.log(slide)
	let searchTxt=$(slide).html();
	   //console.log(searchTxt)
	for (let act of [...Array(17).keys()]) {
		let findtxt="{h5p:1-"+act+"}"
	   //console.log("-"+findtxt)
	   if (searchTxt.indexOf(findtxt)>=0) {
		   //console.log("found "+findtxt)
		let h5pact=$("#hiddenH5P1-"+act)
		   $(h5pact).css("display","block");
		   $(h5pact).css("background-color","red");
		$(slide).html(searchTxt.replace(findtxt,""));
		   $(h5pact).detach().appendTo($(slide))
	   }
	}
   });
	}

  function pptxFullscreenSetup() {
    $(function() {
		var oldWidth, oldMargin ,isFullscreenMode=false;
		$("#fullscreen-btn").on("click", function(){
			 			
			if(!isFullscreenMode){
				oldWidth = $("#result .slide").css("width");
				oldMargin = $("#result .slide").css("margin");
				$("#result .slide").css({
					"width": "99%",
					"margin": "0 auto"
				})
				$("#result").toggleFullScreen();
				isFullscreenMode = true;
			}else{
				$("#result .slide").css({
					"width": oldWidth,
					"margin": oldMargin
				})
				$("#result").toggleFullScreen();
				isFullscreenMode = false;
			}		
		});
		$(document).bind("fullscreenchange", function() {
			if(!$(document).fullScreen()){
				$("#result .slide").css({
					"width": oldWidth,
  					"margin": oldMargin
				})
			}
		});
    });
  }

function pptxLoadSlides(ppt) {
   $("#result").pptxToHtml({
	//pptxFileUrl: sample12,
	pptxFileUrl: ppt,
	//pptxFileUrl: "https://github.com/jamieshield/coit11241/raw/main/delme.pptx",
	//pptxFileUrl: "Sample_12.pptx",
	//fileInputId: "uploadFileInput",
	slideMode: false,
	keyBoardShortCut: false,
	slidesScale: 50,  /** percent*/
	slideModeConfig: {  //on slide mode (slideMode: true)
	    first: 1, 
	    nav: false, /** true,false : show or not nav buttons*/
	    navTxtColor: "white", /** color */
	    navNextTxt:"&#8250;", //">"
	    navPrevTxt: "&#8249;", //"<"
	    showPlayPauseBtn: false,/** true,false */
	    keyBoardShortCut: false, /** true,false */
	    showSlideNum: false, /** true,false */
	    showTotalSlideNum: false, /** true,false */
	    autoSlide: false, /** false or seconds (the pause time between slides) , F8 to active(keyBoardShortCut: true) */
	    randomAutoSlide: false, /** true,false ,autoSlide:true */ 
	    loop: false,  /** true,false */
	    background: "black", /** false or color*/
	    transition: "default", /** transition type: "slid","fade","default","random" , to show transition efects :transitionTime > 0.5 */
	    transitionTime: 1 /** transition time in seconds */
	}
   });

}

	  function deferPptx(method) {
		if (window.jQuery) {
			if (jQuery.fn.pptxToHtml) {
					// assume ppt loaded
					try {
						method(ppt);
					} catch(e) {
					  //e; // => ReferenceError
					  setTimeout(function() { deferPptx(method) }, 50);
					}
			} else {
				setTimeout(function() { deferPptx(method) }, 50);
			}
		} else {
			setTimeout(function() { deferPptx(method) }, 50);
		}

	}



