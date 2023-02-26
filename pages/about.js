import Image from 'next/image'
import Head from 'next/head'
import Link from "next/link";
import styles from '@/styles/Home.module.css'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'


export default function AboutPage() {
  const router = useRouter();
  const { data: session } = useSession();
  return (
    <>
      <Head>
        <title>{"EFSP Dashboard"}</title>
        <meta property="og:title" content="EFSP Dashboard" key="title" />
      </Head>
      <main className={styles.main}>
        <div className={styles.images}>
          <span>
            <Image
              src="/gtech.png"
              alt="GA Tech Logo"
              width={250}
              height={80}
              priority
            />
          </span>
          <span>
            <Image
              src="/united-way.png"
              alt="United Way Logo"
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
          <h2>
            About This Project
          </h2>
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
              <td>{'Andrew Spittlemeister'}</td>
              <td>{'Backend/Data Engineer and Team lead'}</td>
              <td>{'Contribute to building an application that can streamline the process of managing shelter funding requests, checking for duplication, and providing an informative view for administrators. I would also like to help provide support to my team and facilitate their abilities to create a well-rounded application.'}</td>
            </tr>
            <tr>
              <td>{'Bryan Xian '}</td>
              <td>{'Backend/Data Engineer'}</td>
              <td>{'Develop a working and easy to use MVP for client. I would like to make a positive and lasting impact on the Metro Atlanta community by the end of this project. I plan to do this by using my software engineering skills to save employees of United Way of Atlanta time, so they can better serve the community.'}</td>
            </tr>
            <tr>
              <td>{'Marium Ali'}</td>
              <td>{'Full Stack Engineer'}</td>
              <td>{"Develop a working and easy to use MVP for client to be able to use. I would like the client to be able to process a new request for shelter as soon as possible identifying the duplication rules and make a decision without much manual interaction. Additionally, the interface should be easy to use and training-free. My goal is to use my expertise and make that happen as a team!"}</td>
            </tr>
            <tr>
              <td>{'Pallavi Bhatnagar'}</td>
              <td>{'Full Stack Engineer'}</td>
              <td>{'Develop a working and easy to use Minimal Loveable Product for the client. Working with the team I will contibute to all phases of software devlopment lifecycle for United Way. My goal will be to ensure we maintain high quality work and meet all the requirements stated by the partner.'}</td>
            </tr>
          </tbody>
        </table>

        <div className={styles.card}>
          <h2>
            Goals of this Project
          </h2>
          <span>
            <ul>
              <li>Provide an online form to submit funding requests</li>
              <li>Provide an automated solution to detect if the funding should be approved or denied</li>
              <li>Maintain a database of all previous funding grants</li>
              <li>Provide an interface to view previous grants</li>
              <li>Enable administers to view the current status of funding</li>
            </ul>
          </span>
        </div>

        <div className={styles.card}>
          <h2>
            Lighthouse scores
          </h2>
          <span>
            <ul>
              <li>Performance: 100%</li>
              <li>Accessability: 100%</li>
              <li>Best Practices: 100%</li>
              <li>SEO: 100%</li>
              <li>PWA: 100%</li>
            </ul>
          </span>
        </div>

        <div className={styles.card}>
          <h2 style={{margin: 'auto'}}>Project Overview Presentation</h2>
          <br></br>
          <p className={"nav__menu-list"} style={{margin: 'auto'}}>
            <Link href={"https://gtvault-my.sharepoint.com/:b:/g/personal/aws3_gatech_edu/EZYxFD0lUUtBuHNpYNKPTEABk-LKQPHTRXvv17vPIYWG0g?e=ZfAMPM"}>{"Presentation Slides Link"}</Link>
          </p>
          <br></br>
          <p className={"nav__menu-list"} style={{margin: 'auto'}}>
            <Link href={"https://gtvault-my.sharepoint.com/:v:/g/personal/aws3_gatech_edu/EaXFcW3I-39LplIYwZwvBVcB3J0pgz3hu3tcdVWkyYVT8w?e=XC2KKr"}>{"Presentation Video Link"}</Link>
          </p>
        </div>
      </main>
    </>
  )
}