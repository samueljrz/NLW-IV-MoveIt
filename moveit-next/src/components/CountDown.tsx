import { useState, useEffect, useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallengesContext'
import styles from '../styles/components/CountDown.module.css'

let countDownTimeout: NodeJS.Timeout

enum countDownButtonLabels {
  pauseCycle = 'Pausar ciclo',
  initialCycle = 'Iniciar ciclo',
  returnCycle = 'Retorna ciclo',
  finishedCycle = 'Ciclo encerrado',
  leaveCycle = 'Abandonar ciclo',
}

export function CountDown() {
  const { startNewChallenge } = useContext(ChallengesContext)
  
  const [time, setTime] = useState(5*1)
  const [isActive, setIsActive] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [hasFinished, setHasFinished] = useState(false) 
  const [text, setText] = useState(countDownButtonLabels.initialCycle)
  
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  const label = !isPaused ? countDownButtonLabels.pauseCycle : countDownButtonLabels.returnCycle
  const conditionToStart = text != countDownButtonLabels.leaveCycle ? styles.countDownButton : `${styles.countDownButton} ${styles.countDownButtonReset}`
  const conditionToPause = isActive && text != countDownButtonLabels.finishedCycle

  // Diego way
  // const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('')
  // const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('')

  // My way
  const [minuteLeft, minuteRight] = String(minutes).length > 1 ? String(minutes).split('') : ['0', String(minutes)]
  const [secondLeft, secondRight] = String(seconds).length > 1 ? String(seconds).split('') : ['0', String(seconds)]

  function startCountDown() {
    if(!isActive && time > 0) {
      setIsActive(true)
      setText(countDownButtonLabels.leaveCycle)
    }else if(isActive && time > 0) {
      setIsActive(false)
      setIsPaused(false)
      setText(countDownButtonLabels.initialCycle)
      clearTimeout(countDownTimeout)
      setTime(25*60)
    }
  }

  function pauseCountDown() {
    if(!isPaused && time > 0) {
      setIsPaused(true)
    }else if(isPaused && time > 0){
      setIsPaused(false)
    }
  }

  useEffect(() => {
    if(isActive && !isPaused &&  time > 0) {
      countDownTimeout = setTimeout(() => {
        setTime(time - 1)
      }, 1000);
    }
    if(isActive && time === 0) {
      setHasFinished(true);
      setIsActive(false);
      setText(countDownButtonLabels.finishedCycle)
      startNewChallenge()
    }
  }, [isActive, isPaused, time])

  return (
    <div>
      <div className={styles.countDownContainer}>
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondLeft}</span>
          <span>{secondRight}</span>
        </div>
      </div>
      {hasFinished ? (
        <button 
          disabled
          className={styles.countDownButton}
        >
          {text}
        </button>
      ) 
      : (
        <>
          <button 
            type="button" 
            className={conditionToStart}
            onClick={startCountDown}
          >
            {text}
          </button>
          { conditionToPause ? 
            <button 
              type="button" 
              className={`${styles.countDownButton} ${styles.countDownButtonPause}`}
              onClick={pauseCountDown}
            >
              {label}
            </button> : null 
          }
        </>
        )
      }
    </div>
  )
}