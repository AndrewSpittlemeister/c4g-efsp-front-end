import styles from '@/styles/Home.module.css'
import React, { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from 'next/router';

export default function ConfirmationPage({ params }) {
    const router = useRouter();
    const { data: session } = useSession();
    const data = router.query;

    // will be used to populate the similar records HTML data below
    const [similarRecordsResponse, setSimilarRecordsResponse] = useState([]);

    // gather similar records from the database
    useEffect(
        () => {
            async function getSimilarRecords() {
                if (router.isReady) {
                    let records_res = await fetch(
                        `/api/gatherSimilarRecords?dob=${data.dob}&lastname=${data.lastname}`,
                        {
                            method: "GET",
                            headers: {
                                "accept": "application/json",
                            },
                        },
                    );
                    let records = await records_res.json();

                    console.log("Setting Similar Records");
                    console.log(records);
                    setSimilarRecordsResponse(records.result);
                } else {
                    setSimilarRecordsResponse([]);
                }
            }
            getSimilarRecords();
        },
        [router.isReady, data.dob, data.lastname]
    );

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
                {
                    similarRecordsResponse.map(
                        (record) => {
                            console.log("RECORD:");
                            console.log(record);
                            return (
                                <div key={record.name}>
                                    <h3>{`${record.name} (${record.dob})`}</h3>
                                    {
                                        record.history.map(
                                            (application) => {
                                                let totalFunding = application.MonthlyRentAmt + application.MonthlyMortgageAmt + application.MonthlyGasAmt + application.MonthlyElectricityAmt + application.MonthlyWaterAmt;
                                                return (
                                                    <div key={application.ApplicationId} className={styles.card}>
                                                        <p>{`Date: ${application.RequestDate.split('T')[0]}`}</p>
                                                        <p>{`Jurisdiction: ${application.Jurisdiction}`}</p>
                                                        <p>{`Funding Phase: ${application.FundingPhase}`}</p>
                                                        <p>{`Vendor: ${application.PaymentVendor}`}</p>
                                                        <p>{`Total Monthly Funding: $${totalFunding}`}</p>
                                                    </div>
                                                )
                                            }
                                        )
                                    }
                                </div>
                            )
                        }
                    )
                }
            </div>
        </main>
    )
}