<template>
  <div class="container mt-5 text-center">
    <visualizer-page />
  </div>
</template>


<script>
/**
 * Main application component.
 */
import { defineComponent } from "vue";
import VisualizerPage from "@/pages/VisualizerPage.vue";

export default defineComponent({
  components: { VisualizerPage },
  setup() {},
});
</script>