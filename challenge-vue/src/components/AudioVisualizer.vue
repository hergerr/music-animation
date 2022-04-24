<template>
  <svg
    class="visualizer border border-dark m-auto rounded mt-3"
    ref="visualizer"
  >
    <rect
      v-for="bar in bars"
      :key="bar.coordX"
      :x="bar.coordX"
      :y="bar.coordY"
      :width="bar.width"
      :height="bar.height"
      :fill="bar.fill"
    ></rect>
  </svg>
</template>

<script>
/**
 * Component responsible for showing visualizer
 * and performing SVG audio animation.
 */
import { defineComponent, ref, watchEffect } from "@vue/runtime-core";
import { useAudio } from "@/composables/useAudio";
import { FREQUENCY } from "@/config/config";

export default defineComponent({
  props: ["audio", "buttonClicked", "errorOccured"],
  emits: ["update:errorOccured"],
  setup(props, { emit }) {
    const visualizer = ref(null);
    const bars = ref([]);

    /**
     *  Gets called after 'start' button is clicked.
     *  Gets information about visualizer area and
     *  draws the bars as an audio visualization
     */
    async function handleAnimation() {
      const { analyser, dataArray, bufferLength } = useAudio(props.audio);

      try {
        await props.audio.play();
      } catch (error) {
        emit("update:errorOccured", true);
        return;
      }

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
        let coordX = 0;

        // Working with byte because of intuitive min and max value
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
          const coordY = VISUALIZER_HEIGHT - barHeight;

          const bar = {
            coordX,
            coordY,
            width: barWidth,
            height: barHeight,
            fill: `rgb(${coordX},${coordY},${barHeight})`,
          };
          bars.value[i] = bar;
          coordX += barWidth + 1;
        }

        setTimeout(() => {
          requestAnimationFrame(renderFrame);
        }, 1000 / FREQUENCY);
      }
      renderFrame();
    }

    /**
     * Watches for change of 'start' button state
     * if it has changes, turns on audio and visualization
     */
    watchEffect(() => {
      if (props.buttonClicked) {
        handleAnimation();
      }
    });

    return {
      visualizer,
      bars,
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
