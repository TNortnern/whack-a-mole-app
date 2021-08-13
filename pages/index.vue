<template>
  <div class="max-w-7xl mx-auto pt-40">
    <div class="flex justify-center mb-24 border border-black py-4">
      <div>
        <p class="text-5xl font-bold mb-8">Game Controls</p>
        <generic-input
          v-if="!$store.state.game.isStarted"
          v-model="timer"
          class="inline-block"
          label="Game Timer"
          placeholder="Game Time(ms)"
          type="number"
        />
        <p v-else>
          {{ timer }}
        </p>
        <button
          class="
            text-white
            duration-150
            rounded-md
            px-5
            py-1
            mt-3
            mb-5
            block
            min-w-28
          "
          :class="
            $store.state.game.isStarted
              ? 'bg-red-400 hover:bg-red-500'
              : 'bg-green-400 hover:bg-green-500'
          "
          @click="startGame()"
        >
          {{ $store.state.game.isStarted ? 'Stop' : 'Start game' }}
        </button>
        <p class="text-3xl">
          Score:
          <span class="text-blue-400">{{ $store.state.game.score }}</span>
        </p>
      </div>
    </div>
    <div class="flex justify-center flex-wrap">
      <mole />
      <mole />
      <mole />
      <mole />
      <mole />
      <mole />
    </div>
  </div>
</template>

<script>
import GenericInput from '~/components/GenericInput.vue'
import Mole from '~/components/misc/Mole.vue'
export default {
  components: { Mole, GenericInput },
  computed: {
    timer: {
      get() {
        return this.$store.state.game.timer
      },
      set(time) {
        this.$store.commit('game/SET_TIMER', time)
      },
    },
  },
  methods: {
    millisToMinutesAndSeconds(millis) {
      const minutes = Math.floor(millis / 60000)
      const seconds = ((millis % 60000) / 1000).toFixed(0)
      return minutes + ':' + (seconds < 10 ? '0' : '') + seconds
    },
    startGame() {
      this.$store.dispatch('game/toggleGame')
    },
  },
}
</script>
