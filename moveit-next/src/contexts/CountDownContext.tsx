import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import styles from '../styles/components/CountDown.module.css'
import { ChallengesContext } from "./ChallengesContext";

enum countDownButtonLabels {
  pauseCycle = 'Pausar ciclo',
  initialCycle = 'Iniciar ciclo',
  returnCycle = 'Retorna ciclo',
  finishedCycle = 'Ciclo encerrado',
  leaveCycle = 'Abandonar ciclo',
}


interface CountDownContextData {
  minutes: number;
  seconds: number;
  text: string;
  conditionToStart: string;
  conditionToPause: boolean;
  labels: string;
  hasFinished: boolean;
  isActive: boolean;
  isPause: boolean;
  startCountDown: () => void;
  pauseCountDown: () => void;
}

interface CountDownProviderProps{
  children: ReactNode
} 

export const CountDownContext = createContext({} as CountDownContextData)

export function CountDownProvider({ children } : CountDownProviderProps) {
  let countDownTimeout: NodeJS.Timeout
  
  const { startNewChallenge } = useContext(ChallengesContext)
  
  const [time, setTime] = useState(5*1)
  const [isActive, setIsActive] = useState(false)
  const [isPause, setIsPause] = useState(false)
  const [hasFinished, setHasFinished] = useState(false) 
  const [text, setText] = useState(countDownButtonLabels.initialCycle)
  
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  const labels = !isPause ? countDownButtonLabels.pauseCycle : countDownButtonLabels.returnCycle
  const conditionToStart = text != countDownButtonLabels.leaveCycle ? styles.countDownButton : `${styles.countDownButton} ${styles.countDownButtonReset}`
  const conditionToPause = isActive && text != countDownButtonLabels.finishedCycle
  
  function startCountDown() {
    if(!isActive && time > 0) {
      setIsActive(true)
      setText(countDownButtonLabels.leaveCycle)
    }else if(isActive && time > 0) {
      setIsActive(false)
      setIsPause(false)
      setText(countDownButtonLabels.initialCycle)
      clearTimeout(countDownTimeout)
      setTime(25*60)
    }
  }

  function pauseCountDown() {
    if(!isPause && time > 0) {
      setIsPause(true)
    }else if(isPause && time > 0){
      setIsPause(false)
    }
  }

  useEffect(() => {
    if(isActive && !isPause &&  time > 0) {
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
  }, [isActive, isPause, time])

  return(
    <CountDownContext.Provider
      value={{
        minutes,
        seconds,
        text,
        conditionToStart,
        conditionToPause,
        labels,
        hasFinished,
        isActive,
        isPause,
        startCountDown,
        pauseCountDown,
      }}
    >
      {children}
    </CountDownContext.Provider>
  )
}