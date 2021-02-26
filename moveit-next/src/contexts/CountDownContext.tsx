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
  label: string;
  hasFinished: boolean;
  isActive: boolean;
  isPaused: boolean;
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
  const [isPaused, setIsPaused] = useState(false)
  const [hasFinished, setHasFinished] = useState(false) 
  const [text, setText] = useState(countDownButtonLabels.initialCycle)
  
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  const label = !isPaused ? countDownButtonLabels.pauseCycle : countDownButtonLabels.returnCycle
  const conditionToStart = text != countDownButtonLabels.leaveCycle ? styles.countDownButton : `${styles.countDownButton} ${styles.countDownButtonReset}`
  const conditionToPause = isActive && text != countDownButtonLabels.finishedCycle
  
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

  return(
    <CountDownContext.Provider
      value={{
        minutes,
        seconds,
        text,
        conditionToStart,
        conditionToPause,
        label,
        hasFinished,
        isActive,
        isPaused,
        startCountDown,
        pauseCountDown,
      }}
    >
      {children}
    </CountDownContext.Provider>
  )
}