let myFont;
function preload() {
	// myFont = loadFont('LondrinaSolid-Regular.ttf');
}

function setup() {
    pixelDensity(displayDensity());
    createCanvas(windowWidth, windowHeight);
    rectMode(CENTER);
    textAlign(CENTER, CENTER);
    // textFont(myFont);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    redraw();
}