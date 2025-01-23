<template>
  <div class="bg-black text-white w-screen h-screen p-4">
    <input
      v-model="name"
      type="text"
      placeholder="Type name"
      class="bg-transparent border border-white px-4 py-2 rounded-md"
    >
  </div>
</template>

<script setup lang="ts">
const name = queryRef('name', '')
</script>
