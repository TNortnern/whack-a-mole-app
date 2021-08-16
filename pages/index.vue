<template>
  <div class="max-w-7xl mx-auto pt-40">
    <game-controls />
    <score v-if="gameStarted && hideControlsOnStart" class="mb-16" />
    <div class="flex justify-center flex-wrap">
      <mole v-for="index in Number(amountOfMoles)" :key="index" />
    </div>
  </div>
</template>

<script>
import GameControls from '~/components/GameControls.vue'
import Mole from '~/components/misc/Mole.vue'
import Score from '~/components/Score.vue'
export default {
  components: { Mole, Score, GameControls },
  computed: {
    gameStarted() {
      return this.$store.state.game.isStarted
    },
    amountOfMoles() {
      return this.$store.state.game.amountOfMoles
    },
    hideControlsOnStart() {
      return this.$store.state.game.hideControlsOnStart
    },
  },
}
</script>
