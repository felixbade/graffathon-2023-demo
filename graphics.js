function draw() {
    const beat = getBeat();

    // Resolution independent canvas
    translate(width / 2, height / 2);
    scale(height / 1000);

    background('hsl(330, 100%, 10%)');

    fill('hsl(15, 100%, 55%)');
    noStroke();
    const radius = map(sin(beat * TAU), -1, 1, 200, 300);
    ellipse(0, 0, radius, radius);

    push();
    fill('hsl(190, 100%, 75%)');
    rotate(beat * TAU / 4);
    rect(0, 0, 50, 800);
    pop();

    // use font
    textFont('Jost');
    // draw text
    fill('hsl(0, 0%, 100%)');
    noStroke();
    textSize(100);
    text('Hello, world!', 0, 0);
}