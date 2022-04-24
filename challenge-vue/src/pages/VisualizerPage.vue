<template>
  <div>
    <h1 v-if="errorOccured">Error. Please refresh.</h1>
    <h1 v-else>Visualizer</h1>
    <div class="button-player">
      <audio v-show="buttonClicked" controls src="music.mp3" ref="audio" />
      <button
        v-show="!buttonClicked"
        class="btn btn-primary mt-2"
        @click="handlePlayButton"
      >
        start
      </button>
    </div>
    <audio-visualizer
      :audio="audio"
      :visualizationData="visualizationData"
      :visualizationBufferLength="visualizationBufferLength"
      :buttonClicked="buttonClicked"
      v-model:errorOccured="errorOccured"
    />
  </div>
</template>

<script>
/**
 * Page which contains and manages audio controls.
 * Responsible for getting necessary data and
 * passing it to visualization component.
 */
import { defineComponent, ref } from "vue";
import { useAudio } from "@/composables/useAudio";
import AudioVisualizer from "@/components/AudioVisualizer.vue";
import { FREQUENCY } from "@/config/config";

export default defineComponent({
  components: { AudioVisualizer },
  setup() {
    /**
     * Refenrence to audio component
     */
    const audio = ref(null);
    const buttonClicked = ref(false);
    const errorOccured = ref(false);
    /**
     * Array with samples to visualize
     */
    const visualizationData = ref([]);
    /**
     * Quantity of elements to visualize
     */
    const visualizationBufferLength = ref(0);

    /**
     * Called, once 'start' button is clicked.
     * Makes button disappear and audio player appear.
     * Collects data to visualize and updates array
     * with given frequency
     */
    const handlePlayButton = () => {
      const { analyser, dataArray, bufferLength } = useAudio(audio.value);
      visualizationBufferLength.value = bufferLength;

      buttonClicked.value = true;

      /**
       * Collects data to visualize and updates array
       * Byte format is used, because of ease 
       * of operating with well-known range (0-255)
       */
      setInterval(() => {
        analyser.getByteTimeDomainData(dataArray);
        visualizationData.value = [...dataArray];
      }, 1000 / FREQUENCY);
    };

    return {
      audio,
      visualizationBufferLength,
      visualizationData,
      errorOccured,
      buttonClicked,
      handlePlayButton,
    };
  },
});
</script>

<style lang="scss" scoped>
.button-player {
  height: 50px;
}
</style>
