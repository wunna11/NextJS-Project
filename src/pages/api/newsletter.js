import { client, db } from '@/helpers/db-utils';

async function handler(req, res) {
  if (req.method === 'POST') {
    const userEmail = req.body.email;

    if (!userEmail || !userEmail.includes('@')) {
      res.status(422).json({ message: 'Invaild Email address' });
      return;
    }

    await client.connect();
    db.collection('emails').insertOne({ email: userEmail });

    res.status(201).json({ message: 'Signed Up' });
  }
}

export default handler;
