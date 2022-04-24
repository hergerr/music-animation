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
 * Page containing controls and audio visualizer
 */
import { defineComponent, ref } from "vue";
import { useAudio } from "@/composables/useAudio";
import AudioVisualizer from "@/components/AudioVisualizer.vue";
import { FREQUENCY } from "@/config/config";

export default defineComponent({
  components: { AudioVisualizer },
  setup() {
    const audio = ref(null);
    const buttonClicked = ref(false);
    const errorOccured = ref(false);
    const visualizationData = ref([]);
    const visualizationBufferLength = ref(0);

    /**
     * Gets called, once 'start' button is clicked.
     * Makes button disappear and audio player appear
     */
    const handlePlayButton = () => {
      const { analyser, dataArray, bufferLength } = useAudio(audio.value);
      visualizationBufferLength.value = bufferLength;

      buttonClicked.value = !buttonClicked.value;

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
