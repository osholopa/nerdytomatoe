<template>
  <button class="timer-mode-btn" v-on:click="click">
    {{ text }}
  </button>
</template>

<script>
export default {
  name: "PresetButton",
  props: {
    text: String,
  },
  methods: {
    click: function () {
      this.$emit("click");
    },
  },
};
</script>

<style>

</style>
