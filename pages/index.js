import Head from 'next/head'
import styles from '@/styles/Home.module.css'


export default function Home() {
  return (
    <>
      <Head>
        <title>{"EFSP Dashboard"}</title>
        <meta property="og:title" content="EFSP Dashboard" key="title" />
      </Head>
      <main className={styles.main}>
        <h1>
          United Way of Metro Atlanta - Emergency Food and Shelter Program
        </h1>
      </main>
    </>
  )
}
