<template>
  <div class="button-player">
    <audio v-show="playAudio" controls src="music.mp3" ref="audioRef" />
    <button
      v-show="!playAudio"
      class="btn btn-primary mt-2"
      @click="handleClick"
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
import { defineComponent, onMounted, ref } from "vue";

export default defineComponent({
  props: ["playAudio", "audio"],
  emits: ["update:playAudio", "update:audio"],
  setup(props, { emit }) {
    const audioRef = ref(null);

    onMounted(() => {
      emit("update:audio", audioRef.value);
    });

    const handleClick = () => {
      emit("update:playAudio", !props.playAudio);
    };

    return {
      audioRef,
      handleClick,
    };
  },
});
</script>

<style lang="scss" scoped>
.button-player {
  height: 50px;
}
</style>
