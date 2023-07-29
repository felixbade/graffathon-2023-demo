Tone.Transport.bpm.value = 140;

const lowpass = new Tone.Filter({
    frequency: 1000,
    type: 'lowpass',
    rolloff: -12,
    Q: 5,
    gain: 0
}).toDestination();

var lfo = new Tone.LFO({
    frequency: Tone.Time('1n').toFrequency(),
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
}).connect(lowpass);


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

const doorCloseSound = new Tone.Player(
    './sounds/9876__heigh-hoo__car_door_closed.aiff',
).toDestination();
doorCloseSound.volume.value = -10;

// player from 221626__moodpie__body_impact.wav
const bodyImpactSound = new Tone.Player(
    './sounds/221626__moodpie__body_impact.wav'
).toDestination();
bodyImpactSound.volume.value = -10;

const doorLoop = new Tone.Loop(time => {
    const qBeat = Math.floor(getBeat() * 4);
    let volume = -1 * (qBeat * 3 % 8) - 10;
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
  }).toDestination();

  // Bassline - notes for a repetetive techno pattern with slight variation
  const bassline = [
    { note: 'F1', duration: '4n' },
    { note: 'F1', duration: '8n' },
    { note: 'F1', duration: '4n' },
    { note: 'F2', duration: '8n' }];

  // Create a loop
  const loop = new Tone.Sequence(
    (time, note) => {
      synth.triggerAttackRelease(note.note, note.duration, time);
    },
    bassline,
    '4n',
  );
loop.start();