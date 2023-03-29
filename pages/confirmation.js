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
    const [addRecordResponse, setAddRecordResponse] = useState([]);

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
        [router.isReady, data.dob, data.lastname]
    );

    // TODO: add callback for approve and deny buttons to either send data to database or kick back to form page.

    // TODO: add an alert when a request is approved
    async function addApplication() {
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
            setAddRecordResponse(records);

            console.log("Adding Application");
            console.log(records);

        } else {
            setAddRecordResponse([false]);
        }
    }

    return (
        <main className={styles.main}>
            <h1>
                Form Confirmation
            </h1>

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
                                                let totalFundingLRO = application.MonthyRentAmt_LRO + application.MonthlyMortgageAmt_LRO + application.MonthlyGasAmt_LRO + application.MonthlyElectricityAmt_LRO + application.MonthlyWaterAmt_LRO;
                                                return (
                                                    <div key={application.ApplicationId} className={styles.card}>
                                                        <p>{`Date: ${application.RequestDate.split('T')[0]}`}</p>
                                                        <p>{`Jurisdiction: ${application.Jurisdiction}`}</p>
                                                        <p>{`Funding Phase: ${application.FundingPhase}`}</p>
                                                        <p>{`Payment Vendor: ${application.PaymentVendor}`}</p>
                                                        <p>{`Total Monthly Funding: $${totalFunding}`}</p>
                                                        <p>{`Total Monthly Funding (LRO): $${totalFundingLRO}`}</p>
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
            <button className={styles.button} style={{margin: 'auto'}} onClick={() => addApplication()}>
                Accept
            </button>
            <br></br>
            <button className={styles.button} style={{margin: 'auto'}} onClick={() => router.push('/')}>
                Reject
            </button>
        </main>
    )
}