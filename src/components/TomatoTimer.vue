<template>
  <div class="hello">
    <h1>{{ title }}</h1>
    <div class="button-wrapper">
      <Button
        text="Pomodoro"
        @click="resetAndStart"
        className="timer-mode-btn"
      />
      <Button
        text="5-minute break"
        @click="resetAndStart(5)"
        className="timer-mode-btn"
      />
      <Button
        text="15-minute break"
        @click="resetAndStart(15)"
        className="timer-mode-btn"
      />
    </div>
    <div class="select-wrapper">
      <select v-on:change="onSelectedLengthChange" v-model="selectedLength">
        <option disabled value="">Please select a length</option>
        <option selected="selected" value="25">25 min</option>
        <option value="45">45 min</option>
        <option value="60">60 min</option>
      </select>
    </div>
    <p class="time">{{ timerValue.minutes }}:{{ timerValue.seconds }}</p>
    <div class="button-wrapper">
      <Button text="Start" @click="startTimer" className="start" />
      <Button text="Stop" @click="stopTimer" className="stop" />
      <Button text="Reset" @click="resetTimer" className="reset" />
    </div>    
  </div>
</template>

<script>
import { Howl } from "howler";
import Button from "./Button.vue";

const alertSfx = require("../assets/timer.wav");

export default {
  name: "HelloWorld",
  props: {
    title: String,
  },
  components: {
    Button,
  },
  data: function () {
    return {
      selectedLength: "25",
      timerValue: { minutes: "25", seconds: "00" },
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
    resetTimer: function (minutes = this.selectedLength) {
      clearInterval(this.timerIntervalId);
      this.timerIntervalId = undefined;
      this.timerValue = {
        minutes: this.toTimeString(minutes),
        seconds: this.toTimeString(0),
      };
    },
    playSound: function () {
      console.log("play");
      let sound = new Howl({
        src: alertSfx,
        volume: 0.5,
      });
      sound.play();
    },
    resetAndStart: function (at) {
      this.resetTimer(at);
      this.startTimer();
    },
  },
};
</script>

<style>
@import "./TomatoTimer.module.css";
</style>
