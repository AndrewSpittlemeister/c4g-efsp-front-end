import executeQuery from "@/lib/db";


export default async function handler(req, res) {
    console.log("inGatherSimilarRecords with query params:");
    console.log(req.query);

    let similarRecords = [];
    try {
        let applicant_db_result = await executeQuery(
            {
                query: 'select * from Applicant'
            }
        );

        console.log(applicant_db_result);
        for (const applicant of applicant_db_result) {
            let applicant_dob = JSON.stringify(applicant.DOB).split("T")[0].replaceAll('"', '');
            let applicant_lastname = applicant.LastName;

            if ((applicant_dob == req.query.dob) || (applicant_lastname == req.query.lastname)) {
                let application_db_result = await executeQuery(
                    {
                        query: "select * from Application WHERE ApplicantId = ?",
                        values: [applicant.ApplicantId]
                    }
                );
                if (applicant_db_result.length > 0) {
                    similarRecords.push(
                        {
                            name: `${applicant.FirstName} ${applicant.MiddleName} ${applicant.LastName}`,
                            dob: applicant_dob,
                            history: application_db_result
                        }
                    );
                }
            }
        }
        res.status(200).json({ result: similarRecords})

    } catch ( error ) {
        console.log(error);
        res.status(400).json({ result: [] })
    }
}
