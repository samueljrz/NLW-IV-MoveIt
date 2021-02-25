import { useState, useEffect, useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallengesContext'
import { CountDownContext } from '../contexts/CountDownContext'
import styles from '../styles/components/CountDown.module.css'

export function CountDown() {
  const { 
    minutes, 
    seconds, 
    hasFinished, 
    text, 
    conditionToStart, 
    startCountDown, 
    conditionToPause, 
    pauseCountDown, 
    labels,
  } = useContext(CountDownContext)
  
  // Diego way
  // const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('')
  // const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('')

  // My way
  const [minuteLeft, minuteRight] = String(minutes).length > 1 ? String(minutes).split('') : ['0', String(minutes)]
  const [secondLeft, secondRight] = String(seconds).length > 1 ? String(seconds).split('') : ['0', String(seconds)]


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