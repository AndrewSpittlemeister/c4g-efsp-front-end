import executeQuery from "@/lib/db";


export default async function handler(req, res) {
    try {
        const db_result = await executeQuery(
            {
                query: 'select * from Users'
            }
        );
        res.status(200).json({ result: db_result})
    } catch ( error ) {
        console.log(error);
        res.status(400).json({ result: "Failed to fetch users." })
    }
}