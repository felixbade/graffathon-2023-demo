let beat;
let backgroundColor;
const almostBlack = 'hsl(240, 5%, 5%)';
const almostWhite = 'hsl(60, 30%, 80%)';
const reddishOrange = 'hsl(20, 80%, 55%)';
const trueBlue = 'hsl(200, 80%, 45%)';
let scaling;
let left
let right

const zenith = -500;
const bottom = 500;

function draw() {
    beat = getBeat() + 0;

    scaling = height / 1000;
    left = (-width / 2) / scaling;
    right = (width / 2) / scaling;

    // Resolution independent canvas
    translate(width / 2, height / 2);
    scale(scaling);
    backgroundColor = almostWhite
    background(backgroundColor);
    textAlign(CENTER);

    // use font
    textFont('Jost');

    // shadow(10);
    // drawingContext.shadowColor = color('hsla(0, 0%, 0%, 0.3)');

    if (beat === 0) {
        infoScene();
    } else if (beat < 16) {
        scene01(reddishOrange);
    } else if (beat < 32) {
        scene02();
    } else if (beat < 48) {
        scene03();
    } else if (beat < 64) {
        scene02();
    } else if (beat < 80) {
        scene03();
    } else if (beat < 96) {
        scene01(trueBlue);
    } else if (beat < 112) {
        scene04();
    } else if (beat < 128) {
        scene05();
    } else if (beat < 144) {
        scene06();
    } else {
        endDemo();
    }
}

function infoScene() {
    push();
    textAlign(LEFT);
    textSize(100);
    textFont('Jost-Bold');
    text('Press F to go fullscreen', -400, -80);
    text('Press SPACE to start', -400, 80);
    noStroke();
    fill(almostBlack);
    rect(-460, 0, 3, 400);
    rect(-480, 0, 3, 400);

    // x1, y1, x2, y2
    // rectMode(CORNERS);
    // rect(-460, -150, -463, 550);
    // rect(-480, -150, -483, 550);
    // rectMode(CENTER);
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
    fill(reddishOrange);
    noStroke();
    ellipse(0, 0, radius, radius);
    pop();
}

function circleArc(radius, arcAngle) {
    push();
    noStroke();
    arc(0, 0, radius, radius, 0, arcAngle);
    pop();
}

function circleArcStroked(radius, arcAngle1, arcAngle2, strokeW) {
    push();
    noFill();
    strokeWeight(strokeW);
    stroke(almostBlack);
    arc(0, 0, radius, radius, arcAngle1, arcAngle2);
    pop();
}

function circleOpen(radius, strokeW) {
    push();
    noFill();
    strokeWeight(strokeW);
    stroke(almostBlack);
    ellipse(0, 0, radius - strokeW / 1, radius - strokeW / 1);
    pop();
}

function wobble(amount, phase) {
    scale(pow(sin((beat) * 8 + phase * TAU) * 0.5 + 1), 1);
    translate(p5.Vector.fromAngle(beat * TAU / 4, amount));
}

function randomTranslation(amount) {
    translate((random(amount)) - amount / 2, (random(amount)) - amount / 2);
}

function randomRotation(amount) {
    rotate(random(amount));
}

function unstableOrange(amount) {
    const redHue = round(20 + random(amount) - amount / 2);
    fill(`hsl(${redHue}, 80%, 55%)`);
    // fill('hsl(30, 80%, 55%)');
}

function scene01(fillColor) {
    const columns = 10;
    const rows = 6;
    const margin = 120;

    for (let col = 0; col < columns; col++) {
        for (let row = 0; row < rows; row++) {
            const x = map(col, 0, columns - 1, left + margin, right - margin);
            const y = map(row, 0, rows - 1, zenith + margin, bottom - margin);
            push();
            const cellNumber = rows * col + row + 1;
            translate(x, y);

            textSize(20);
            fill(almostBlack);
            push();
            randomTranslation(5);
            text((beat + cellNumber).toFixed(1), 80, 80);
            pop();
            wobble(10, (cellNumber / (rows * columns)));
            fill(fillColor);
            circleArc(120, TAU * (sin(beat * TAU / 8)/2 + 0.5) * (cellNumber / (rows * columns)));
            circleOpen(120 + random(beat / 1), 20 * (sin(beat * TAU / 8)/1 + 0.0));
            pop();
        }
    }
    if (beat >= 80) {
        textFont('Jost');
        textSize(120);
        text('If you are reading this, we are already too popular', (beat - 80) * -300 + 1200, 400);

    }
}

