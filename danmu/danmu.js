//random color generator for danmu color
function randomEightBit(){
    return Math.floor(Math.random() * 256 + 1);
}

function randomColor(){
    var r = randomEightBit();
    var g = randomEightBit();
    var b = randomEightBit();
    var color = "rgb(" + r + "," + g + "," + b +")";
    return color;
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
    //create the danmu object	
    //create a span to wrap the textnode then apply style to it
    var span = document.createElement("span");
    span.style.fontSize = "15px";
    span.style.color= randomColor();
    span.appendChild(text);
    //get the danmu element
    var danmu = document.getElementById("dm_screen");
    danmu.appendChild(span);	
    }
    //clear the input area
    document.getElementById("input").value = "";
}

//clear button clear the screen 
function clearDanmu(){
    var danmu = document.getElementById("dm_screen");
    while(danmu.firstChild){
	danmu.removeChild(danmu.firstChild);
    }
}    
