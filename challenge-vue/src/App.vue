<template>
  <div class="container mt-5 text-center">
    <h1>Visualizer</h1>
    <audio-controls />
    <audio-visualizer />
  </div>
</template>


<script>
import { defineComponent } from "vue";
import AudioVisualizer from "./components/AudioVisualizer.vue";
import AudioControls from "./components/AudioControls.vue";

export default defineComponent({
  components: { AudioVisualizer, AudioControls },
  setup() {},
});
</script>

<style lang="scss" scoped>
</style>
