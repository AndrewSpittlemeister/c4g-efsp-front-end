import executeQuery from "@/lib/db";


function normalizeEmail(email) {
    let parts = email.split("@");
    if (parts.length != 2) {
        throw new Error("Found ill-formed email address.");
    }
    let normalizedEmail = parts[0].trim().replaceAll(".", "").toLowerCase() + "@" + parts[1];
    return normalizedEmail;
}


function normalizeRole(role) {
    let normalizedRole = role.trim().toLowerCase();

    if ((normalizedRole === "admin") || (normalizedRole === "agent")) {
        return normalizedRole;
    } else {
        throw new Error("Role must be one of 'agent' or 'admin'.");
    }
}


export default async function handler(req, res) {
    console.log("inAddUser with query params:", req.query);

    var normalizedEmail = "";
    var normalizedRole = "";

    try {
        normalizedEmail = normalizeEmail(req.query.email);
        normalizedRole = normalizeRole(req.query.role);
    } catch ( error ) {
        console.log(error);
        return res.status(400).json({ result: error.message });
    }

    try {
        const db_result = await executeQuery(
            {
                query: 'select * from Users'
            }
        );
        var existingEmails = [];
        for (const entry of db_result) {
            existingEmails.push(entry["email"]);
        }
        if (existingEmails.includes(normalizedEmail)) {
            return res.status(400).json({ result: "User with provided email already exists."});
        }
    } catch ( error ) {
        console.log(error);
        return res.status(400).json({ result: "Failed to fetch users." });
    }

    try {
        let db_result = await executeQuery(
            {

                query: 'INSERT INTO Users (email, role) VALUES (?, ?)',
                values: [normalizedEmail, normalizedRole]
            }
        );

        if (db_result.hasOwnProperty("error"))  {
            res.status(400).json({ result: `Internal server error, failed to add user to remote database.`})
        } else {
            res.status(200).json({ result: `Added '${normalizedRole}' user with email: '${normalizedEmail}'.`})
        }
    } catch ( error ) {
        console.log(error);
        res.status(400).json({ result: error.message })
    }
}