<template>
  <div class="max-w-7xl mx-auto pt-40">
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
  }),
  mounted() {
    const vm = this
    setInterval(() => {
      vm.isShown = !vm.isShown
    }, 1000)
  },
}
</script>
