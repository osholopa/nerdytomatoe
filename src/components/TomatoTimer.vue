<template>
  <div class="hello">
    <h1>{{ title }}</h1>
    <p>{{ timerValue.minutes }}:{{ timerValue.seconds }}</p>
    <select v-on:change="onSelectedLengthChange" v-model="selectedLength">
      <option disabled value="">Please select a length</option>
      <option selected="selected" value="25">25 min</option>
      <option value="45">45 min</option>
      <option value="60">60 min</option>
    </select>
    <button v-on:click="startTimer">Start</button>
    <button v-on:click="stopTimer">Stop</button>
    <button v-on:click="resetTimer">Reset</button>
    <a
      target="_blank"
      rel="noopener noreferrer"
      href="https://en.wikipedia.org/wiki/Pomodoro_Technique"
      >What is pomodoro technique?</a
    >
  </div>
</template>

<script>
import { Howl } from "howler";
const alertSfx = require("../assets/timer.wav");
export default {
  name: "HelloWorld",
  props: {
    title: String,
  },
  data: function () {
    return {
      selectedLength: "25",
      timerValue: { minutes: "00", seconds: "05" },
      timerIntervalId: undefined,
    };
  },
  methods: {
    toTimeString: function (time) {
      if (Number(time) < 10) {
        return `0${Number(time)}`;
      }
      return time.toString();
    },
    decreaseBySecond: function (time) {
      let decreasedTime = { minutes: undefined, seconds: undefined };
      const seconds = Number(time.seconds);
      const minutes = Number(time.minutes);

      if (seconds === 0 && minutes > 0) {
        decreasedTime.seconds = this.toTimeString(59);
        decreasedTime.minutes = this.toTimeString(minutes - 1);
      } else {
        decreasedTime.minutes = this.toTimeString(minutes);
        decreasedTime.seconds = this.toTimeString(seconds - 1);
      }
      if (decreasedTime.minutes === "00" && decreasedTime.seconds === "00") {
        this.stopTimer();
        this.playSound();
        return { minutes: this.selectedLength, seconds: "00" };
      }
      return decreasedTime;
    },
    startTimer: function () {
      if (this.timerIntervalId) {
        clearInterval(this.timerIntervalId);
      }
      this.timerIntervalId = setInterval(() => {
        this.timerValue = this.decreaseBySecond(this.timerValue);
      }, 1000);
    },
    stopTimer: function () {
      clearInterval(this.timerIntervalId);
      this.timerIntervalId = undefined;
    },
    onSelectedLengthChange: function (event) {
      this.stopTimer();
      this.selectedLength = event.target.value;
      this.timerValue = { minutes: event.target.value, seconds: "00" };
    },
    resetTimer: function () {
      clearInterval(this.timerIntervalId);
      this.timerIntervalId = undefined;
      this.timerValue = { minutes: this.selectedLength, seconds: "00" };
    },
    playSound: function () {
      console.log("play");
      let sound = new Howl({
        src: alertSfx,
        volume: 0.5,
      });
      sound.play();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.hello {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
