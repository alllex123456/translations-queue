import { connectToDatabase } from '../../../lib/db-utils';
import { getSession } from 'next-auth/client';

export default async function handler(req, res) {
  if (req.method !== 'POST') return;

  const session = await getSession({ req });
  const authenticatedUser = session.user.email;

  const receivedCount = req.body.count;

  let connect;

  try {
    connect = await connectToDatabase();
  } catch (error) {
    res.status(500).json({ message: 'Could not connect to database' });
    connect.close();
  }

  try {
    const user = await connect
      .db()
      .collection('users')
      .findOne({ email: authenticatedUser });

    const currentCount = user.statistics.count;
    let updatedCount;
    if (currentCount) {
      updatedCount = { count: currentCount + receivedCount };
    } else {
      updatedCount = { count: receivedCount };
    }

    await connect
      .db()
      .collection('users')
      .updateOne(
        { email: authenticatedUser },
        { $set: { statistics: updatedCount } }
      );
    res.status(200).json({ message: user.statistics });
    connect.close();
  } catch (error) {
    res.status(500).json({
      message:
        error.message ||
        'Database contacted, but could not update the statistics',
    });
    connect.close();
  }
}
