import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <main className={styles.main}>
      <div  className={styles.images}>
        <span>
          <Image
            src="/gtech.png"
            alt="GA Tech Logo"
            width={250}
            height={70}
            priority
          />
          </span>
          <span>
            <Image
              src="/united-way.png"
              width={250}
              height={80}
              priority
            />
          </span>
        </div>

        <h1>
          United Way of Metro Atlanta - Emergency Food and Shelter Program
        </h1>

        <div className={styles.card}>
          <h3>
            About This Project
          </h3>
          <span>
            The Emergency Food and Shelter Program is a federal grant that provides funds to agencies for emergency financial assistance for individuals and families in crisis. United Way of Greater Atlanta administers this grant in eight metro counties.
            This application tracks the recipients of funds for grant administers and to provide an interface for logging distributions and providing analytics about previous funding records.
          </span>        
        </div>

        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Role</th>
              <th>Goal</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{'Andrew Spittlemeister '}</td>
              <td>{'Backend/Data Engineer and Team lead'}</td>
              <td>{'Develop a working and easy to use MVP for client to be able to use'}</td>
            </tr>
            <tr>
              <td>{'Bryan Xian '}</td>
              <td>{'Backend/Data Engineer'}</td>
              <td>{'Develop a working and easy to use MVP for client to be able to use'}</td>
            </tr>
            <tr>
              <td>{'Marium Ali'}</td>
              <td>{'Full Stack Engineer'}</td>
              <td>{'Develop a working and easy to use MVP for client to be able to use. I would like the client to be able to process a new request for shelter as soon as possible identifying the duplication rules and make a decision without much manual interaction. Additionally, the interface should be easy to use and training-free. My goal is to use my expertise and make that happen as a team !'}</td>
            </tr>
            <tr>
              <td>{'Pallavi Bhatnagar'}</td>
              <td>{'Full Stack Engineer'}</td>
              <td>{'Develop a working and easy to use MVP for client to be able to use'}</td>
            </tr>
          </tbody>
        </table>

        <div className={styles.card}>
          <h3>
            Goals of this Project
          </h3>
          <span>
          <li>Provide an online form to submit funding requests</li>
          <li>Maintain a database of all previous funding grants</li>
          <li>Provide an interface to view previous grants</li>
          <li>Enable administers to view the current status of funding</li>
          </span>
        </div>

        <div className={styles.card}>
          <h3>
            Lighthouse scores
          </h3>
          <span>

          </span>        
        </div>
      </main>
    </>
  )
}
