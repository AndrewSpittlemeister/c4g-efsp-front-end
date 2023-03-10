import styles from '@/styles/Home.module.css'
import React, { useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from 'next/router';

export default function ConfirmationPage({ params }) {
    const router = useRouter();
    const { data: session } = useSession();

    console.log(`params: ${router.query}`)
    const data = router.query;

    // TODO: gather similar records from the database

    // TODO: add callback for approve and deny buttons to either send data to database or kick back to form page.

    // TODO: add an alert when a request is approved

    return (
        <main className={styles.main}>
            <h1>
                Form Confirmation
            </h1>

            <div className={styles.card}>
                <h2>
                    {`Pending Request for "${data.firstname} ${data.middlename} ${data.lastname}" (${data.email}) (${data.directIndirect})`}
                </h2>
                <br></br>
                <p>{`DOB: ${data.dob}`}</p>
                <p>{`Agency: ${data.agencyname}`}</p>
                <p>{`Jurisdiction: ${data.jurisdiction}`}</p>
                <p>{`One Month Amount: \$${data.onemonthamt}`}</p>
                <p>{`Service Amount: \$${data.serviceamt}`}</p>
            </div>

            <div className={styles.card}>
                <h2>
                    {"Existing Similar Records"}
                </h2>
                <p style={{margin: 'auto', minWidth: '500px'}}>
                    The following records show similar information, take a look at these to ensure there is no duplication of information before confirming the request.
                </p>
                <br></br>

                <h3>{"John John Johnson (j.j.johnson@gmail.com) (direct)"}</h3>
                <p>{`DOB: ${data.dob}`}</p>
                <p>{`Agency: ${data.agencyname}`}</p>
                <p>{`Jurisdiction: ${data.jurisdiction}`}</p>
                <p>{`One Month Amount: \$${data.onemonthamt}`}</p>
                <p>{`Service Amount: \$${data.serviceamt}`}</p>

                <h3>{"Mark Mark Markson (m.m.markson@gmail.com) (direct)"}</h3>
                <p>{`DOB: ${data.dob}`}</p>
                <p>{`Agency: ${data.agencyname}`}</p>
                <p>{`Jurisdiction: ${data.jurisdiction}`}</p>
                <p>{`One Month Amount: \$${data.onemonthamt}`}</p>
                <p>{`Service Amount: \$${data.serviceamt}`}</p>

                <h3>{"Tim Tim Timson (t.t.timson@gmail.com) (direct)"}</h3>
                <p>{`DOB: ${data.dob}`}</p>
                <p>{`Agency: ${data.agencyname}`}</p>
                <p>{`Jurisdiction: ${data.jurisdiction}`}</p>
                <p>{`One Month Amount: \$${data.onemonthamt}`}</p>
                <p>{`Service Amount: \$${data.serviceamt}`}</p>
            </div>
        </main>
    )
}