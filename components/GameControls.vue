<template>
  <div
    class="mb-24 border border-black py-4"
    :class="
      gameStarted && hideControlsOnStart ? 'hidden' : 'flex justify-center'
    "
  >
    <div>
      <p class="text-5xl font-bold">Game Controls</p>
      <p class="text-3xl my-2 font-bold">
        Time: {{ millisToMinutesAndSeconds(timer) }}
      </p>
      <div v-if="!gameStarted" class="inline-flex flex-col">
        <generic-input
          v-model.number="minutes"
          label="Minutes"
          placeholder="Minutes"
          type="number"
          :input="{
            $attrs: {
              min: '0',
            },
          }"
        />
        <generic-input
          v-model.number="seconds"
          label="Seconds"
          placeholder="Seconds"
          type="number"
          :input="{
            $attrs: {
              min: minutes > 0 ? 0 : 1,
            },
          }"
        />
        <generic-input
          v-model="amountOfMoles"
          label="Amount of moles"
          placeholder="Mole count"
          type="number"
          :input="{
            $attrs: {
              min: '1',
            },
          }"
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
</template>

<script>
import GenericInput from './GenericInput.vue'
export default {
  components: { GenericInput },
  computed: {
    gameStarted() {
      return this.$store.state.game.isStarted
    },
    minutes: {
      get() {
        return this.$store.state.game.time.minutes
      },
      set(value) {
        this.$store.commit('game/SET_TIME', {
          key: 'minutes',
          value,
        })
      },
    },
    seconds: {
      get() {
        return this.$store.state.game.time.seconds
      },
      set(value) {
        this.$store.commit('game/SET_TIME', {
          key: 'seconds',
          value,
        })
      },
    },
    timer() {
      return this.$store.state.game.timer
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
  },
  methods: {
    millisToMinutesAndSeconds(millis) {
      let sec = Math.floor(millis / 1000)
      const hrs = Math.floor(sec / 3600)
      sec -= hrs * 3600
      let min = Math.floor(sec / 60)
      sec -= min * 60

      sec = '' + sec
      sec = ('00' + sec).substring(sec.length)

      if (hrs > 0) {
        min = '' + min
        min = ('00' + min).substring(min.length)
        return hrs + ':' + min + ':' + sec
      } else {
        return min + ':' + sec
      }
    },
    startGame() {
      this.$store.dispatch('game/toggleGame')
    },
  },
}
</script>

<style></style>
