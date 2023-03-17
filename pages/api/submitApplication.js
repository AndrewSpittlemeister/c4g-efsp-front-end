
import executeQuery from '../../lib/db';

async function postData(request) {
  // use as request.name to build query
  try {
    const result = await executeQuery({
        query: 'Select test_col from test_table'
    });
    return result;
} catch ( error ) {
    console.log(error); 
    return "db error";
}
}


export default async function handler(req, res) {
  const db_result = await postData(req);
  res.status(200).json({ result: db_result})
}
