<template>
  <div class="max-w-7xl mx-auto pt-40">
    <div
      class="mb-24 border border-black py-4"
      :class="
        gameStarted && hideControlsOnStart ? 'hidden' : 'flex justify-center'
      "
    >
      <div>
        <p class="text-5xl font-bold">Game Controls</p>
        <div v-if="!gameStarted" class="inline-flex flex-col">
          <generic-input
            v-model="timer"
            label="Game Timer"
            placeholder="Game Time(ms)"
            type="number"
          />
          <generic-input
            v-model.number="amountOfMoles"
            label="Amount of moles"
            placeholder="Mole count"
            type="number"
            min="1"
          />
          <div class="flex items-center space-x-2 mt-3">
            <label for="hide-on-start"> Hide controls on start? </label>
            <input
              id="hide-on-start"
              v-model="hideControlsOnStart"
              type="checkbox"
              name="hide"
              class="transform scale-140"
            />
          </div>
        </div>
        <p v-else class="text-3xl">Timer: {{ timer }}</p>
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
            gameStarted
              ? 'bg-red-400 hover:bg-red-500'
              : 'bg-green-400 hover:bg-green-500'
          "
          @click="startGame()"
        >
          {{ gameStarted ? 'Stop' : 'Start game' }}
        </button>
        <score v-if="gameStarted && !hideControlsOnStart" />
      </div>
    </div>
    <score v-if="gameStarted && hideControlsOnStart" class="mb-16" />
    <div class="flex justify-center flex-wrap">
      <mole v-for="index in amountOfMoles" :key="index" />
    </div>
  </div>
</template>

<script>
import GenericInput from '~/components/GenericInput.vue'
import Mole from '~/components/misc/Mole.vue'
import Score from '~/components/Score.vue'
export default {
  components: { Mole, GenericInput, Score },
  computed: {
    gameStarted() {
      return this.$store.state.game.isStarted
    },
    timer: {
      get() {
        return this.$store.state.game.timer
      },
      set(time) {
        this.$store.commit('game/SET_TIMER', time)
      },
    },
    amountOfMoles: {
      get() {
        return this.$store.state.game.amountOfMoles
      },
      set(value) {
        this.$store.commit('game/SET_MOLE_AMOUNT', value)
      },
    },
    hideControlsOnStart: {
      get() {
        return this.$store.state.game.hideControlsOnStart
      },
      set(value) {
        this.$store.commit('game/SET_HIDE_CONTROLS_ON_START', value)
      },
    },
    // randomize: {
    //   get() {
    //     return this.$store.state.game.randomizeAppearTimeOnClick
    //   },
    //   set(value) {
    //     this.$store.commit('game/SET_RANDOMIZE_APPEAR_TIME', value)
    //   },
    // },
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
