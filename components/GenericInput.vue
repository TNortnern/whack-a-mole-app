<template>
  <div>
    <label :for="name" class="mb-1 block">
      {{ label }}
    </label>
    <input
      :id="id || Math.random().toString(36).substring(7)"
      :type="type"
      :value="value"
      :placeholder="placeholder"
      :name="name"
      v-bind="input && input.$attrs"
      class="
        px-4
        py-2
        rounded-md
        hover:bg-gray-100
        duration-100
        border-2 border-black
        focus:(ring-4
        ring-blue-300)
        w-full
      "
      @input="$emit('input', $event.target.value)"
    />
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: [String, Number],
      default: '',
    },
    id: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'text',
    },
    label: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    input: {
      type: Object,
      default: null,
    },
  },
}
</script>

<style></style>
