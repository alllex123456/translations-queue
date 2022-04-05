import { connectToDatabase } from '../../../lib/db-utils';
import { getSession } from 'next-auth/client';

export default async function handler(req, res) {
  if (req.method !== 'POST') return;

  const session = await getSession({ req });
  const authenticatedUser = session.user.email;

  const {
    id,
    name,
    taxNumber,
    registrationNumber,
    registeredOffice,
    email,
    phone,
    bankNumber,
    bank,
    rate,
    notes,
  } = req.body;

  let client;

  try {
    client = await connectToDatabase();
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Could not establish a connection to the database' });
    client.close();
  }

  try {
    const user = await client
      .db()
      .collection('users')
      .findOne({ email: authenticatedUser });
    const userClients = user.clients;
    const clientIndex = userClients.findIndex((client) => client.id === id);

    userClients[clientIndex] = {
      id,
      name,
      taxNumber,
      registrationNumber,
      registeredOffice,
      phone,
      email,
      bankNumber,
      bank,
      rate,
      notes,
    };

    await client
      .db()
      .collection('users')
      .updateOne(
        { email: authenticatedUser },
        { $set: { clients: userClients } }
      );
    client.close();
    res.status(201).json({ message: 'Client has been successfully updated!' });
    client.close();
  } catch (error) {
    res.status(500).json({ message: error.message });
    client.close();
  }
}
