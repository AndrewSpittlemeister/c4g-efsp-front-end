import executeQuery from "@/lib/db";


export default async function handler(req, res) {
    if (req.query.hasOwnProperty('identity')) {
        try {
            const db_result = await executeQuery(
                {
                    query: "DELETE FROM Application_Applicant_LRO WHERE `Application_Applicant_LRO`.`ApplicationId` = ?",
                    values: [req.query.identity]
                }
            );

            if (db_result.hasOwnProperty("affectedRows")) {
                if (db_result.affectedRows > 0) {
                    res.status(200).json( {result: `Removed application record with ID: '${req.query.identity}'.`} )
                } else {
                    res.status(200).json( {result: `No application records found with ID: '${req.query.identity}'.\n\nDatabase is unchanged.`} )
                }
            } else {
                res.status(400).json( {result: "Error found in remote database response, refresh the page and try again."} )
            }
        } catch ( error ) {
            console.log(error);
            res.status(400).json({ result: error })
        }
    } else {
        res.status(400).json( {result: "Missing application identity." } )
    }
}
