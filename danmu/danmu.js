//danmu bullet object
function bullet(size,color,opacity,speed,style,font){
    this.size = size;
    this.color = color;
    this.opacity = opacity;
    this.speed = speed;
    this.style = style;
    this.font = font;
}

//random color generator for danmu color
function randomNum(val){
    return Math.floor(Math.random() * val + 1);
}

function randomColor(){
    var r = randomNum(256);
    var g = randomNum(256);
    var b = randomNum(256);
    var color = "rgb(" + r + "," + g + "," + b +")";
    return color;
}

//clear button clear the screen 
function clearDanmu(){
    var danmu = document.getElementById("dm_screen");
    while(danmu.firstChild){
	danmu.removeChild(danmu.firstChild);
    }
}

//press enter can submit danmu rather than click the button
document.onkeydown = function() {
    if(window.event.keyCode == "13") {
	generateDanmu();
    }
}

//trivial functions that get the properties of danmu bullet
function getSize(){
    var speed = document.getElementById("fontSize").value;
    return speed;
}

function getColor(){
    var color = document.getElementById("fontColor").value;
    return color;
}

function getOpacity(){
    var opacity = document.getElementById("fontOpacity").value;
    return opacity;
}

function getSpeed(){
    var speed = document.getElementById("fontSpeed").value;
    return speed;
}

function getStyle(){
    var style = "";
    if(document.getElementById("default").checked)
        style = "default";
    else if (document.getElementById("bold").checked)
        style = "bold";
    else
        style = "italic";
    return style;
}

function getFont(){
    var font = document.getElementById("fontFamily").value;
    return font;
}


//create bullet object when user clicks save
function createBullet(){
    var size = getSize();
    var color = getColor();
    var opacity = getOpacity();
    var speed = getSpeed();
    var style = getStyle();
    var font = getFont();
    var myBullet = new bullet(size,color,opacity,speed,style,font);
    return myBullet;
}

//submit button create a new danmu and append it to the screen
function generateDanmu(){
    //get the input content
    var input = document.getElementById("input").value;
    //create a new textnode
    var text = document.createTextNode(input);
    if(input === "")
	alert("You must say something");
    else{
	//get the danmu element
	var danmu = document.getElementById("dm_screen");
	var page = document.getElementById("page");
	//create the danmu object	
	//create a span to wrap the textnode then apply style to it
	var container = document.createElement("div");
	container.appendChild(text);
	container.style.fontSize = "30px";
	container.style.color= randomColor();
	//put danmu at the rightmost place with random height
	var properHeight = danmu.offsetHeight - 40;
	var textTop = randomNum(properHeight)  + "px";
	var textLeft = danmu.offsetWidth + "px";
	container.style.position = "absolute";
	container.style.left = textLeft;
	container.style.top = textTop;
	//below line solved the wrapping of div element when its content goes out boundary
	container.style.whiteSpace = "nowrap"; //ignore whitespace in content and make it an line
	container.style.textOverflow = "ellipsis";//clip text goes out of boundary of div
	container.style.overflow = "hidden";//hidden overflow part in the div
	danmu.style.overflow = "hidden";//hidden overflow part in the danmu canvas
	danmu.appendChild(container);
	//get the style.left of the danmu 
	var pos = parseInt(textLeft);
	//set animation
	var interval = setInterval(frame,5);
	function frame(){
	    if (pos < -1 * container.offsetWidth) {
		//if go out of boundary danmu will disappear
		container.innerHTML = "";
		clearInterval(interval);
	    } else {
		pos--; 
		container.style.left = pos + 'px';  
	    }
	}
    }
    
    //clear the input area
    document.getElementById("input").value = "";
}

