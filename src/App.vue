<template>
  <div id="app">
    <img alt="Tomato logo" class="logo" src="./assets/tomato.png" />
    <TomatoTimer title="Tomato timer" />
    <footer class="footer">
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://en.wikipedia.org/wiki/Pomodoro_Technique"
        >What is this app for?</a
      >
    </footer>
  </div>
</template>

<script>
import TomatoTimer from "./components/TomatoTimer.vue";

export default {
  name: "App",
  components: {
    TomatoTimer,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.logo {
  max-width: 30vw;
}
.footer {
  position: relative;
  width: 100%;
}
</style>
