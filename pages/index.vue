<template>
  <div class="max-w-7xl mx-auto pt-40">
    <div class="flex justify-center mb-24 border border-black py-4">
      <div>
        <p class="text-5xl font-bold mb-8">Game Controls</p>
        <input
          v-model="timer"
          class="
            px-4
            py-2
            rounded-md
            hover:bg-gray-100
            duration-100
            border-2 border-black
          "
          placeholder="Game Time"
          type="number"
        />
        <button
          class="
            bg-green-400
            text-white
            duration-150
            rounded-md
            hover:bg-green-500
            px-5
            py-1
            mt-3
            mb-5
            block
          "
        >
          Start game
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
import Mole from '~/components/misc/Mole.vue'
export default {
  components: { Mole },
  data: () => ({
    isShown: false,
    timer: 2000,
  }),
  mounted() {
    const vm = this
    setInterval(() => {
      vm.isShown = !vm.isShown
    }, 1000)
  },
}
</script>
