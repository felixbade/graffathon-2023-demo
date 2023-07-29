let beat;
let backgroundColor;

let scaling;
let left
let right

const zenith = -500;
const bottom = 500;

function draw() {
    beat = getBeat();

    scaling = height / 1000;
    left = (-width / 2) / scaling;
    right = (width / 2) / scaling;

    // Resolution independent canvas
    translate(width / 2, height / 2);
    scale(scaling);
    backgroundColor = color('hsl(60, 30%, 80%)');
    background(backgroundColor);

    // use font
    textFont('Jost-Thin');

    // shadow(10);
    // drawingContext.shadowColor = color('hsla(0, 0%, 0%, 0.3)');

    if (beat < 16) {
        scene01();
    } else if (beat < 32) {
        scene02();
    } else if (beat < 48) {
        scene03();
    } else if (beat < 48) {
        scene04();
    } else if (beat < 64) {
        scene05();
    } else if (beat < 80) {
        scene06();
    } 
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

function circleArc(radius, arcAngle) {
    push();
    fill('hsl(15, 100%, 55%)');
    noStroke();
    arc(0, 0, radius, radius, 0, arcAngle);
    pop();
}

function circleOpen(radius, strokeW) {
    push();
    noFill();
    strokeWeight(strokeW);
    stroke('hsl(0, 0%, 0%)');
    ellipse(0, 0, radius - strokeW / 1, radius - strokeW / 1);
    pop();
}

function wobble(amount, phase) {
    //scale(sin((beat) * 8 + phase * TAU) * 0.5 + 1);
    translate(p5.Vector.fromAngle(beat * 1 + phase * TAU, amount));
}

function scene01() {
    const columns = 10;
    const rows = 6;
    const margin = 120;    

    for (let col = 0; col < columns; col++) {
        for (let row = 0; row < rows; row++) {
            const x = map(col, 0, columns - 1, left + margin, right - margin);
            const y = map(row, 0, rows - 1, zenith + margin, bottom - margin);
            push();

            translate(x, y);
            wobble(10, ((rows * col + row + 1) / (rows * columns)));
            circleArc(120, TAU * (sin(beat * TAU / 4)/2 + 0.5));
            circleOpen(120, 20 * (sin(beat * TAU / 4)/2 + 0.5));

            pop();

        }
    }

    push();
    fill('hsl(240, 90%, 40%)');
    rotateObject(0.5);
    rect(0, 0, 50, 800);
    pop();


    // draw text
    noShadow();

    fill('hsl(0, 5%, 5%)');
    noStroke();
    textSize(100);
    text('Hello, world!', beat * -700 + 1000, 400);

}

function scene02() {
    let beatSubtract = 16;
    fill('hsl(0, 5%, 5%)');
    noStroke();
    textSize(100);
    text('Form Follows Us', (beat - beatSubtract) * -700 + 1000, 400);
   
}

function scene03() {
    let beatSubtract = 32;
    fill('hsl(0, 5%, 5%)');
    noStroke();
    textSize(100);
    text('Minimal? Monotonous!', (beat - beatSubtract) * -700 + 1000, 400);

    
}

function scene04() {
    let beatSubtract = 48;
    fill('hsl(0, 5%, 5%)');
    noStroke();
    textSize(100);
    text('Palette Power', (beat - beatSubtract) * -700 + 1000, 400);

    
}

function scene05() {
    let beatSubtract = 64;
    fill('hsl(0, 5%, 5%)');
    noStroke();
    textSize(100);
    text('We are Overrated… Just Like This Design!', (beat - beatSubtract) * -700 + 1000, 400);

     
}

function scene06() {
    let beatSubtract = 80;
    fill('hsl(0, 5%, 5%)');
    noStroke();
    textSize(100);
    text('Yep, We’re That Pretentious', (beat - beatSubtract) * -700 + 1000, 400);

   
}
