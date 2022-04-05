import { connectToDatabase } from '../../../lib/db-utils';

import { getSession } from 'next-auth/client';

const handler = async (req, res) => {
  if (req.method !== 'DELETE') return;
  const session = await getSession({ req });
  const authenticatedUser = session.user.email;
  const { clientId } = req.body;

  let client;
  try {
    client = await connectToDatabase();
  } catch (error) {
    res.status(500).json({ message: 'Could not connect to the database' });
    client.close();
  }

  try {
    const user = await client
      .db()
      .collection('users')
      .findOne({ email: authenticatedUser });
    const updatedClients = user.clients.filter(
      (client) => client.id !== clientId
    );
    await client
      .db()
      .collection('users')
      .updateOne(
        { email: authenticatedUser },
        { $set: { clients: updatedClients } }
      );
    res.status(200).json({ message: 'Client successfully removed' });
    client.close();
  } catch (error) {
    res.status(500).json({ message: 'Could not update the database' });
    client.close();
  }
};

export default handler;
