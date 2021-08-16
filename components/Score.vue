<template>
  <p class="text-4xl">
    Score:
    <span class="text-blue-400">{{ $store.state.game.score }}</span>
  </p>
</template>

<script>
export default {
  computed: {
    gameStarted() {
      return this.$store.state.game.isStarted
    },
    hideControlsOnStart() {
      return this.$store.state.game.hideControlsOnStart
    },
  },
}
</script>

<style></style>
