import { useState, useEffect } from 'react'
import styles from '../styles/components/CountDown.module.css'

export function CountDown() {
  const [time, setTime] = useState(25*60)
  const [active, setActive] = useState(false)
  const [text, setText] = useState('Iniciar um ciclo')
  
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  // Diego way
  // const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('')
  // const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('')

  // My way
  const [minuteLeft, minuteRight] = String(minutes).length > 1 ? String(minutes).split('') : ['0', String(minutes)]
  const [secondLeft, secondRight] = String(seconds).length > 1 ? String(seconds).split('') : ['0', String(seconds)]

  function startCountDown() {
    if(!active) {
      setActive(true)
      setText('Pausar o ciclo')
    }else {
      setActive(false)
      setText('Retorna o ciclo')
    }
  }

  useEffect(() => {
    if(active &&  time > 0) {
      setTimeout(() => {
        setTime(time - 1)
      }, 1000);
    }
  }, [active, time])

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
      <button 
        type="button" 
        className={styles.countDownButton}
        onClick={startCountDown}
      >
        {text}
      </button>
    </div>
  )
}