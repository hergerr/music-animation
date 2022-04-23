<template>
  <svg
    class="visualizer border border-dark m-auto rounded mt-3"
    ref="visualizer"
  ></svg>
</template>

<script>
/**
 * Component responsible for showing visualizer
 * and performing SVG audio animation.
 */
import { defineComponent, ref, watchEffect } from "@vue/runtime-core";
import { audio, buttonClicked } from "@/store/Audio.store";
import { useAudio } from "@/composables/useAudio";
import { createRectangle } from "@/utils/drawingUtils";
import { FREQUENCY } from "@/config/config";

export default defineComponent({
  setup() {
    const visualizer = ref(null);

    /**
     *  Gets called after 'start' button is clicked.
     *  Gets information about visualizer area and
     *  draws the bars as an audio visualization
     */
    const handleAnimation = () => {
      const { analyser, dataArray, bufferLength } = useAudio(audio.value);

      const VISUALIZER_WIDTH = visualizer.value.width.baseVal.value;
      const VISUALIZER_HEIGHT = visualizer.value.height.baseVal.value;

      const barWidth = VISUALIZER_WIDTH / bufferLength;
      let barHeight;

      // Samples lower than 128 are treated as negative
      // and for better visualization, rounded to 0.
      const MAX_SAMPLE_VALUE = 255 - 128;

      // Multiplier which makes the highest possible value
      // to take whole SVG container height.
      const BAR_HEIGHT_MULTIPLIER = VISUALIZER_HEIGHT / MAX_SAMPLE_VALUE;

      /**
       * Gets called every period of time set by FREQUENCY setting.
       * Draws the bars as an audio visualization
       */
      function renderFrame() {
        // clear svg container from bars
        visualizer.value.innerHTML = "";
        let coordX = 0;

        // Byte as samples values are saving some memmory.
        // Precision loss is barely visible
        analyser.getByteTimeDomainData(dataArray);
        for (let i = 0; i < bufferLength; i++) {
          // Math.max(Math.max(0, dataArray[i] - 128)) cuts
          // 'negative' samples. multiplier makes them
          // high proportionally to SVG container size
          barHeight = Math.max(0, dataArray[i] - 128) * BAR_HEIGHT_MULTIPLIER;

          // Making bars stick to the bottom of a container.
          // They normally render on the top, so Y coordinate
          // must be calculated this way, to make them reach
          // bottom border of svg container.
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
        }, 1000 / FREQUENCY);
      }
      audio.value.play();
      renderFrame();
    };

    /**
     * Watches for change of 'start' button state
     * if it has changes, turns on audio and visualization
     */
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
