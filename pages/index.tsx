import Head from 'next/head'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import useSound from 'use-sound'
import Image from 'next/image'

interface TimerValue {
  minutes: string
  seconds: string
}

enum Mode {
  Pomodoro = 'POMODORO',
  Break = 'BREAK',
}

export default function Home() {
  const initialTime = {
    minutes: '25',
    seconds: '00',
  }
  const [mode, setMode] = useState<Mode>(Mode.Pomodoro)
  const [intervalId, setIntervalId] = useState(undefined)
  const [timerValue, setTimerValue] = useState<TimerValue>(initialTime)
  const [selectedLength, setSelectedLength] = useState<TimerValue>(initialTime)
  const [playAlertSfx] = useSound('../timer.wav')

  function toTimeString(time: number): string {
    if (Number(time) < 10) {
      return `0${Number(time)}`
    }
    return time.toString()
  }

  function decreaseBySecond(time: TimerValue): TimerValue {
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

  useEffect(() => {
    if (timerValue.minutes === '00' && timerValue.seconds === '00') {
      console.log('STOP')
      playAlertSfx()
      stop()
    }
  }, [timerValue])

  function tick() {
    setTimerValue((time) => decreaseBySecond(time))
  }

  function start() {
    clearInterval(intervalId)
    setIntervalId(
      setInterval(() => {
        tick()
      }, 1000)
    )
  }

  function stop() {
    clearInterval(intervalId)
    setIntervalId(undefined)
  }

  function reset() {
    clearInterval(intervalId)
    setIntervalId(null)
    setTimerValue(selectedLength)
  }

  function onTimerValueChange(event) {
    if (mode !== Mode.Break) {
      setTimerValue({ minutes: event.target.value, seconds: '00' })
    }
    setSelectedLength({ minutes: event.target.value, seconds: '00' })
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Tomato timer</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Image
          width={500}
          height={400}
          src="/images/tomato.png"
          alt="tomato-img"
        />
        <h1 className={styles.title}>Tomato timer</h1>
        <div className={styles.wrapper}>
          <div
            className={styles.mode}
            onClick={() => {
              setMode(Mode.Pomodoro)
              setTimerValue(selectedLength)
              start()
            }}
          >
            Pomodoro
          </div>
          <div
            className={styles.mode}
            onClick={() => {
              setMode(Mode.Break)
              setTimerValue({ minutes: '05', seconds: '00' })
              start()
            }}
          >
            5-Minute break
          </div>
          <div
            className={styles.mode}
            onClick={() => {
              setMode(Mode.Break)
              setTimerValue({ minutes: '15', seconds: '00' })
              start()
            }}
          >
            15-Minute break
          </div>
        </div>
        <div className={styles.select}>
          <label htmlFor="initialTime">Set tomato length:</label>
          <select
            id="initialTime"
            onChange={onTimerValueChange}
            name="initialTime"
            value={selectedLength.minutes}
          >
            <option value="25">25 min</option>
            <option value="45">45 min</option>
            <option value="60">60 min</option>
          </select>
        </div>

        <p
          className={styles.time}
        >{`${timerValue.minutes}:${timerValue.seconds}`}</p>
        <div className={styles.wrapper}>
          <button className={styles.start} onClick={start}>
            Start
          </button>
          <button className={styles.stop} onClick={stop}>
            Stop
          </button>
          <button className={styles.reset} onClick={reset}>
            Reset
          </button>
        </div>
      </main>
    </div>
  )
}
