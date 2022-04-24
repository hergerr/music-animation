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

export default defineComponent({
  props: [
    "temp",
    "audio",
    "buttonClicked",
    "errorOccured",
    "visualizationData",
    "visualizationBufferLength",
  ],
  emits: ["update:errorOccured"],
  setup(props, { emit }) {
    const visualizer = ref(null);
    const bars = ref([]);
    const barWidth = ref(0);

    // Samples lower than 128 are treated as negative
    // and for better visualization, rounded to 0.
    const MAX_SAMPLE_VALUE = 255 - 128;

    // Multiplier which makes the highest possible value
    // to take whole SVG container height.

    /**
     *  Gets called after 'start' button is clicked.
     *  Plays audio or sends up error flag and returns
     */
    async function handleAudio() {
      try {
        await props.audio.play();
      } catch (error) {
        emit("update:errorOccured", true);
        return;
      }
    }

    /**
     * Gets called every period of time set by FREQUENCY setting.
     * Draws the bars as an audio visualization
     */
    function renderFrame() {
      const VISUALIZER_WIDTH = visualizer.value.width.baseVal.value;
      const VISUALIZER_HEIGHT = visualizer.value.height.baseVal.value;
      const BAR_HEIGHT_MULTIPLIER = VISUALIZER_HEIGHT / MAX_SAMPLE_VALUE;
      barWidth.value = VISUALIZER_WIDTH / props.visualizationBufferLength;

      let coordX = 0;

      // Working with byte because of intuitive min and max value
      for (let i = 0; i < props.visualizationBufferLength; i++) {
        // Math.max(Math.max(0, dataArray[i] - 128)) cuts
        // 'negative' samples. multiplier makes them
        // high proportionally to SVG container size
        let barHeight =
          Math.max(0, props.visualizationData[i] - 128) * BAR_HEIGHT_MULTIPLIER;

        // Making bars stick to the bottom of a container.
        // They normally render on the top, so Y coordinate
        // must be calculated this way, to make them reach
        // bottom border of svg container.
        const coordY = VISUALIZER_HEIGHT - barHeight;

        const bar = {
          coordX,
          coordY,
          width: barWidth.value,
          height: barHeight,
          fill: `rgb(${coordX},${coordY},${barHeight})`,
        };
        bars.value[i] = bar;
        coordX += barWidth.value + 1;
      }
    }

    /**
     * Watches for change of 'start' button state
     * if it has changes, turns on audio and visualization
     */
    watchEffect(() => {
      if (props.buttonClicked) {
        handleAudio();
      }
    });

    watchEffect(() => {
      if (props.visualizationData) {
        requestAnimationFrame(renderFrame);
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
