let myFont;
function preload() {
	// myFont = loadFont('LondrinaSolid-Regular.ttf');
}

function setup() {
    pixelDensity(displayDensity());
    createCanvas(windowWidth, windowHeight);
    windowResized();
    rectMode(CENTER);
    textAlign(CENTER, CENTER);
    // textFont(myFont);
}

function windowResized() {
    const windowAspectRatio = windowWidth / windowHeight;
    const canvasAspectRatio = 16 / 9;

    let width, height;
    if (windowAspectRatio > canvasAspectRatio) {
        height = windowHeight;
        width = windowHeight * canvasAspectRatio;
    } else {
        width = windowWidth;
        height = windowWidth / canvasAspectRatio;
    }

    resizeCanvas(width, height);
    redraw();
}