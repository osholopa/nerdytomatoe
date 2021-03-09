<template>
  <button :class="className" v-on:click="click">{{ text }}</button>
</template>

<script>
export default {
  name: "Button",
  props: {
    text: String,
    className: String,
  },
  methods: {
    click: function () {
      this.$emit("click");
    },
  },
};
</script>

<style scoped>
.start {
  background-color: rgb(32, 153, 32);
  color: #fafafa;
}

.stop {
  background-color: rgb(175, 58, 58);
  color: #fafafa;
}

.reset {
  background-color: rgb(211, 182, 19);
  color: #0a0a0a;
}
.timer-mode-btn {
  margin: 0.5rem;
  padding: 0.5rem 1.5rem;
  font-size: 1rem;
  border: 1px solid black;
  border-radius: 0px;
  cursor: pointer;
  background-color: rgb(28, 32, 95);
  color: #fafafa;
}

.timer-mode-btn:hover {
  opacity: 0.6;
}

.timer-mode-btn:focus {
  outline-color: rgb(102, 175, 243);
}

.timer-mode-btn:active {
  background-color: rgb(102, 175, 243);
}
</style>