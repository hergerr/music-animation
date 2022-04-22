<template>
  <div>
    <audio v-if="playerVisible" controls id="audio" class="player">
      <source src="music.mp3" type="audio/mp3" />
    </audio>
    <button v-else class="btn btn-primary mt-2" @click="playButtonClicked">
      start
    </button>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
export default defineComponent({
  setup() {
    const playerVisible = ref(false);

    const playButtonClicked = () => {
      playerVisible.value = !playerVisible.value;
    };
    return {
      playerVisible,
      playButtonClicked,
    };
  },
});
</script>

<style lang="scss" scoped>
</style>
