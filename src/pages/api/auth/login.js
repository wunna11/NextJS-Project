import { verifyPassword } from '@/lib/auth';
import { connectDatabase, getDocumentByEmail } from '@/lib/db-util';

async function handler(req, res) {
  let client;
  try {
    client = await connectDatabase();
  } catch (error) {
    res.status(500).json({ message: 'Connecting to the database failed!' });
    return;
  }

  if (req.method !== 'POST') {
    return;
  }

  const { email, password } = req.body;

  const existingUser = await getDocumentByEmail(client, 'users', email);

  if (!existingUser) {
    res.status(422).json({ message: 'User does not exist' });
    return;
  }

  const user = await getDocumentByEmail(client, 'users', email);

  const passwordCorrect = await verifyPassword(password, user.password);

  if (!passwordCorrect) {
    res.status(422).json({ message: 'Wrong Password' });
    return;
  }

  return res.status(200).json({ user, message: 'Login Successfully' });
}

export default handler;
