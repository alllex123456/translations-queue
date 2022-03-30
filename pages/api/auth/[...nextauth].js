import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

import { connectToDatabase } from '../../../lib/db-utils';
import { comparePasswords } from '../../../lib/db-utils';

export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [
    Providers.Credentials({
      async authorize(credentials) {
        const client = await connectToDatabase();
        const collection = client.db().collection('users');
        const user = await collection.findOne({ email: credentials.email });

        if (!user) {
          throw new Error('No user found with this email address');
        }

        const isValid = await comparePasswords(
          credentials.password,
          user.password
        );

        if (!isValid) {
          throw new Error('Incorrect password');
        }

        return {
          email: user.email,
        };
      },
    }),
  ],
});
