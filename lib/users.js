const users = {
    "andrewspittlemeister@gmail.com": "admin",
    "pallavibhatnagar05@gmail.com": "admin",
    "ciolfi2@gmail.com": "admin",
    "mariummehboob95@gmail.com": "admin",
    "bryanbxian@gmail.com": "admin",
    "c4gefsptest@gmail.com": "agent",
};


export default function getUserRole(email) {
    let parts = email.split("@");
    let normalized_email = parts[0].trim().replaceAll(".", "").toLowerCase() + "@" + parts[1];
    if (users.hasOwnProperty(normalized_email)) {
        return users[normalized_email];
    } else {
        return "invalid";
    }
}
