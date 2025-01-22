<template>
  <div>
    Nuxt module playground!

    <p>name: {{ name }}</p>

    <button @click="changeName()">Change Name</button>
  </div>
</template>

<script setup lang="ts">
const name = useQueryRef('name', 123)

const changeName = () => {
  name.value++
}
</script>
