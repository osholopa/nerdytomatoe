function toTimeString(time) {
  if (Number(time) < 10) {
    return `0${Number(time)}`
  }
  return time.toString()
}

function decreaseBySecond(time) {
  let decreasedTime = { minutes: undefined, seconds: undefined }
  const seconds = Number(time.seconds)
  const minutes = Number(time.minutes)

  if (seconds === 0 && minutes > 0) {
    decreasedTime.seconds = toTimeString(59)
    decreasedTime.minutes = toTimeString(minutes - 1)
  } else {
    decreasedTime.minutes = toTimeString(minutes)
    decreasedTime.seconds = toTimeString(seconds - 1)
  }
  return decreasedTime
}

var app = new Vue({
  el: '#app',
  data: {
    timerValue: { minutes: '05', seconds: '00' },
    selectedLength: '',
    timerIntervalId: undefined,
  },
  methods: {
    startTimer: function () {
      if (this.timerIntervalId) {
        clearInterval(this.timerIntervalId)
      }
      this.timerIntervalId = setInterval(() => {
        this.timerValue = decreaseBySecond(this.timerValue)
      }, 1000)
    },
    stopTimer: function () {
      clearInterval(this.timerIntervalId)
      this.timerIntervalId = undefined
    },
    onSelectedLengthChange: function (event) {
      this.stopTimer()
      this.selectedLength = event.target.value
      this.timerValue = { minutes: event.target.value, seconds: '00' }
    },
    resetTimer: function () {
      clearInterval(this.timerIntervalId)
      this.timerIntervalId = undefined
      this.timerValue = { minutes: this.selectedLength, seconds: '00' }
    },
  },
})
