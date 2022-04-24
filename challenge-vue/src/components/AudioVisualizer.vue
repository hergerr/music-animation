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
 * Component responsible for showing audio
 * animation with SVG rectangle bars
 */
import { defineComponent, ref, watchEffect } from "@vue/runtime-core";

export default defineComponent({
  props: [
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
    const visualizerHeight = ref(0);

    /**
     * Multiplier which makes the highest possible value
     * to take whole SVG container height.
     */
    const barHeightMultiplier = ref(0);

    /**
     * Samples lower than 128 are treated as negative
     * for purpose of better visualization
     */
    const MAX_SAMPLE_VALUE = 255 - 128;

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
     * Draws the bars as an audio visualization.
     * Called, when visualization data changes.
     */
    function renderFrame() {
      let coordX = 0;

      for (let i = 0; i < props.visualizationBufferLength; i++) {
        /**
         * Math.max(Math.max(0, dataArray[i] - 128)) cuts
         * 'negative' samples. Multiplier makes them
         * high proportionally to SVG container size.
         */
        const barHeight =
          Math.max(0, props.visualizationData[i] - 128) *
          barHeightMultiplier.value;
        /**
         * Making bars stick to the bottom of a container.
         * They normally render on the top, so Y coordinate
         * must be calculated this way, to make them reach
         * bottom border of svg container.
         */
        const coordY = visualizerHeight.value - barHeight;

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
     * if it has changes, turns on audio and
     * sets necessary data for visualization
     */
    watchEffect(() => {
      if (props.buttonClicked) {
        handleAudio();
        const visualizerWidth = visualizer.value.width.baseVal.value;
        barWidth.value = visualizerWidth / props.visualizationBufferLength;
        visualizerHeight.value = visualizer.value.height.baseVal.value;
        barHeightMultiplier.value = visualizerHeight.value / MAX_SAMPLE_VALUE;
      }
    });

    /**
     * Watches for change of visualization data.
     * If the change occured, renders frame
     */
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
