Tone.Transport.bpm.value = 140;

const lowpass = new Tone.Filter({
    frequency: 1000,
    type: 'lowpass',
    rolloff: -12,
    Q: 5,
    gain: 0
});

var lfo = new Tone.LFO({
    frequency: Tone.Time('1m').toFrequency(),
    type: 'sine',
    min: 100,
    max: 20000
}).connect(lowpass.frequency);
lfo.start();





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
});

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
}).connect(lowpass);


// define sequence in 16th notation
const hihatLoop = new Tone.Loop(time => {
    const qBeat = Math.floor(getBeat() * 4);
    let volume = -1 * (qBeat * 11 % 16) - 10;
    if (volume < -16) volume = -100;
    hiHat.volume.rampTo(volume - 6, 0.01, time);
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


const doorCloseSound = new Tone.Player(
    './sounds/9876__heigh-hoo__car_door_closed.aiff',
);
doorCloseSound.volume.value = -10;

const bodyImpactSound = new Tone.Player(
    './sounds/221626__moodpie__body_impact.wav'
);
bodyImpactSound.volume.value = -10;

const doorLoop = new Tone.Loop(time => {
    const qBeat = Math.floor(getBeat() * 4);
    let volume = -1 * (qBeat * 5 % 16) - 10;
    if (volume > -16) {
        doorCloseSound.start(time);
        doorCloseSound.volume.rampTo(volume, 0.01, time);
    }
}, '8n');
doorLoop.start();

// 4n loop but delayed by 16n
const bodyImpactLoop = new Tone.Loop(time => {
    const beat = Math.floor(getBeat());
    // Only play the close door sound every 4th bass drum hit
    if (beat % 4 === 3) {
        bodyImpactSound.start(time);
    }
}, '4n');
bodyImpactLoop.start();



// Create an FMSynth (Frequency Modulation Synth) and connect it to the master output (speakers)
const synth = new Tone.FMSynth({
    harmonicity: 1,
    modulationIndex: 10,
    oscillator: {
      type: 'sine',
    },
    envelope: {
      attack: 0.01,
      decay: 0.01,
      sustain: 1,
      release: 0.01,
    },
    modulation: {
      type: 'sawtooth',
    },
    modulationEnvelope: {
      attack: 0.5,
      decay: 0,
      sustain: 1,
      release: 0.5,
    },
  });

  // Bassline - notes for a repetetive techno pattern with slight variation
  const bassline = [
    { note: 'F1', duration: '4n' },
    { note: 'Ab1', duration: '8n' },
    // { note: 'F1', duration: '4n' },
    { note: 'F2', duration: '8n' },
    { note: 'Eb1', duration: '8n' },
];


  // Create a loop
  const loop = new Tone.Sequence(
    (time, note) => {
      synth.triggerAttackRelease(note.note, note.duration, time);
    },
    bassline,
    '4n',
  );
loop.start();


const melodySynth = new Tone.PolySynth();
const melody = [
    { note: 'Ab4', duration: '4n' },
    { note: 'F4', duration: '8n' },
    { note: 'Eb4', duration: '4n' },
    { note: 'Db4', duration: '8n' },
];

const melodyLoop = new Tone.Sequence(
    (time, note) => {
      melodySynth.triggerAttackRelease(note.note, note.duration, time);
    },
    melody,
    '4n',
);
melodyLoop.start();


const reverb = new Tone.Reverb({ decay: 3, wet: 0.5 });
const delay = new Tone.PingPongDelay("16n", 0.2).connect(reverb);

// Use delay and reverb as output
bassDrum.connect(delay);
hiHat.connect(delay);
synth.connect(delay);
melodySynth.connect(delay);


// Tone.Transport.scheduleRepeat((time) => {
//     lfo.frequency.rampTo('8n', '4n', time);
// }, '2m');

// Tone.Transport.scheduleRepeat((time) => {
//     lfo.frequency.rampTo('1m', '4n', time);
// }, '4m');



// create gain nodes for instruments
const bassDrumGain = new Tone.Gain().toDestination();
const hiHatGain = new Tone.Gain().toDestination();
const synthGain = new Tone.Gain().toDestination();
const melodySynthGain = new Tone.Gain().toDestination();
const doorCloseGain = new Tone.Gain().toDestination();
const bodyImpactGain = new Tone.Gain().toDestination();
const reverbGain = new Tone.Gain().toDestination();

// connect everything to their corresponding gain node
bassDrum.connect(bassDrumGain);
hiHat.connect(hiHatGain);
synth.connect(synthGain);
melodySynth.connect(melodySynthGain);
doorCloseSound.connect(doorCloseGain);
bodyImpactSound.connect(bodyImpactGain);
reverb.connect(reverbGain);

// mute everything in the beginning
bassDrumGain.gain.rampTo(0, 0.01);
hiHatGain.gain.rampTo(0, 0.01);
synthGain.gain.rampTo(0, 0.01);
melodySynthGain.gain.rampTo(0, 0.01);
doorCloseGain.gain.rampTo(0, 0.01);
bodyImpactGain.gain.rampTo(0, 0.01);
reverbGain.gain.rampTo(0, 0.01);



// Create an array representing our song structure in 8-bar sections
// I-V-B-D stands for Intro-Verse-Build-Drop
const songStructure = 'I I V V V V B B D D V V V V B B D D O O'.split(' ');

// Schedule change every 4 bars
Tone.Transport.scheduleRepeat((time) => {
    const section = Math.floor(getBeat() / 16);
    console.log(section)

    if (section === 0) {
        // For the intro, we might just have bassDrum and hiHat
        bassDrumGain.gain.rampTo(1, 0.01);
        doorCloseGain.gain.rampTo(0, 0.01);
        bodyImpactGain.gain.rampTo(1, 0.01);
        hiHatGain.gain.rampTo(1, 0.01);
        synthGain.gain.rampTo(0, 0.01);
        melodySynthGain.gain.rampTo(0, 0.01);
        reverbGain.gain.rampTo(0, 0.01);
    } else if (section === 1) {
        // For the verse, we might add the synth and melodySynth
        bassDrumGain.gain.rampTo(1, 0.01);
        doorCloseGain.gain.rampTo(0, 0.01);
        bodyImpactGain.gain.rampTo(1, 0.01);
        hiHatGain.gain.rampTo(1, 0.01);
        synthGain.gain.rampTo(1, 0.01);
        melodySynthGain.gain.rampTo(0, 0.01);
        reverbGain.gain.rampTo(0, 0.01);
    }
}, '4m');