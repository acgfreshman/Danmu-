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



