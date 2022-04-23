<template>
  <div class="container mt-5 text-center">
    <h1>Visualizer</h1>
    <visualizer-page />
  </div>
</template>


<script>
/**
 * Main application component
 */
import { defineComponent } from "vue";
import VisualizerPage from "@/pages/VisualizerPage.vue";

export default defineComponent({
  components: { VisualizerPage },
  setup() {},
});
</script>