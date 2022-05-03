import { connectToDatabase } from '../../../lib/db-utils';
import { getSession } from 'next-auth/client';

export default async function handler(req, res) {
  if (req.method !== 'POST') return;

  const session = await getSession({ req });
  const authenticatedUser = session.user.email;

  const updatedUser = {
    language: req.body.language,
    name: req.body.name,
    taxNumber: req.body.taxNumber,
    registrationNumber: req.body.registrationNumber,
    registeredOffice: req.body.registeredOffice,
    email: req.body.email,
    phone: req.body.phone,
  };

  console.log(updatedUser);

  let connect;

  try {
    connect = await connectToDatabase();
  } catch (error) {
    res.status(500).json({ message: 'Could not connect to the database' });
    connect.close();
  }

  try {
    const updateUser = await connect
      .db()
      .collection('users')
      .updateOne(
        { email: authenticatedUser },
        { $set: { userInfo: updatedUser } }
      );
    res.status(200).json({ message: updatedUser.name });
    connect.close();
  } catch (error) {
    res.status(500).json({
      message:
        error.message || 'Database contacted, but could not update the data',
    });
    connect.close();
  }
}
