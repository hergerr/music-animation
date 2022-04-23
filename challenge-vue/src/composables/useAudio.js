import { FFT_SIZE } from "@/config/config";

/**
 * Composition functions which initializes
 * objects and data necessary for visualization
 *
 * @param {HTMLAudioElement} audio The reference for audio element
 *
 * @typedef {Object} AudioVisualizationUtils
 * @property {AnalyserNode} analyser Tool for exposing audio time and
 * frequency data and create data visualizations.
 *
 * @property {Uint8Array} dataArray 8-bit unsigned array with
 * unsigned integers. Content initialized to 0
 *
 * @property {number} bufferLength number of data to visualize. Half of fftSize.
 *
 * @return {AudioVisualizationUtils}
 */
export function useAudio(audio) {
  const audioCtx = new window.AudioContext();
  const source = audioCtx.createMediaElementSource(audio);
  const analyser = audioCtx.createAnalyser();

  source.connect(analyser);
  analyser.connect(audioCtx.destination);
  analyser.fftSize = FFT_SIZE;

  const bufferLength = analyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);

  return { analyser, dataArray, bufferLength };
}
