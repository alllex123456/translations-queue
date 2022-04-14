import { connectToDatabase } from '../../../lib/db-utils';
import { getSession } from 'next-auth/client';

export default async function handler(req, res) {
  if (req.method !== 'POST') return;

  const session = await getSession({ req });
  const authenticatedUser = session.user.email;
  const { id, client, count, rate, received, deadline, notes } = req.body;
  const newOrder = {
    id,
    client,
    count,
    rate,
    received,
    deadline,
    notes,
  };

  let connect;

  try {
    connect = await connectToDatabase();
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message || 'Could not connect to the database' });
    connect.close();
  }

  const db = connect.db();

  try {
    const userObject = await db
      .collection('users')
      .findOne({ email: authenticatedUser });
    const updatedOrders = userObject.orders;
    const orderToUpdate = updatedOrders.findIndex((order) => order.id === id);
    updatedOrders[orderToUpdate] = newOrder;
    const response = await db
      .collection('users')
      .updateOne(
        { email: authenticatedUser },
        { $set: { orders: updatedOrders } }
      );

    const user = await db
      .collection('users')
      .findOne({ email: authenticatedUser });
    const userOrders = user.orders.sort((a, b) =>
      a.deadline > b.deadline ? 1 : -1
    );
    res.status(200).json({ message: userOrders });
    connect.close();
  } catch (error) {
    res.status(500).json({
      message: error.message || 'Could not register the order',
    });
    connect.close();
  }
}
