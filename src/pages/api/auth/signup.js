import {
  connectDatabase,
  getDocumentByEmail,
  insertDocument,
} from '@/lib/db-util';
import { hashPassword } from '@/lib/auth';

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

  if (
    !email ||
    !email.includes('@') ||
    !password ||
    password.trim().length < 7
  ) {
    res.status(422).json({
      message:
        'Invalid input - password should also be at least 7 characters long.',
    });
    return;
  }

  const existingUser = await getDocumentByEmail(client, 'users', email);

  if (existingUser) {
    res.status(422).json({ message: 'User exists already!' });
    return;
  }

  const hashPwd = await hashPassword(password);
  const newUser = {
    email,
    password: hashPwd,
  };

  try {
    const result = await insertDocument(client, 'users', newUser);
    return res
      .status(201)
      .json({ message: 'Successfully user created', data: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Storing user failed!' });
    return;
  }
}

export default handler;
