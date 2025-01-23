<template>
  <div class="bg-black text-white w-screen h-screen p-4">
    <pre>{{ name }}</pre>

    <br>
    <br>
    <button @click="change()">
      Change
    </button>
    <br>
    <button @click="reset()">
      Reset
    </button>
  </div>
</template>

<script setup lang="ts">
const name = queryRef('name', ['Lukas', 'Ipsum'])

const change = () => {
  name.value[0] = 'Max'
}
const reset = () => {
  name.value = ['Lukas', 'Ipsum']
}
</script>
