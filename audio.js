let previousPosition = 0;

const play = () => {
    // https://github.com/Tonejs/Tone.js/issues/341#issuecomment-386725880
    if (Tone.context.state !== 'running') {
        Tone.context.resume();
    }

    // console.log('start');
    // Tone.Transport.start();
    // Tone.start();

    Tone.Transport.start(undefined, previousPosition);
};

const pause = () => {
    previousPosition = Tone.Transport.seconds;
    Tone.Transport.pause();
};

document.addEventListener('keydown', (event) => {
    if (event.repeat) return;
    if (event.code === 'Space') {
        if (Tone.Transport.state === 'started') {
            pause();
        } else {
            play();
        }
    }
});

const getBeat = () => {
    return Tone.Transport.ticks / Tone.Transport.PPQ;
}