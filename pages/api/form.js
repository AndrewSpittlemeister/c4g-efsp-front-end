import absoluteUrl from 'next-absolute-url'

export default async function handler(req, res) {
  console.log('request:', req.body);
  const { origin } = absoluteUrl(req)
  const apiURL = `${origin}/api/getinfo`

  const data = await fetch(apiURL, {
    method: "GET",
    headers: { 'Content-Type': 'application/json' }
  });

  const dataResult = await data.json();
  console.log('dataResult', dataResult);

  // check rules of duplication here

  // res.status(200).json({ 'result': 'Approved', 'reason': [] });
  res.status(200).json({ 'result': 'Declined', 'reason': ['Same DOB, FirstName and LastName matchc'] });
}