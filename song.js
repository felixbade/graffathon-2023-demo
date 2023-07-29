
const bassDrum = new Tone.MembraneSynth({
    pitchDecay: 0.15,
    octaves: 2,
    oscillator: {
        type: "sine"
    },
    envelope: {
        attack: 0.015,
        decay: 1.2,
        sustain: 0.01,
        release: 1.4,
        attackCurve: "exponential"
    }
}).toDestination();

const hiHat = new Tone.NoiseSynth({
    noise: {
        type: 'white'
    },
    envelope: {
        attack: 0.005,
        decay: 0.1,
        sustain: 0
    },
    volume: -10
}).toDestination();


// define sequence in 16th notation
const hihatLoop = new Tone.Loop(time => {
    const qBeat = Math.floor(getBeat() * 4);
    let volume = -1 * (qBeat * 11 % 16) - 10;
    if (volume < -16) volume = -100;
    hiHat.volume.rampTo(volume, 0.01, time);
    hiHat.triggerAttackRelease("8n", time);
}, "16n");
hihatLoop.start();

// define sequence in 16th notation
const drumLoop = new Tone.Loop(time => {
    const beat = Math.floor(getBeat());
    // a tiny bit of volume variation
    bassDrum.volume.rampTo(-0.5 * (beat * 9 % 16), 0.1, time);
    bassDrum.triggerAttackRelease("D1", "8n", time);
}, "4n");
drumLoop.start();


// set tempo
Tone.Transport.bpm.value = 140;

let previousPosition = 0;

const play = () => {
    Tone.Transport.start(undefined, previousPosition);
};

const pause = () => {
    previousPosition = Tone.Transport.seconds;
    Tone.Transport.pause();
};

document.addEventListener('keydown', (event) => {
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
