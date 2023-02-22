import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import { useSession, signIn } from "next-auth/react"
import { useRouter } from 'next/router';

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
  const router = useRouter();
  const { data: session } = useSession();
  <Head>
    <title>{"EFSP Dashboard"}</title>
    <meta property="og:title" content="EFSP Dashboard" key="title" />
  </Head>
  return (
    <>
      <main className={styles.main}>
        <h1>{WELCOME_MESSAGE}</h1>
        <div className={styles.card}>{WELCOME_PROMPT}</div>
        <div className={styles.container}>Click to sign into your gmail user account </div><br />

        {
          session ? (
            <div className={styles.card}>
              <h2>
                Process Application Form
              </h2>
              <br></br>
              <button className={styles.button} style={{margin: 'auto'}} onClick={() => router.push('/form')}>
                Process New Application
              </button>
            </div>
          ) : (
            <button className={styles.button} onClick={() => signIn()}>Sign In</button>
          )
        }
      </main>
    </>
  );
}