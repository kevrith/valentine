import { useState, useRef, useCallback } from 'react';

function scheduleMelody(audioCtx, gainNode) {
  const chords = [
    [261.63, 329.63, 392.00], // C major
    [220.00, 261.63, 329.63], // A minor
    [174.61, 220.00, 261.63], // F major
    [196.00, 246.94, 293.66], // G major
  ];
  const melodyNotes = [523.25, 440.00, 349.23, 392.00, 523.25, 493.88, 349.23, 440.00];
  const beatDuration = 2.0;
  const startTime = audioCtx.currentTime + 0.05;

  for (let rep = 0; rep < 2; rep++) {
    for (let i = 0; i < chords.length; i++) {
      const time = startTime + (rep * 4 + i) * beatDuration;

      // Pad chords
      chords[i].forEach((freq) => {
        const osc = audioCtx.createOscillator();
        const env = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.value = freq;
        env.gain.setValueAtTime(0, time);
        env.gain.linearRampToValueAtTime(0.1, time + 0.3);
        env.gain.linearRampToValueAtTime(0.05, time + beatDuration * 0.7);
        env.gain.linearRampToValueAtTime(0, time + beatDuration);
        osc.connect(env);
        env.connect(gainNode);
        osc.start(time);
        osc.stop(time + beatDuration + 0.01);
      });

      // Melody note
      const melOsc = audioCtx.createOscillator();
      const melEnv = audioCtx.createGain();
      melOsc.type = 'sine';
      melOsc.frequency.value = melodyNotes[(rep * 4 + i) % melodyNotes.length];
      melEnv.gain.setValueAtTime(0, time + 0.5);
      melEnv.gain.linearRampToValueAtTime(0.07, time + 0.8);
      melEnv.gain.linearRampToValueAtTime(0, time + beatDuration);
      melOsc.connect(melEnv);
      melEnv.connect(gainNode);
      melOsc.start(time + 0.5);
      melOsc.stop(time + beatDuration + 0.01);
    }
  }

  return beatDuration * 8;
}

export default function MusicToggle() {
  const [isPlaying, setIsPlaying] = useState(false);
  const ctxRef = useRef(null);
  const timerRef = useRef(null);
  const gainRef = useRef(null);

  const stop = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = null;
    if (ctxRef.current) {
      ctxRef.current.close().catch(() => {});
      ctxRef.current = null;
    }
    gainRef.current = null;
  }, []);

  const start = useCallback(() => {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    ctxRef.current = ctx;
    const gain = ctx.createGain();
    gain.gain.value = 0.1;
    gain.connect(ctx.destination);
    gainRef.current = gain;

    const duration = scheduleMelody(ctx, gain);

    timerRef.current = setInterval(() => {
      if (ctxRef.current && ctxRef.current.state === 'running') {
        scheduleMelody(ctxRef.current, gainRef.current);
      }
    }, duration * 1000 - 200);
  }, []);

  const toggle = () => {
    if (isPlaying) {
      stop();
    } else {
      start();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <button className="music-toggle" onClick={toggle} aria-label="Toggle music">
      {isPlaying ? '🔊' : '🔇'}
    </button>
  );
}
