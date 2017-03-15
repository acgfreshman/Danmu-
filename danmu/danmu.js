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
function randomNum(lower, upper){
    return Math.floor(Math.random() * upper + lower);
}

function randomColor(){
    var r = randomNum(1,256);
    var g = randomNum(1,256);
    var b = randomNum(1,256);
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
    changeColor = true;
    var color = document.getElementById("fontColor").value;
    return color;
}

function getOpacity(){
    var opacity = document.getElementById("fontOpacity").value;
    return opacity/100;
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
//trivial functions that update option well according to user input
function updateSize(){
    document.getElementById("sizePanel").innerHTML = document.getElementById("fontSize").value;
    myBullet.size = getSize();
    updatePreview(myBullet);
}

function updateColor(){
    myBullet.color = getColor();
    updatePreview(myBullet);
}


function updateOpacity(){
    document.getElementById("opacityPanel").innerHTML = document.getElementById("fontOpacity").value + "%";
    myBullet.opacity = getOpacity();
    updatePreview(myBullet);
}

function updateSpeed(){
    document.getElementById("speedPanel").innerHTML = document.getElementById("fontSpeed").value;
    myBullet.speed = getSpeed();
    updatePreview(myBullet);
}

function updateStyle(){
    myBullet.style = getStyle();
    updatePreview(myBullet);
}

function updateFontFamily(){
    myBullet.font = getFont();
    updatePreview(myBullet);
}

//update the preview panel if the option is updated
function updatePreview(bullet){
    var content = "123ABC";
    generateCustom(content,bullet);
}

const fontToPixel = 1.425; //a constant converts fontSize to actual pixels in html page
//create default bullet object
var size = getSize();
var color = getColor();
var opacity = getOpacity();
var speed = getSpeed();
var style = getStyle();
var font = getFont() //record the browser default font depending on which browser is used
var myBullet = new bullet(size,color,opacity,speed,style,font);
var changeColor = false; //check if the color is changed otherwise use random color
//get a copy of default Bullet



//generate user customized bullet given the content and the bullet object
function generateCustom(content,bullet){
    var container = document.getElementById("previewPanel");
    container.innerHTML = content;
    container.style.fontSize = bullet.size + "px";
    container.style.color = bullet.color;
    container.style.opacity = bullet.opacity;
    if(bullet.style === "bold"){
	container.style.fontStyle = "normal";
	container.style.fontWeight = "bold";
    }
    else if (bullet.style === "italic"){
	container.style.fontStyle = "italic"
	container.style.fontWeight = "normal";
    }
    else {
	container.style.fontStyle = "normal";
	container.style.fontWeight = "normal";
    }
    if(bullet.font === "Roboto"){
	container.style.fontFamily = "Roboto,sans-serif";
    }
    else if(bullet.font === "Baloo Bhaina")
	container.style.fontFamily = "Baloo Bhaina, cursive";
    else
	container.style.fontFamily = "Times New Roman,Times,serif";
}
//define close button in the modal
function closeModal(){
//reset the input to default
    document.getElementById("fontSize").value = "30";
    document.getElementById("fontColor").value = "#000000";
    document.getElementById("fontOpacity").value = "100";
    document.getElementById("fontSpeed").value = "1";
    document.getElementById("default").checked = true;
    document.getElementById("bold").checked = false;
    document.getElementById("italic").checked = false;
    document.getElementById("fontBold").className = "btn btn-default fontStyleBold";
    document.getElementById("fontItalic").className = "btn btn-default fontStyleItalic";
    document.getElementById("fontDefault").className = "btn btn-default active";
    document.getElementById("fontFamily").value = "Default";
    
//update all the panel and bullet object
    updateSize();
    updateColor();
    updateOpacity();
    updateSpeed();
    updateStyle();
    updateFontFamily();
    changeColor = false;
}


//submit button create a new danmu and append it to the screen
function generateDanmu(){
    //get the input content
    var input = document.getElementById("input").value;
    if(input === "")
	alert("You must say something");
    else{
	createContainer(input);
    }
    //clear the input area
    document.getElementById("input").value = "";
}

//create bullet container in the danmu canvas
function createContainer(input){
    var text = document.createTextNode(input);
    //get the danmu element
    var danmu = document.getElementById("dm_screen");
    var page = document.getElementById("page");
    //create a span to wrap the textnode then apply style to it
    var container = document.createElement("div");
    container.appendChild(text);
    container.style.fontSize = myBullet.size + "px";
    if(!changeColor)
	container.style.color = randomColor();
    else
	container.style.color = myBullet.color;
    container.style.opacity = myBullet.opacity;
    if(myBullet.style === "bold"){
	container.style.fontStyle = "normal";
	container.style.fontWeight = "bold";
    }
    else if (myBullet.style === "italic"){
	container.style.fontStyle = "italic"
	container.style.fontWeight = "normal";
    }
    else {
	container.style.fontStyle = "normal";
	container.style.fontWeight = "normal";
    }
    if(myBullet.font === "Roboto"){
	container.style.fontFamily = "Roboto,sans-serif";
    }
    else if(myBullet.font === "Baloo Bhaina")
	container.style.fontFamily = "Baloo Bhaina, cursive";
    else
	container.style.fontFamily = "Times New Roman,Times,serif";
    //put danmu at the rightmost place with random height
    var fontPixel = Math.floor(myBullet.size * fontToPixel);
    var properHeight = danmu.offsetHeight - fontPixel;
    var textTop = randomNum(0,properHeight) + "px";
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
    var interval = setInterval(frame, myBullet.speed);
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
