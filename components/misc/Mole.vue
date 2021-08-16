<template>
  <div class="w-4/5 my-20 md:my-24 md:mx-8 md:w-1/3 lg:w-1/5">
    <template v-if="!$store.state.game.isStarted">
      <generic-input
        v-model="appearTime"
        label="Mole appear time"
        placeholder="Appear time"
        name="appear-time"
        type="number"
        class="mb-8"
      />
    </template>
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
  </div>
</template>

<script>
import { mapState } from 'vuex'
import GenericInput from '../GenericInput.vue'
export default {
  components: {
    GenericInput,
  },
  data() {
    const defaultStartTime = Math.floor(Math.random() * 2000) + 50
    return {
      intervalHandler: () => {},
      isShown: false,
      didClick: false,
      appearTime: defaultStartTime,
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
        }
      },
    },
    isShown() {
      this.appearTime = Math.floor(Math.random() * 2000) + 50
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
      }, this.appearTime)
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
