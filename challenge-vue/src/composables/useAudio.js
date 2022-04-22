import { FFT_SIZE } from "@/config/config";

export function useAudio(audio) {
  const audioCtx = new window.AudioContext();
  const source = audioCtx.createMediaElementSource(audio);
  const analyser = audioCtx.createAnalyser();

  source.connect(analyser);
  analyser.connect(audioCtx.destination);
  analyser.fftSize = FFT_SIZE;
  //   number of values for visualization
  const bufferLength = analyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);

  return { analyser, dataArray, bufferLength };
}
