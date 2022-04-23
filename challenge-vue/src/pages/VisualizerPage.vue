<template>
  <div>
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
    <audio-visualizer :audio="audio" :buttonClicked="buttonClicked" />
  </div>
</template>

<script>
/**
 * Page containing controls and audio visualizer
 */
import { defineComponent, ref } from "vue";
import AudioVisualizer from "@/components/AudioVisualizer.vue";

export default defineComponent({
  components: { AudioVisualizer },
  setup() {
    const audio = ref(null);
    const buttonClicked = ref(false);

    /**
     * Gets called, once 'start' button is clicked.
     * Makes button disappear and audio player appear
     */
    const handlePlayButton = () => {
      buttonClicked.value = !buttonClicked.value;
    };

    return {
      audio,
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
