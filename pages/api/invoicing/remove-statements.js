import { connectToDatabase } from '../../../lib/db-utils';
import { getSession } from 'next-auth/client';

export default async function handler(req, res) {
  if (req.method !== 'DELETE') return;
  const session = await getSession({ req });
  const authenticatedUser = session.user.email;

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

    const updatedStatements = user.invoicing.filter(
      (statement, index) => statement.id !== req.body.ids[index]
    );

    await connect
      .db()
      .collection('users')
      .updateOne(
        { email: authenticatedUser },
        {
          $set: {
            invoicing: updatedStatements,
          },
        }
      );

    res.status(201).json({ message: updatedStatements });
    connect.close();
  } catch (error) {
    res.status(500).json({
      message: error.message || 'Could not delete the data',
    });
    connect.close();
  }
}
