import { connectDatabase, getDocumentByEmail } from '../../../lib/db-util'
import { hashPassword, verifyPassword } from '../../../lib/auth';
import { getServerSession } from "next-auth/next";
import { authOptions } from '../auth/[...nextauth]';

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

  const session = await getServerSession(req, res, authOptions);
  console.log('password session', session)
  
  if (!session) {
    res.status(401).json({ message: 'Not authenticated!' });
    return;
  }

  console.log("user session", session)

  const { oldPassword, newPassword } = req.body;
  const userEmail = session.user.email;
  console.log("userEmail", userEmail)
  
  const usersCollection = client.db().collection('users');
  const user = await getDocumentByEmail(client, 'users', userEmail);
  console.log('user', user)
  if (!user) {
    res.status(404).json({ message: 'User not found.' });
    return;
  }

  const currentPassword = user.password;
  const passwordsAreEqual = await verifyPassword(oldPassword, currentPassword);
  if (!passwordsAreEqual) {
    res.status(403).json({ message: 'Invalid password.' });
    return;
  }

  const hashedPassword = await hashPassword(newPassword);
  const result = await usersCollection.updateOne(
    { email: userEmail },
    { $set: { password: hashedPassword } }
  );
  if (result.matchedCount === 1 && result.modifiedCount === 1) {
    // If a single document was found and updated successfully
    res.status(200).json({ message: 'Password updated!' });
  } else {
    // If the document was not found or not updated
    res.status(500).json({ message: 'Password update failed!' });
  }
}

export default handler;