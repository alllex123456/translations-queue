import { connectToDatabase } from '../../../lib/db-utils';
import { getSession } from 'next-auth/client';

export default async function handler(req, res) {
  if (req.method !== 'GET') return;

  const session = await getSession({ req });
  const authenticatedUser = session.user.email;

  let client;

  try {
    client = await connectToDatabase();
  } catch (error) {
    res.status(500).json({ message: 'Could not connect to database' });
    client.close();
  }

  const db = client.db();

  try {
    const user = await db
      .collection('users')
      .findOne({ email: authenticatedUser });
    const userClients = user.clients.sort((a, b) => (a.name > b.name ? 1 : -1));
    res.status(201).json({ message: userClients });
    client.close();
  } catch (error) {
    res.status(500).json({ message: 'Could not find a client' });
    client.close();
  }
}
