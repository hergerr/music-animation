<template>
  <div class="container mt-5 text-center">
    <h1>Visualizer</h1>
    <audio-controls v-model:playAudio="playAudio" v-model:audio="audio" />
    <audio-visualizer :playAudio="playAudio" :audio="audio" />
  </div>
</template>


<script>
/**
 * Main application component
 */
/* eslint-disable */
import { defineComponent, ref, watchEffect } from "vue";
import AudioVisualizer from "@/components/AudioVisualizer.vue";
import AudioControls from "@/components/AudioControls.vue";

export default defineComponent({
  components: { AudioVisualizer, AudioControls },
  setup() {
    const playAudio = ref(false);
    const audio = ref(null);

    watchEffect(() => {
      console.log("rodzic w useEffect", audio.value);
      console.log("rodzic w useEffect", playAudio.value);
    });
    return {
      playAudio,
      audio,
    };
  },
});
</script>