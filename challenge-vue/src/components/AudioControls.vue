<template>
  <div class="button-player">
    <audio v-show="playerVisible" controls src="music.mp3" ref="audio" />
    <button
      v-show="!playerVisible"
      class="btn btn-primary mt-2"
      @click="handlePlayButton"
    >
      start
    </button>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import { audio, buttonClicked } from "../store/Audio.store";

export default defineComponent({
  setup() {
    const playerVisible = ref(false);

    const handlePlayButton = () => {
      playerVisible.value = !playerVisible.value;
      buttonClicked.value = !buttonClicked.value;
    };

    return {
      audio,
      playerVisible,
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
