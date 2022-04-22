<template>
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
</template>

<script>
/**
 * Component containing button for turning on animation
 * and audio element.
 */
import { defineComponent } from "vue";
import { audio, buttonClicked } from "@/store/Audio.store";

export default defineComponent({
  setup() {
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
