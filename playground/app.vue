<template>
  <div>
    Nuxt module playground!

    <p>name: {{ name }}</p>

    <button @click="changeName()">Change Name</button>
  </div>
</template>

<script setup lang="ts">
const name = useQueryRef('name', { first: 'Lukas', last: 'Smith' }, 'Object')

const changeName = () => {
  name.value.last = 'Hawk'
}
</script>
