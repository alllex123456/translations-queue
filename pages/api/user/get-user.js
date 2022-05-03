import { connectToDatabase } from '../../../lib/db-utils';
import { getSession } from 'next-auth/client';

export default async function (req, res) {
  if (req.method !== 'GET') return;

  const session = await getSession({ req });
  const authenticatedUser = session.user.email;

  let connect;

  try {
    connect = await connectToDatabase();
  } catch (error) {
    res.status(500).json({ message: 'Could not connect to the database' });
    connect.close();
  }

  try {
    const user = await connect
      .db()
      .collection('users')
      .findOne({ email: authenticatedUser });
    const { userInfo } = user;
    res.status(200).json({ message: userInfo });
    connect.close();
  } catch (error) {
    res.status(500).json({
      message: error.message || 'database contacted, but no data retrieven',
    });
    connect.close();
  }
}
