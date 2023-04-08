import executeQuery from "@/lib/db";


export default async function handler(req, res) {
    var query_string = "select * from Application";
    var query_values = [];

    if (req.query.hasOwnProperty('identity')) {
        query_string = query_string.concat(" WHERE ApplicantId = ?");
        query_values.push(req.query.identity);
    }
    try {
        const db_result = await executeQuery(
            {
                query: query_string,
                values: query_values
            }
        );
        res.status(200).json({ result: db_result})
    } catch ( error ) {
        console.log(error);
        res.status(400).json({ result: null })
    }
}
