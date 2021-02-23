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
    if(!active && time > 0) {
      setActive(true)
      setText('Pausar o ciclo')
    }else if(active && time > 0){
      setActive(false)
      setText('Retorna o ciclo')
    }else if(active && time === 0) {
      setText('Iniciar um ciclo')
      setActive(false)
      setTime(25*60)
    }
  }

  useEffect(() => {
    if(active &&  time > 0) {
      setTimeout(() => {
        setTime(time - 1)
      }, 1000);
    }
    if(time === 0) {
      setText('Reset')
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
        className={text != 'Reset' ? styles.countDownButton : styles.countDownButtonReset}
        onClick={startCountDown}
      >
        {text}
      </button>
    </div>
  )
}