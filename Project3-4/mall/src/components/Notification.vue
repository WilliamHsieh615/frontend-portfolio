<template>

  <div class="position-fixed top-0 end-0 p-3" style="z-index: 1050">
    <div class="toast show align-items-center text-white bg-success border-0" style="opacity: 0.9;"
      v-for="(message, i) in toasts" :key="i">
      <div class="d-flex mb-2">
        <div class="toast-body">{{ message }}</div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" @click="toasts.splice(i, 1)"></button>
      </div>
    </div>
  </div>

</template>

<script setup>

const props = defineProps({
  toasts: {
    type: Array,
    required: true
  }
})

</script>
