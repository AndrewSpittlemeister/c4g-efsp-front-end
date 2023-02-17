import Head from 'next/head'
import styles from '@/styles/Home.module.css'

const WELCOME_MESSAGE = "\
Welcome to the United Way of Metro Atlanta - \
Emergency Food and Shelter Program Dashboard\
"

const WELCOME_PROMPT = "\
This application is an online portal for logging and monitoring funding \
requests to the EFSP database. To use these capabilities, log in with the \
button below.\
"

export default function Home() {
  return (
    <>
      <Head>
        <title>{"EFSP Dashboard"}</title>
        <meta property="og:title" content="EFSP Dashboard" key="title" />
      </Head>
      <main className={styles.main}>
        <h1>{WELCOME_MESSAGE}</h1>
        <div className={styles.card}>{WELCOME_PROMPT}</div>
        <h1>{  }</h1>
        <button className={styles.card} onClick={() => {console.log("login button clicked");}}>Login</button>
      </main>
    </>
  )
}
