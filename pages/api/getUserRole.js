import executeQuery from "@/lib/db";


function normalizeEmail(email) {
    let parts = email.split("@");
    if (parts.length != 2) {
        throw new Error("Found ill-formed email address.");
    }
    let normalizedEmail = parts[0].trim().replaceAll(".", "").toLowerCase() + "@" + parts[1];
    return normalizedEmail;
}


export default async function handler(req, res) {
    try {
        const db_result = await executeQuery(
            {
                query: 'SELECT role FROM Users WHERE `Users`.`email` = ? LIMIT 1',
                values: [normalizeEmail(req.query.email)]
            }
        );
        res.status(200).json({ result: db_result[0]["role"]})
    } catch ( error ) {
        console.log(error);
        res.status(400).json({ result: "invalid" })
    }
}