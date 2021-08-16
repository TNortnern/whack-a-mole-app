<template>
  <div class="w-4/5 my-20 md:my-24 md:mx-8 md:w-1/3 lg:w-1/5">
    <div v-if="!$store.state.game.isStarted" class="mb-8 relative z-10">
      <generic-input
        v-model="appearTime"
        :label="`${consistentAppearTime ? 'Mole ' : 'Initial mole'}appear time`"
        placeholder="Appear time"
        name="appear-time"
        type="number"
      />
      <div class="flex items-center space-x-2 mt-3">
        <label for="consistent-time">Keep consistent appear time?</label>
        <input
          id="consistent-time"
          v-model="consistentAppearTime"
          type="checkbox"
          name="consistent-time"
          class="transform scale-140"
        />
      </div>
    </div>
    <div class="w-full h-3 bg-black relative group block">
      <img
        class="absolute w-full h-40 inset-x-0 -top-42 duration-150"
        :class="didClick ? 'opacity-100 z-10' : 'opacity-0 z-0'"
        src="/hammer.gif"
        alt=""
      />
      <img
        :class="isShown ? 'max-h-40' : 'max-h-0'"
        class="
          cursor-pointer
          transform
          duration-150
          hover:scale-120
          absolute
          bottom-[-0.2rem]
          inset-x-0
          w-full
        "
        src="/molehappy.png"
        alt=""
        @click="clickMole()"
      />
    </div>
    <div v-if="isStarted" class="mt-3">
      <button
        class="
          text-green-400
          hover:(text-green-300
          transform
          scale-110)
          duration-150
          mr-2
        "
        @click="intensity > 199 ? (intensity = intensity - 100) : () => {}"
      >
        Intensify
      </button>
      <button
        class="
          text-red-400
          hover:(text-red-300
          transform
          scale-110)
          duration-150
          mr-2
        "
        @click="intensity < 2599 ? (intensity = intensity + 100) : () => {}"
      >
        Detensify
      </button>
      <span v-if="intensity < 200 || intensity > 2500" class="font-bold">
        <template v-if="intensity < 200"> Max </template>
        <template v-if="intensity > 2500"> Max </template>
        Intensity</span
      >
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import GenericInput from '../GenericInput.vue'
const defaultIntensity = 2000
const defaultStartTime = Math.floor(Math.random() * defaultIntensity) + 50
export default {
  components: {
    GenericInput,
  },
  data() {
    return {
      intervalHandler: () => {},
      isShown: false,
      didClick: false,
      appearTime: defaultStartTime,
      consistentAppearTime: false,
      baseTime: defaultStartTime,
      intensity: defaultIntensity,
    }
  },
  computed: {
    ...mapState({
      isStarted: (state) => state.game.isStarted,
    }),
  },
  watch: {
    didClick(value) {
      if (value) {
        const vm = this
        setTimeout(() => {
          vm.resetkMole()
          vm.startMole()
        }, 425)
      }
    },
    isStarted: {
      immediate: true,
      handler(value) {
        if (value) this.startMole()
        else {
          this.isShown = false
          this.stopMole()
          // reset time back to starter
          this.appearTime = this.baseTime
        }
      },
    },
    isShown() {
      if (!this.consistentAppearTime) {
        this.appearTime = Math.floor(Math.random() * this.intensity) + 50
      }
    },
    appearTime(value) {
      // only adjust base time when game isn't started
      if (!this.isStarted) {
        this.baseTime = this.appearTime
      }
    },
  },
  beforeDestroy() {
    clearInterval(this.intervalHandler)
  },
  methods: {
    startMole() {
      const vm = this
      this.intervalHandler = setInterval(() => {
        vm.isShown = !vm.isShown
        clearInterval(vm.intervalHandler)
        vm.startMole()
      }, vm.appearTime)
    },
    stopMole() {
      clearInterval(this.intervalHandler)
    },
    clickMole() {
      this.didClick = true
      this.$store.dispatch('game/incrementScore')
    },
    resetkMole() {
      this.didClick = false
      this.isShown = false
      this.stopMole()
    },
  },
}
</script>

<style scoped>
.appear-in {
  animation: 0.1s appear ease-in;
  /* margin: auto; */
}

@keyframes appear {
  0% {
    opacity: 0;
  }
}
</style>
