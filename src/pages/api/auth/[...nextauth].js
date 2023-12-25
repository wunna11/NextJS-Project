import { connectDatabase, getDocumentByEmail } from '../../../lib/db-util';
import { verifyPassword } from '../../../lib/auth';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions = {
  session: {
    jwt: true,
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        // connect database
        let client;
        try {
          client = await connectDatabase();
        } catch (error) {
          res
            .status(500)
            .json({ message: 'Connecting to the database failed!' });
          return;
        }

        const user = await getDocumentByEmail(
          client,
          'users',
          credentials.email
        );

        if (!user) {
          throw new Error('No user found!');
        }

        const isValid = await verifyPassword(
          credentials.password,
          user.password
        );

        if (!isValid) {
          throw new Error('Could not log you in!');
        }

        return user;
      },
    }),
  ],
  callbacks: {
    secret: process.env.NEXTAUTH_SECRET,
  }
};

export default NextAuth(authOptions);
