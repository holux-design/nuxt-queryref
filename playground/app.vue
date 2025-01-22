<template>
  <div>
    Nuxt module playground!

    <p>message: {{ message }}</p>

    <button @click="changeText('Hello Nuxt module!')">Change Text</button>
    <button @click="changeText('Hello world!')">Reset Text</button>
  </div>
</template>

<script setup lang="ts">
const message = useQueryRef("message", "Hello world!");

const changeText = (text: string) => {
  message.value = text;
};
</script>
