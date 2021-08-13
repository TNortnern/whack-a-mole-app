<template>
  <div class="w-4/5 my-20 md:my-24 md:mx-8 md:w-1/3 lg:w-1/5">
    <div class="w-full h-3 bg-black relative group block">
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
        @click="$store.dispatch('game/incrementScore')"
      />
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    isShown: false,
  }),
  mounted() {
    const vm = this
    setInterval(() => {
      vm.isShown = !vm.isShown
    }, 1000)
  },
}
</script>
