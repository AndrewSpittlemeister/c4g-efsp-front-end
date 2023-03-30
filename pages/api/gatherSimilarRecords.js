import executeQuery from "@/lib/db";


export default async function handler(req, res) {
    console.log("inGatherSimilarRecords with query params:");
    console.log(req.query);

    let req_lastname = req.query.lastname.toLowerCase().trim();
    let req_dob = req.query.dob.trim();

    let similarRecords = {};
    try {
        let db_result = await executeQuery(
            {
                query: "select * from Application_Applicant_LRO"
            }
        );

        for (const record of db_result) {
            let rec_dob = JSON.stringify(record.DOB).split("T")[0].replaceAll('"', '');
            let rec_lastname = record.LastName.toLowerCase().trim();

            if ((rec_dob == req_dob) || (rec_lastname == req_lastname)) {
                let name = `${record.FirstName} ${record.MiddleName} ${record.LastName}`;
                let app_info = {
                    identity: record.ApplicationId,
                    date: JSON.stringify(record.RequestDate).split("T")[0].replaceAll('"', ''),
                    jurisdiction: record.Jurisdiction,
                    fundingPhase: record.FundingPhase,
                    agency: `${record.LROAgencyName} (LRO #${record.LRONumber})`,
                    paymentVendor: record.PaymentVendor,
                    totalFunding: record.MonthlyRentAmt + record.MonthlyMortgageAmt + record.MonthlyGasAmt + record.MonthlyElectricityAmt + record.MonthlyWaterAmt,
                    totalFundingLRO: record.MonthyRentAmt_LRO + record.MonthlyMortgageAmt_LRO + record.MonthlyGasAmt_LRO + record.MonthlyElectricityAmt_LRO + record.MonthlyWaterAmt_LRO,
                }

                if (similarRecords.hasOwnProperty(name)) {
                    similarRecords[name].history.push(app_info);
                } else {
                    console.log(`Found Similar Applicant: ${name} (DOB: ${rec_dob})`);
                    similarRecords[name] = {
                        dob: rec_dob,
                        history: [app_info]
                    };
                }
            }
        }
        res.status(200).json({ result: similarRecords})

    } catch ( error ) {
        console.log(error);
        res.status(400).json({ result: [] })
    }
}
