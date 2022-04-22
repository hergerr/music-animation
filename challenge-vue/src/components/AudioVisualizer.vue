<template>
  <svg
    class="visualizer border border-dark m-auto rounded mt-3"
    ref="visualizer"
  ></svg>
</template>

<script>
import { defineComponent, ref, watchEffect } from "@vue/runtime-core";
import { audio, buttonClicked } from "../store/Audio.store";

export default defineComponent({
  setup() {
    const visualizer = ref(null);
    /* eslint-disable */
    const createRectangle = (x, y, width, height) => {
      // create svg tag
      var svgns = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      // create svg element rectangle
      var rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      rect.setAttribute("x", x.toString());
      rect.setAttribute("y", y.toString());
      rect.setAttribute("width", width.toString());
      rect.setAttribute("height", height.toString());
      svgns.appendChild(rect);

      return svgns;
    };

    const handleAnimation = () => {
      var audioCtx = new window.AudioContext();
      var source = audioCtx.createMediaElementSource(audio.value);
      var analyser = audioCtx.createAnalyser();

      source.connect(analyser);
      analyser.connect(audioCtx.destination);
      analyser.fftSize = 512;
      //   number of values for visualization
      var bufferLength = analyser.frequencyBinCount;
      var dataArray = new Uint8Array(bufferLength);

      var WIDTH = visualizer.value.width.baseVal.value;
      var HEIGHT = visualizer.value.height.baseVal.value;

      var barWidth = (WIDTH / bufferLength);
      var barHeight;
      var x = 0;

      function renderFrame() {
        visualizer.value.innerHTML = ''
        x = 0;
        analyser.getByteFrequencyData(dataArray);
        for (var i = 0; i < bufferLength; i++) {
          barHeight = dataArray[i];

          var rect = createRectangle(
            x,
            HEIGHT - barHeight,
            barWidth,
            barHeight
          );
          visualizer.value.appendChild(rect);
          x += barWidth + 1;
        }

        setTimeout(() => {
          requestAnimationFrame(renderFrame);
        }, 1000/40);
      }
      audio.value.play();
      renderFrame();
    };

    watchEffect(() => {
      if (buttonClicked.value) {
        handleAnimation();
      }
    });

    return {
      visualizer,
    };
  },
});
</script>

<style lang="scss" scoped>
.visualizer {
  width: 400px;
  height: 400px;
}
</style>
