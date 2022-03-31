import { connectToDatabase } from '../../lib/db-utils';
import { getSession } from 'next-auth/client';

export default async function handler(req, res) {
  const session = await getSession({ req });
  const authenticatedUser = session.user.email;
  const { client, pages, received, deadline } = req.body;
  const newOrder = {
    id: new Date().toISOString(),
    client,
    pages,
    received,
    deadline,
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
  if (req.method === 'POST') {
    try {
      const userObject = await db
        .collection('users')
        .findOne({ email: authenticatedUser });
      const updatedOrders = userObject.orders;
      updatedOrders.push(newOrder);
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

  if (req.method === 'DELETE') {
    try {
      const removeUser = await db
        .collection('users')
        .findOne({ email: authenticatedUser });
      const updatedOrders = removeUser.orders.filter(
        (order) => order.id !== req.body.id
      );
      const updateMongo = await db
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
        message:
          error.message ||
          'Connected to the database, but could not delete data',
      });
      connect.close();
    }
  }
}
