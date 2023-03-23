import styles from '@/styles/Home.module.css'
import React, { useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from 'next/router';

export default function ConfirmationPage({ params }) {
    const router = useRouter();
    const { data: session } = useSession();

    const data = router.query;
    console.log("confirmation parameters");
    console.log(data);

    // will be used to populate the similar records HTML data below
    var similar_records = [];

    console.log("unpopulated similar records:");
    console.log(similar_records);

    // FIXME: This stuff seems to run multiple times on page load, probably see here: https://stackoverflow.com/questions/71828419/rendering-html-response-from-api-in-react

    // TODO: gather similar records from the database
    fetch(
        "/api/gatherApplicants",
        {
            method: "GET",
            headers: {
                "accept": "application/json",
            },
        },
    ).then(
        (applicant_res) => applicant_res.json()
    ).then(
        (applicant_json) => {
            console.log("similar applicants:");
            for (const applicant of applicant_json.result) {
                console.log(`Applicant:`);
                console.log(applicant);

                const app_dob = applicant.DOB.split("T")[0];
                var similar = false;

                // will list if the date of birth or last name is the same
                if (app_dob === data.dob)  {
                    similar = true;
                } else if (data.lastname == applicant.LastName) {
                    similar = true;
                }

                if (similar) {
                    // gather the application data for this person
                    var record = {
                        name: `${applicant.FirstName} ${applicant.MiddleName} ${applicant.LastName}`,
                        dob: app_dob,
                        history: []
                    };
                    
                    // use gatherApplications route with the applicant ID to do so
                    fetch(
                        `/api/gatherApplications?identity=${applicant.ApplicantId}`,
                        {
                            method: "GET",
                            headers: {
                                "accept": "application/json",
                            },
                        },
                    ).then(
                        (application_res) => application_res.json()
                    ).then(
                        (application_json) => {
                            console.log(`Application History for ${applicant.FirstName} ${applicant.MiddleName} ${applicant.LastName}`);
                            for (const application in application_json.result) {
                                console.log(`${applicant}`);
                                record.history.push(
                                    {
                                        "date": application.ApprovalDate,
                                        "funding_phase": application.FundingPhase,
                                        "jurisdiction": application.Jurisdiction,
                                        "vendor": application.FundingVendor,
                                    }
                                );
                            }
                        }
                    );

                    // append to similar_records
                    similar_records.push(record);
                }
            }
        }
    );

    console.log("populated similar records:");
    console.log(similar_records);

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