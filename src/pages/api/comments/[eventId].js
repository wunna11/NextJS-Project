import { client, db } from '@/helpers/db-utils';

async function handler(req, res) {
  const eventId = req.query.eventId;
  if (req.method === 'POST') {
    const { name, email, text } = req.body;
    console.log('email', email);
    if (
      !email.includes('@') ||
      !name ||
      name.trim() === '' ||
      !text ||
      text.trim() === ''
    ) {
      res.status(422).json({ message: 'Invalid input.' });
      return;
    }

    const addComments = {
      eventId,
      name,
      email,
      text,
    };

    await client.connect();
    db.collection('comments').insertOne(addComments);

    res
      .status(201)
      .json({ message: 'Add Comment Successfully', comments: addComments });
  }

  if (req.method === 'GET') {
    const dummyList = [
      { id: 'e5', name: 'wunna', text: 'hello sir' },
      { id: 'e6', name: 'maz', text: 'hello' },
    ];

    res.status(200).json({ comments: dummyList });
  }
}

export default handler;
