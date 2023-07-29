let beat;
let backgroundColor;

function draw() {
    beat = getBeat();

    // Resolution independent canvas
    translate(width / 2, height / 2);
    const scaling = height / 1000;
    scale(scaling);
    const left = (-width / 2) / scaling;
    const right = (width / 2) / scaling;
    const top = -500;
    const bottom = 500;
    backgroundColor = color('hsl(60, 30%, 80%)');
    background(backgroundColor);

    // shadow(10);
    // drawingContext.shadowColor = color('hsla(0, 0%, 0%, 0.3)');

    const columns = 8;
    const rows = 6;
    const margin = 120;
    for (let col = 0; col < columns; col++) {
        for (let row = 0; row < rows; row++) {
            const x = map(col, 0, columns - 1, left + margin, right - margin);
            const y = map(row, 0, rows - 1, top + margin, bottom - margin);
            push();

            translate(x, y);
            wobble(10, ((rows * col + row + 1) / (rows * columns)));
            circle01(120);
            circleOpen(120);

            pop();

        }
    }

    push();
    fill('hsl(240, 90%, 40%)');
    rotateObject(0.5);
    rect(0, 0, 50, 800);
    pop();


    // use font
    textFont('Jost-Thin');
    // draw text
    noShadow();

    fill('hsl(0, 5%, 5%)');
    noStroke();
    textSize(100);
    text('Hello, world!', beat * -700 + 1000, 400);
}

function shadow(strength) {
    //drawingContext.shadowColor = color('hsla(0, 0%, 0%, strength)');
    drawingContext.shadowBlur = strength;
    drawingContext.shadowOffsetX = 0;
    drawingContext.shadowOffsetY = strength * 0.8;
}
function noShadow() {
    drawingContext.shadowColor = color('hsla(0, 0%, 0%, 0.0)');
    drawingContext.shadowBlur = 0;
}

function rotateObject(speed) {
    rotate(beat * TAU / 4 * speed);
}

function scaleObject() {

}

function circle01(radius) {
    push();
    fill('hsl(15, 100%, 55%)');
    noStroke();
    ellipse(0, 0, radius, radius);
    blendMode(BLEND);
    fill(backgroundColor);
    rect(radius/2, radius/2, radius / 1, radius / 1);
    pop();
}

function circleOpen(radius) {
    push();
    noFill();
    strokeWeight(2);
    stroke('hsl(0, 0%, 0%)');
    ellipse(0, 0, radius, radius);

    pop();
}

function wobble(amount, phase) {
    //scale(sin((beat) * 8 + phase * TAU) * 0.5 + 1);
    translate(p5.Vector.fromAngle(beat * 1 + phase * TAU, amount));
}