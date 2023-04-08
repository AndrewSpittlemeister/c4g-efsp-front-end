import styles from '@/styles/Home.module.css'
import React, { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from 'next/router';
import getUserRole from "@/lib/users";

export default function ConfirmationPage({ params }) {
    const router = useRouter();
    const { data: session, status } = useSession();
    const data = router.query;

    // will be used to populate the similar records HTML data below
    const [similarRecordsResponse, setSimilarRecordsResponse] = useState([]);
    const [confirmRejectPressed, setConfirmRejectPressed] = useState(false);
    const [confirmRejectState, setConfirmRejectState] = useState(null);
    const [addRecordSuccess, setAddRecordSuccess] = useState(false);

    // gather similar records from the database
    useEffect(
        () => {
            async function getSimilarRecords() {
                if (router.isReady) {
                    let records_res = await fetch(
                        `/api/gatherSimilarRecords?dob=${data.applicantDOB}&lastname=${data.applicantLastName}`,
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
        [router.isReady, data.applicantDOB, data.applicantLastName]
    );

    // TODO: add an alert when a request is approved
    async function addApplication() {
        var addRecordSuccessValue = false;
        if (router.isReady) {
            let add_res = await fetch(
                `/api/addApplication?applicantDOB=${data.applicantDOB}`
                + `&applicantFirstName=${data.applicantFirstName}`
                + `&applicantLastName=${data.applicantLastName}`
                + `&applicantMiddleName=${data.applicantMiddleName}`
                + `&applicantStreetAddress=${data.applicantStreetAddress}`
                + `&applicantCity=${data.applicantCity}`
                + `&applicantPostalCode=${data.applicantPostalCode}`
                + `&applicantCountry=${data.applicantCountry}`
                + `&lroNumber=${data.lroNumber}`
                + `&agencyName=${data.agencyName}`
                + `&lroEmail=${data.lroEmail}`
                + `&fundingPhase=${data.fundingPhase}`
                + `&jurisdiction=${data.jurisdiction}`
                + `&paymentVendor=${data.paymentVendor}`
                + `&monthlyRent=${data.monthlyRent}`
                + `&monthlyRentLRO=${data.monthlyRentLRO}`
                + `&monthlyMortgage=${data.monthlyMortgage}`
                + `&monthlyMortgageLRO=${data.monthlyMortgageLRO}`
                + `&lodgingNightCost=${data.lodgingNightCost}`
                + `&lodgingNightCount=${data.lodgingNightCount}`
                + `&lodgingNightCostLRO=${data.lodgingNightCostLRO}`
                + `&monthlyGas=${data.monthlyGas}`
                + `&monthlyGasLRO=${data.monthlyGasLRO}`
                + `&monthlyElectric=${data.monthlyElectric}`
                + `&monthlyElectricLRO=${data.monthlyElectricLRO}`
                + `&monthlyWater=${data.monthlyWater}`
                + `&monthlyWaterLRO=${data.monthlyWaterLRO}`
                ,
                {
                    method: "POST",
                    headers: {
                        "accept": "application/json",
                    },
                },
            );
            let records = await add_res.json();
            addRecordSuccessValue = records.result[0].success;
        }
        setConfirmRejectPressed(true);
        setConfirmRejectState("Confirmed");
        setAddRecordSuccess(addRecordSuccessValue);

        console.log(`Submitted, Success: ${addRecordSuccessValue}`);
    }

    async function processReject() {
        setConfirmRejectPressed(true);
        setConfirmRejectState("Rejected");
    }

    if (status != "authenticated") {
        return (
            <main className={styles.main}>
                <h1>Page Requires Authentication</h1>
                <br></br>
                <div className={styles.card}>
                    <p>Navigate to the home page and sign-in first.</p>
                    <br></br>
                    <button className={styles.button} style={{ marginLeft: 'auto', marginRight: 'auto', marginTop: "10px", marginBottom: "5px" }} onClick={() => router.push('/')}>
                        Return Home
                    </button>
                </div>
            </main>
        )
    }
    if (!["agent", "admin"].includes(getUserRole(session.user.email))) {
        return (
            <main className={styles.main}>
                <h1>Insufficient Privileges</h1>
                <br></br>
                <div className={styles.card}>
                    <p>This page requires agent-level or admin-level privileges to access, sign in with a different account with these privileges to use this page.</p>
                    <br></br>
                    <button className={styles.button} style={{ marginLeft: 'auto', marginRight: 'auto', marginTop: "10px", marginBottom: "5px" }} onClick={() => router.push('/')}>
                        Return Home
                    </button>
                </div>
            </main>
        )
    }

    return (
        confirmRejectPressed ? (
            <main className={styles.main}>
                <h1>Form Confirmation</h1>
                <p style={{marginLeft: 'auto', marginRight: 'auto', marginTop: "10px", marginBottom: "5px"}}>
                    {`Application Status: ${confirmRejectState}`}
                </p>
                <br></br>
                <button className={styles.button} style={{marginLeft: 'auto', marginRight: 'auto', marginTop: "10px", marginBottom: "5px"}} onClick={() => router.push('/')}>
                    Return Home
                </button>
            </main>
        ) : (
            <main className={styles.main}>
                <h1>Form Confirmation</h1>
                <p style={{marginLeft: 'auto', marginRight: 'auto', marginTop: "10px", marginBottom: "5px"}}>
                    Review the following application information before submitting.
                </p>

                <div className={styles.card}>
                    <h2>
                        {`Pending Request for "${data.applicantFirstName} ${data.applicantMiddleName} ${data.applicantLastName}" (${data.directIndirect})`}
                    </h2>
                    <br></br>
                    <p>{`DOB: ${data.applicantDOB}`}</p>
                    <p>{`Address: ${data.applicantStreetAddress}, ${data.applicantCity} (${data.applicantPostalCode})`}</p>
                    <p>{`Agency: ${data.agencyName} (LRO #${data.lroNumber})`}</p>
                    <p>{`Jurisdiction: ${data.jurisdiction}`}</p>
                    <p>{`Funding Phase: ${data.fundingPhase}`}</p>
                    <p>{`Payment Vendor: ${data.paymentVendor}`}</p>
                    <p>{`Monthly Rent: $${data.monthlyRent}`}</p>
                    <p>{`Monthly Rent LRO: $${data.monthlyRentLRO}`}</p>
                    <p>{`Monthly Mortgage: $${data.monthlyMortgage}`}</p>
                    <p>{`Monthly Mortgage LRO: $${data.monthlyMortgageLRO}`}</p>
                    <p>{`Lodging Night Count: $${data.lodgingNightCount}`}</p>
                    <p>{`Lodging Night Cost: $${data.lodgingNightCost}`}</p>
                    <p>{`Lodging Night Cost LRO: $${data.lodgingNightCostLRO}`}</p>
                    <p>{`Monthly Gas: $${data.monthlyGas}`}</p>
                    <p>{`Monthly Gas LRO: $${data.monthlyGasLRO}`}</p>
                    <p>{`Monthly Electric: $${data.monthlyElectric}`}</p>
                    <p>{`Monthly Electric LRO: $${data.monthlyElectricLRO}`}</p>
                    <p>{`Monthly Water: $${data.monthlyWater}`}</p>
                    <p>{`Monthly Water LRO: $${data.monthlyWaterLRO}`}</p>
                </div>

                <div className={styles.card}>
                    <h2>
                        {"Existing Similar Records"}
                    </h2>
                    <p style={{margin: 'auto'}}>
                        The following records show similar information, take a look at these to ensure there is no duplication of information before confirming the request.
                    </p>
                    <br></br>
                    {
                        Object.keys(similarRecordsResponse).map(
                            (name) => {
                                let dob = similarRecordsResponse[name].dob;
                                let history = similarRecordsResponse[name].history;
                                console.log(`Found Similar Applicant: ${name} (DOB: ${dob})`);
                                return (
                                    <div key={name}>
                                        <h3>{`${name} (${dob})`}</h3>
                                        {
                                            history.map(
                                                (application) => {
                                                    return (
                                                        <div key={application.identity} className={styles.card}>
                                                            <p>{`Date: ${application.date}`}</p>
                                                            <p>{`Jurisdiction: ${application.jurisdiction}`}</p>
                                                            <p>{`Funding Phase: ${application.fundingPhase}`}</p>
                                                            <p>{`Agency: ${application.agency}`}</p>
                                                            <p>{`Payment Vendor: ${application.paymentVendor}`}</p>
                                                            <p>{`Total Monthly Funding: $${application.totalFunding}`}</p>
                                                            <p>{`Total Monthly Funding (LRO): $${application.totalFundingLRO}`}</p>
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
                <br></br>
                <button className={styles.button} style={{marginLeft: 'auto', marginRight: 'auto', marginTop: "10px", marginBottom: "5px"}} onClick={() => addApplication()}>
                    Accept
                </button>
                <button className={styles.button} style={{marginLeft: 'auto', marginRight: 'auto', marginTop: "5px", marginBottom: "5px"}} onClick={() => processReject()}>
                    Reject
                </button>
            </main>
        )
    )
}