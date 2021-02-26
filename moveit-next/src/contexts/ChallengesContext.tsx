import { createContext, useState, ReactNode, useEffect } from 'react'
import Cookies from 'js-cookie'
import challenges from '../../challenges.json'
import { LevelUpModal } from '../components/LevelUpModal';

interface Challenge {
  type: 'body' | 'eye';
  description: string;
  amount: number;
}
interface ChallengesContextData {
  level: number;
  currentExp: number;
  challengesCompleted: number; 
  experienceToNextLevel: number;
  activeChallenge: Challenge; 
  levelUp: () => void;
  startNewChallenge: () => void;
  resetChallenge: () => void;
  completeChallenge: () => void;
  closeLevelUpModal: () => void;
}

interface ChallengesProviderProps{
  children: ReactNode;
  level: number;
  currentExp: number;
  challengesCompleted: number;
} 

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({
  children, 
  ...rest
} : ChallengesProviderProps) {
  const [level, setLevel] = useState(rest.level ?? 1)
  const [currentExp, setCurrentExp] = useState(rest.currentExp ?? 0)
  const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0)
  const [activeChallenge, setActiveChallenge] = useState(null)
  const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false)

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

  useEffect(() => {
    Cookies.set('level', String(level));
    Cookies.set('currentExp', String(currentExp));
    Cookies.set('challengesCompleted', String(challengesCompleted));
  }, [level, currentExp, challengesCompleted]) 

  useEffect(() => {
    Notification.requestPermission()
  }, [])

  function levelUp() {
    setLevel(level + 1)
    setIsLevelUpModalOpen(true)
  }

  function closeLevelUpModal() {
    setIsLevelUpModalOpen(false)
  }

  function startNewChallenge() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
    const challenge = challenges[randomChallengeIndex] 

    setActiveChallenge(challenge)

    new Audio('/notification.mp3').play()

    if(Notification.permission === 'granted') {
      new Notification('Novo Desafio !!!', {
        body: `Valendo ${challenge.amount} xp !`
      })
    }
  }
  
  function resetChallenge() {
    setActiveChallenge(null)
  }

  function completeChallenge() {
    if(!activeChallenge) {
      return;
    }

    const { amount } =activeChallenge

    let finalExp = currentExp + amount

    if(finalExp > experienceToNextLevel) {
      finalExp = finalExp - experienceToNextLevel
      levelUp()
    }

    setCurrentExp(finalExp)
    setActiveChallenge(null)
    setChallengesCompleted(challengesCompleted + 1)
  }

  return (
    <ChallengesContext.Provider 
      value={{ 
        level, 
        currentExp, 
        challengesCompleted, 
        experienceToNextLevel,
        levelUp,
        startNewChallenge,
        activeChallenge,
        resetChallenge,
        completeChallenge,
        closeLevelUpModal,
      }}
    >
      {children}
      { isLevelUpModalOpen ? <LevelUpModal /> : null}
    </ChallengesContext.Provider>
  )
}