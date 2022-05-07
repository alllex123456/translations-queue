import { connectToDatabase } from '../../../lib/db-utils';
import { getSession } from 'next-auth/client';

export default async function handler(req, res) {
  if (req.method !== 'GET') return;

  const session = await getSession({ req });
  const authenticatedUser = session.user.email;

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

    let userStatistics;
    if (user.statistics.timeCompleted !== new Date().getDate()) {
      userStatistics = {
        count: 0,
        timeCompleted: new Date().getDate(),
      };
    } else {
      userStatistics = user.statistics;
    }

    res.status(200).json({ message: userStatistics });
    connect.close();
  } catch (error) {
    res.status(500).json({
      message:
        error.message || 'Database contacted, but could not get the statistics',
    });
    connect.close();
  }
}
