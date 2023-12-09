const { connectDatabase, getDocumentById } = require('@/lib/db-util');

async function handler(req, res) {
  const id = req.query.postId;

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
      documents = await getDocumentById(client, 'posts', id);
      res.status(200).json({ post: documents });
    } catch (error) {
      res.status(500).json({ message: 'Getting posts failed.' });
    }
  }
}

export default handler;
