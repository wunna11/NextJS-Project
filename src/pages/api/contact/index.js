import { connectDatabase, insertDocument } from '@/lib/db-util';

async function handler(req, res) {
  let client;
  try {
    client = await connectDatabase();
  } catch (error) {
    res.status(500).json({ message: 'Connecting to the database failed!' });
    return;
  }

  if (req.method === 'POST') {
    const { email, name, message } = req.body;
    if (
      !email ||
      !email.includes('@') ||
      !name ||
      name.trim() === '' ||
      !message ||
      message.trim() === ''
    ) {
      res.status(422).json({ message: 'Invalid Format' });
      return;
    }

    const newMessage = {
      name,
      email,
      message,
    };

    try {
      const result = await insertDocument(client, 'contacts', newMessage);
      res
        .status(201)
        .json({ message: 'Successfully created', data: newMessage });
    } catch (error) {
      res.status(500).json({ message: 'Storing message failed!' });
      return;
    }
  }
}

export default handler;
