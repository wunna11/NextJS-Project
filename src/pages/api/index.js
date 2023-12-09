import { connectDatabase, getAllDocuments } from '@/lib/db-util';

async function handler(req, res) {
  let client;
  try {
    client = await connectDatabase();
  } catch (error) {
    res.status(500).json({ message: 'Connecting to the database failed!' });
    return;
  }

  let documents;
  if (req.method === 'GET') {
    try {
      documents = await getAllDocuments(client, 'posts');
      res.status(200).json({ posts: documents });
    } catch (error) {
      res.status(500).json({ message: 'Getting posts failed.' });
    }
  }
}

export default handler;
