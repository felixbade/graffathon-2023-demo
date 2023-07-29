function draw() {
    const beat = getBeat();

    // Resolution independent canvas
    translate(width / 2, height / 2);
    scale(height / 1000);

    background('hsl(60, 50%, 90%)');

    drawingContext.shadowColor = color('hsla(0, 0%, 0%, 0.3)');
    drawingContext.shadowBlur = 10;
    drawingContext.shadowOffsetX = 0;
    drawingContext.shadowOffsetY = 8;

    fill('hsl(15, 100%, 55%)');
    noStroke();
    const radius = map(sin(beat * TAU), -1, 1, 200, 300);
    ellipse(0, 0, radius, radius);

    push();
    fill('hsl(240, 100%, 75%)');
    rotate(beat * TAU / 4);
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

function noShadow() {
    drawingContext.shadowColor = color('hsla(0, 0%, 0%, 0.0)');
    drawingContext.shadowBlur = 0;

}