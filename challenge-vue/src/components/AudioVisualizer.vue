<template>
  <svg
    class="visualizer border border-dark m-auto rounded mt-3"
    ref="visualizer"
  ></svg>
</template>

<script>
import { defineComponent, ref, watchEffect } from "@vue/runtime-core";
import { audio, buttonClicked } from "../store/Audio.store";
import { useAudio } from "../composables/useAudio";
import { createRectangle } from "../utils/drawingUtils";

export default defineComponent({
  setup() {
    const visualizer = ref(null);

    const handleAnimation = () => {
      const { analyser, dataArray, bufferLength } = useAudio(audio.value);

      const VISUALIZER_WIDTH = visualizer.value.width.baseVal.value;
      const VISUALIZER_HEIGHT = visualizer.value.height.baseVal.value;

      const barWidth = VISUALIZER_WIDTH / bufferLength;
      let barHeight;

      function renderFrame() {
        visualizer.value.innerHTML = "";
        let coordX = 0;
        analyser.getByteFrequencyData(dataArray);
        for (let i = 0; i < bufferLength; i++) {
          barHeight = dataArray[i];

          const rect = createRectangle(
            coordX,
            VISUALIZER_HEIGHT - barHeight,
            barWidth,
            barHeight
          );
          visualizer.value.appendChild(rect);
          coordX += barWidth + 1;
        }

        setTimeout(() => {
          requestAnimationFrame(renderFrame);
        }, 1000 / 40);
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
