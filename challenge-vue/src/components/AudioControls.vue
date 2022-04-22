<template>
  <div class="button-player">
    <audio v-show="playerVisible" controls src="music.mp3" ref="audio"></audio>
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
export default defineComponent({
  setup() {
    const playerVisible = ref(false);
    const audio = ref(null);

    const handlePlayer = () => {
      console.log(audio.value);

      audio.value?.play();
    };

    const handlePlayButton = () => {
      playerVisible.value = !playerVisible.value;

      handlePlayer();
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
