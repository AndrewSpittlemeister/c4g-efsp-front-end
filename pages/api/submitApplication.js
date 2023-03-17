
import mysql from 'serverless-mysql';

async function postData(request) {
  // allocate DB connection
  const db = mysql({
    config: {
      host: process.env.MYSQL_HOST,
      database: process.env.MYSQL_DATABASE,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD
    }
  });

  // FIXME: text query below for now
  try {
    const result = await db.query("select test_col from test_table");
    await db.end();
    return result;
  } catch ( error ) {
    console.log(`found error when querying DB: ${error}`);
    return null;
  }
}


export default async function handler(req, res) {
  const db_result = await postData(req);
  res.status(200).json({ result: db_result})
}
