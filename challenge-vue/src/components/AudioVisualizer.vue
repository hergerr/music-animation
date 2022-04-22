<template>
  <canvas class="visualizer border border-dark m-auto rounded mt-3" ref="canvas"></canvas>
</template>

<script>
import { defineComponent, ref, watchEffect } from "@vue/runtime-core";
import { audio, buttonClicked } from "../store/Audio.store";

export default defineComponent({
  setup() {
    const canvas = ref(null);

    const handleAnimation = () => {
      var audioCtx = new window.AudioContext();
      var source = audioCtx.createMediaElementSource(audio.value);
      var analyser = audioCtx.createAnalyser();
      
      source.connect(analyser);
      analyser.connect(audioCtx.destination);
      analyser.fftSize = 2048;
      canvas.value.width = 400;
      canvas.value.height = 400;
      var ctx = canvas.value.getContext("2d");
      var bufferLength = analyser.frequencyBinCount;
      console.log(bufferLength);
      var dataArray = new Uint8Array(bufferLength);
      var WIDTH = canvas.value.width;
      var HEIGHT = canvas.value.height;
      var barWidth = (WIDTH / bufferLength) * 2.5;
      var barHeight;
      var x = 0;
      function renderFrame() {
        requestAnimationFrame(renderFrame);
        x = 0;
        analyser.getByteFrequencyData(dataArray);
        ctx.fillStyle = "#000";
        ctx.fillRect(0, 0, WIDTH, HEIGHT);
        for (var i = 0; i < bufferLength; i++) {
          barHeight = dataArray[i];
          var r = barHeight + 25 * (i / bufferLength);
          var g = 250 * (i / bufferLength);
          var b = 50;
          ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
          ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);
          x += barWidth + 1;
        }
      }
      audio.value.play();
      renderFrame();
    };

    watchEffect(() => {
      if (buttonClicked.value) {
        handleAnimation();
      } else {
        console.log("no nie");
      }
    });

    return {
      canvas,
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
