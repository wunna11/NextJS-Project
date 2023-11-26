import { connectDatabase, insertDocument } from '@/helpers/db-utils';

async function handler(req, res) {
  let client;
  try {
    client = await connectDatabase();
  } catch (error) {
    res.status(500).json({ message: 'Connecting to the database failed!' });
    return;
  }

  if (req.method === 'POST') {
    const userEmail = req.body.email;

    if (!userEmail || !userEmail.includes('@')) {
      res.status(422).json({ message: 'Invaild Email address' });
      return;
    }

    let result;
    try {
      result = await insertDocument(client, 'emails', { email: userEmail });
      res.status(201).json({ message: 'Signed Up', data: result });
    } catch (error) {
      res.status(500).json({ message: 'Inserting email failed!' });
    }
  }
}

export default handler;
