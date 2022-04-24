import { connectToDatabase } from '../../../lib/db-utils';
import { getSession } from 'next-auth/client';

export default async function handler(req, res) {
  if (req.method !== 'POST') return;

  const session = await getSession({ req });
  const authenticatedUser = session.user.email;
  const { id, client, count, rate, received, deadline, notes, timeCompleted } =
    req.body;

  let connect;

  try {
    connect = await connectToDatabase();
  } catch (error) {
    res.status(500).json({
      message: error.message || 'Could not connect to the database',
    });
    connect.close();
  }

  try {
    const user = await connect
      .db()
      .collection('users')
      .findOne({ email: authenticatedUser });

    const updateMongo = await connect
      .db()
      .collection('users')
      .updateOne(
        { email: authenticatedUser },
        {
          $set: {
            invoicing: [
              ...user.invoicing,
              {
                id,
                client,
                count,
                rate,
                received,
                deadline,
                notes,
                timeCompleted,
              },
            ],
          },
        }
      );

    res.status(200).json({
      message: 'Invoicing list successfully updated',
    });
    connect.close();
  } catch (error) {
    res.status(401).json({
      message:
        error.message ||
        'The order could not be added to Client Statement! Please retry or contact the developer.',
    });
    connect.close();
  }
}
