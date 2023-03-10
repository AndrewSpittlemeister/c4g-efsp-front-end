// const mysql = require('mysql');
// let connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'your_db_user',
//     password: 'your_db_password',
//     database: 'nextjsDemo'
// });


// connection.connect(function (err) {
//     if (err) {
//         return console.error('error: ' + err.message);
//     }
//     console.log('MySQL Connection Successful.');
// });

async function getInfo(req, res) {
    res.status(200).json({
        info: [
            {
                'firstName': 'Marium',
                'lastName': 'Ali',
                'DOB': '09/09/1870'
            },
            {
                'firstName': 'Marium2',
                'lastName': 'Ali2',
                'DOB': '09/09/1872'
            }
        ]
    })
}


export default getInfo;