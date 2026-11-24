import { useCallback, useEffect, useRef, useState } from 'react';
import type { BiomeId } from '../data';

class AmbientEngine {
  private context: AudioContext | null = null;
  private master: GainNode | null = null;
  private filter: BiquadFilterNode | null = null;
  private low: OscillatorNode | null = null;
  private high: OscillatorNode | null = null;
  private noiseGain: GainNode | null = null;
  private nodes: AudioScheduledSourceNode[] = [];
  private suspendTimer: number | null = null;

  async start() {
    if (this.suspendTimer !== null) {
      window.clearTimeout(this.suspendTimer);
      this.suspendTimer = null;
    }
    if (!this.context) this.create();
    if (!this.context || !this.master) throw new Error('Audio is not supported.');
    await this.context.resume();
    const now = this.context.currentTime;
    this.master.gain.cancelScheduledValues(now);
    this.master.gain.setValueAtTime(Math.max(this.master.gain.value, 0.0001), now);
    this.master.gain.exponentialRampToValueAtTime(0.055, now + 1.4);
  }

  setBiome(id: BiomeId) {
    if (!this.context || !this.filter || !this.low || !this.high || !this.noiseGain) return;
    const now = this.context.currentTime;
    const presets: Record<BiomeId, [number, number, number, number]> = {
      sunmeadow: [110, 164.81, 760, 0.022],
      whisperwood: [98, 146.83, 430, 0.018],
      hollow: [73.42, 110, 320, 0.012],
      emberwaste: [55, 82.41, 880, 0.034],
      beyond: [82.41, 123.47, 1250, 0.014],
    };
    const [low, high, cutoff, noise] = presets[id];
    this.low.frequency.exponentialRampToValueAtTime(low, now + 1.8);
    this.high.frequency.exponentialRampToValueAtTime(high, now + 1.8);
    this.filter.frequency.exponentialRampToValueAtTime(cutoff, now + 1.8);
    this.noiseGain.gain.linearRampToValueAtTime(noise, now + 1.8);
  }

  stop() {
    if (!this.context || !this.master) return;
    const now = this.context.currentTime;
    this.master.gain.cancelScheduledValues(now);
    this.master.gain.setValueAtTime(this.master.gain.value, now);
    this.master.gain.exponentialRampToValueAtTime(0.0001, now + 0.5);
    if (this.suspendTimer !== null) window.clearTimeout(this.suspendTimer);
    this.suspendTimer = window.setTimeout(() => {
      void this.context?.suspend();
      this.suspendTimer = null;
    }, 600);
  }

  destroy() {
    if (this.suspendTimer !== null) window.clearTimeout(this.suspendTimer);
    this.nodes.forEach((node) => {
      try {
        node.stop();
      } catch {
        // A source may already be stopped during a fast refresh.
      }
      node.disconnect();
    });
    this.nodes = [];
    void this.context?.close();
    this.context = null;
  }

  private create() {
    const AudioContextClass =
      window.AudioContext ??
      (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) throw new Error('Audio is not supported.');

    const context = new AudioContextClass();
    const master = context.createGain();
    const filter = context.createBiquadFilter();
    const compressor = context.createDynamicsCompressor();
    master.gain.value = 0.0001;
    filter.type = 'lowpass';
    filter.frequency.value = 760;
    filter.Q.value = 0.7;
    compressor.threshold.value = -24;
    compressor.ratio.value = 3;
    filter.connect(master);
    master.connect(compressor);
    compressor.connect(context.destination);

    const low = context.createOscillator();
    const lowGain = context.createGain();
    low.type = 'sine';
    low.frequency.value = 110;
    lowGain.gain.value = 0.16;
    low.connect(lowGain).connect(filter);

    const high = context.createOscillator();
    const highGain = context.createGain();
    high.type = 'triangle';
    high.frequency.value = 164.81;
    highGain.gain.value = 0.035;
    high.connect(highGain).connect(filter);

    const buffer = context.createBuffer(1, context.sampleRate * 3, context.sampleRate);
    const samples = buffer.getChannelData(0);
    let last = 0;
    for (let index = 0; index < samples.length; index += 1) {
      last = (last + (Math.random() * 2 - 1) * 0.02) / 1.02;
      samples[index] = last * 3.5;
    }
    const noise = context.createBufferSource();
    const noiseGain = context.createGain();
    noise.buffer = buffer;
    noise.loop = true;
    noiseGain.gain.value = 0.022;
    noise.connect(noiseGain).connect(filter);

    const lfo = context.createOscillator();
    const lfoGain = context.createGain();
    lfo.type = 'sine';
    lfo.frequency.value = 0.08;
    lfoGain.gain.value = 160;
    lfo.connect(lfoGain).connect(filter.frequency);

    low.start();
    high.start();
    noise.start();
    lfo.start();
    this.context = context;
    this.master = master;
    this.filter = filter;
    this.low = low;
    this.high = high;
    this.noiseGain = noiseGain;
    this.nodes = [low, high, noise, lfo];
  }
}

export function useSoundscape() {
  const engine = useRef<AmbientEngine | null>(null);
  const [enabled, setEnabled] = useState(false);
  const [supported, setSupported] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    engine.current = new AmbientEngine();
    return () => {
      engine.current?.destroy();
      engine.current = null;
    };
  }, []);

  const toggle = useCallback(async () => {
    if (enabled) {
      engine.current?.stop();
      setEnabled(false);
      setMessage('Ambient sound off');
      return;
    }

    try {
      if (!engine.current) engine.current = new AmbientEngine();
      await engine.current.start();
      engine.current.setBiome('sunmeadow');
      setEnabled(true);
      setSupported(true);
      setMessage('Ambient sound on');
    } catch {
      setSupported(false);
      setMessage('Ambient audio is not available in this browser.');
    }
  }, [enabled]);

  const setBiome = useCallback((id: BiomeId) => {
    engine.current?.setBiome(id);
  }, []);

  return { enabled, supported, message, toggle, setBiome };
}