function scene02() {
    push();
    let beatSubtract = 16;
    fill(almostBlack);
    noStroke();
    textSize(50);
    rotate(TAU / 4 * 3);
    textAlign(left);
    textFont('Jost-Bold');

    if (beat < 18) {
        text('Step aside, we are here', 0, left + 150);
    } else if (beat < 20) {
        text('Perfection? Pish!', 0, left + 150);
    } else if (beat < 22) {
        text('Form follows failure', 0, left + 150);
    } else if (beat < 24) {
        text('Yep, we are that pretentious', 0, left + 150);
    } else if (beat < 26) {
        text('Should have escaped the \'apostrophes\'', 0, left + 150);
    } else if (beat < 32) {
        text('Bonus points for Bold, right?', 0, left + 150);
    } else if (beat > 32) {
        textSize(40);
        text('Your message here? Please contact our sales team.', 0, left + 150);
    }
    strokeWeight(2);
    stroke(almostBlack);
    line(bottom - 40, left + 90, zenith + 40, left + 90);
    line(bottom - 40, left + 100, zenith + 40, left + 100);
    strokeWeight(6);
    line(bottom - 40, left + 210, zenith + 40, left + 210);
    pop();

    push();
    noStroke();
    // fill(reddishOrange);
    unstableOrange(beat / 1 - beatSubtract);
    rect(400, 0, 1200, 1000)
    pop();

    textFont('Jost');
    textSize(800);
    // textAlign(left);
    fill(almostWhite);
    push();
    randomTranslation(random(beat - 16));
    // randomRotation(random(beat / 500));
    text(beat.toFixed(0), 300, 0);
    pop();
    let decimals = (beat * 1e10).toFixed().slice(-10);
    textFont('Jost-Thin');
    textSize(120);
    fill(almostBlack);
    text(decimals, 350, 400);
}

function scene03() {
    let beatSubtract = 32;

    if ((beat * 8) % 16 <= 1) {
        fill('white');
    } else {
        fill(almostBlack);

    }
    const circleRadius = 700
    const circleOffset = 40 + sin(beat) * 15;
    push();
    randomTranslation(random(beat));
    circleArc(circleRadius, TAU * (sin(beat * TAU / 16)/2 + 0.5))
    randomTranslation(random(beat));

    circleArcStroked(circleRadius + circleOffset, TAU * (sin((beat))/2 + 0.5), TAU * (sin(beat * TAU / 16)/2 + 0.5), 1)
    randomTranslation(random(beat));
    circleArcStroked(circleRadius + circleOffset, TAU * (sin((beat + 0.5))/2 + 0.5), TAU * (sin(beat * TAU / 64)/2 + 0.5), 1)
    randomTranslation(random(beat));
    circleArcStroked(circleRadius + circleOffset * 2, TAU * (sin(beat * TAU / 64)/2 + 0.5), TAU * (cos(beat * TAU / 16)/2 + 0.5) - PI/2, 1)
    randomTranslation(random(beat));
    circleArcStroked(circleRadius + circleOffset * 3, TAU * (sin((beat))/2 + 0.5) - PI/2, TAU * (sin(beat * TAU / 16)/2 + 0.5) - PI, 1)
    pop();

    textFont('Jost-Thin');
    textSize(50);
    fill(almostBlack);
    text(circleOffset, 500, -390);
    text((1/circleOffset), -500, 390);
    textFont('Jost');

    text((beat.toFixed(0)), -0, 400);

    fill(almostBlack);
    noStroke();
    textSize(100);
    text('Minimal. Monotonous.', (beat - beatSubtract) * -700 + 1000, 400);
}

function scene04() {
    let beatSubtract = 112;
    fill(almostBlack);
    noStroke();
    textSize(100);
    text('If you are reading this, we are already too popular', (beat - 80) * -700 + 1000, 400);
}

function scene05() {
    let beatSubtract = 64;
    fill(almostBlack);
    noStroke();
    textSize(100);
    text(' ', (beat - beatSubtract) * -700 + 1000, 400);
}

function scene06() {
    let beatSubtract = 80;
    fill(almostBlack);
    noStroke();
    textSize(100);
    text(' ', (beat - beatSubtract) * -700 + 1000, 400);
}
