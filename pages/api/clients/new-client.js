import { connectToDatabase } from '../../../lib/db-utils';
import { getSession } from 'next-auth/client';

export default async function handler(req, res) {
  if (req.method !== 'POST') return;
  const session = await getSession({ req });
  const authenticatedUser = session.user.email;

  const {
    name,
    taxNumber,
    currency,
    registrationNumber,
    registeredOffice,
    phone,
    email,
    bankNumber,
    bank,
    rate,
    notes,
  } = req.body;

  const clientId = name.replaceAll(' ', '-');
  const newClient = {
    id: new Date().toISOString(),
    name,
    taxNumber,
    currency,
    registrationNumber,
    registeredOffice,
    phone,
    email,
    bankNumber,
    bank,
    rate,
    notes,
  };

  let client;
  try {
    client = await connectToDatabase();
  } catch (error) {
    res.status(500).json({ message: 'Could not connect to database' });
    client.close();
  }

  try {
    const collection = client.db().collection('users');
    const user = await collection.findOne({ email: authenticatedUser });
    const userClients = user.clients;
    userClients.push(newClient);
    await collection.updateOne(
      { email: authenticatedUser },
      { $set: { clients: userClients } }
    );
    res.status(201).json({ message: newClient.name });
    client.close();
  } catch (error) {
    res.status(500).json({
      message:
        error.message ||
        'Database contacted, but could not connect register the data',
    });
    client.close();
  }
}
