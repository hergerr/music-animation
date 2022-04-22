<template>
  <div class="container mt-5 text-center">
    <h1>Visualizer</h1>
    <audio-controls />
    <audio-visualizer />
  </div>
</template>


<script>
import { defineComponent, watchEffect } from "vue";
import { audio } from "./store/Audio.store";
import AudioVisualizer from "./components/AudioVisualizer.vue";
import AudioControls from "./components/AudioControls.vue";

export default defineComponent({
  components: { AudioVisualizer, AudioControls },
  setup() {
      watchEffect(()=> {
        //   console.log(audio.value)
      })
    return {
      audio,
    };
  },
});
</script>

<style lang="scss" scoped>
</style>
