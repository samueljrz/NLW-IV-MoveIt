import Head from 'next/head'

import { ExperienceBar } from '../components/ExperienceBar'
import { Profile } from '../components/Profile'
import { CompletedChallenges } from '../components/CompletedChallenges'
import { CountDown } from '../components/CountDown'
import { ChallengeBox } from '../components/ChallengeBox'

import styles from '../styles/pages/Home.module.css'



export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Inicio | Move.It</title>
      </Head>
      <ExperienceBar />
      <section>
        <div>
          <Profile />
          <CompletedChallenges />
          <CountDown />
        </div>
        <div>
          <ChallengeBox />
        </div>
      </section>
    </div>
  )
}
