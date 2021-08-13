<template>
  <div class="w-4/5 my-20 md:my-24 md:mx-8 md:w-1/3 lg:w-1/5">
    <div class="w-full h-3 bg-black relative group block">
      <img
        class="absolute w-full h-40 inset-x-0 -top-42 duration-150"
        :class="didClick ? 'opacity-100 z-10' : 'opacity-0 z-0'"
        src="/hammer.png"
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
        @click="resetMole(), $store.dispatch('game/incrementScore')"
      />
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    intervalHandler: () => {},
    isShown: false,
    didClick: false,
  }),
  watch: {
    didClick(value) {
      if (value) {
        const vm = this
        setTimeout(() => {
          vm.didClick = false
          vm.isShown = false
          vm.stopMole()
          vm.startMole()
        }, 400)
      }
    },
  },
  beforeDestroy() {
    clearInterval(this.intervalHandler)
  },
  mounted() {
    this.startMole()
  },
  methods: {
    startMole() {
      const vm = this
      this.intervalHandler = setInterval(() => {
        vm.isShown = !vm.isShown
      }, 1000)
    },
    stopMole() {
      clearInterval(this.intervalHandler)
    },
    resetMole() {
      this.didClick = true
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
