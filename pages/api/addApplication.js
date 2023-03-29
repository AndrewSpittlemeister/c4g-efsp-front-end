import executeQuery from "@/lib/db";


export default async function handler(req, res) {
    console.log("inAddApplication with query params:");
    console.log(req.query);

    let addedRecord = [];

    try {
        let application_db_result = await executeQuery(
            {

                query: 'INSERT INTO Application_Applicant_LRO (DOB, FirstName, LastName, MiddleName, StreetAddress, City, PostalCode, '
                         + 'Country, LRONumber, LROAgencyName, LROEmail, FundingPhase, Jurisdiction, PaymentVendor, MonthlyRentAmt, '
                         + 'MonthyRentAmt_LRO, MonthlyMortgageAmt, MonthlyMortgageAmt_LRO, LodgingCostPerNight, LodgingNightCount, '
                         + 'LodgingCostPerNight_LRO, MonthlyGasAmt, MonthlyGasAmt_LRO, MonthlyElectricityAmt, MonthlyElectricityAmt_LRO, '
                         + 'MonthlyWaterAmt, MonthlyWaterAmt_LRO) '
                         + 'VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                values: [req.query.applicantDOB,
                        req.query.applicantFirstName,
                        req.query.applicantLastName,
                        req.query.applicantMiddleName,
                        req.query.applicantStreetAddress,
                        req.query.applicantCity,
                        req.query.applicantPostalCode,
                        req.query.applicantCountry,
                        req.query.lroNumber,
                        req.query.agencyName,
                        req.query.lroEmail,
                        req.query.fundingPhase,
                        req.query.jurisdiction,
                        req.query.paymentVendor,
                        req.query.monthlyRent,
                        req.query.monthlyRentLRO,
                        req.query.monthlyMortgage,
                        req.query.monthlyMortgageLRO,
                        req.query.lodgingNightCost,
                        req.query.lodgingNightCount,
                        req.query.lodgingNightCostLRO,
                        req.query.monthlyGas,
                        req.query.monthlyGasLRO,
                        req.query.monthlyElectric,
                        req.query.monthlyElectricLRO,
                        req.query.monthlyWater,
                        req.query.monthlyWaterLRO
                ]
            }
        );

        if (application_db_result != null) {
            console.log(application_db_result.insertId);
            addedRecord.push(
                {
                    success: application_db_result.insertId != undefined

                }
            );
        }
        res.status(200).json({ result: addedRecord})

    } catch ( error ) {
        console.log(error);
        res.status(400).json({ result: [] })
    }
}
