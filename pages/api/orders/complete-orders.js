import { connectToDatabase } from '../../../lib/db-utils';
import { getSession } from 'next-auth/client';

export default async function handler(req, res) {
  if (req.method !== 'POST') return;

  const session = await getSession({ req });
  const authenticatedUser = session.user.email;
  const clientId = req.body.id;

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
    const updatedInvoicing = user.invoicing;
    const completedOrder = user.orders.find((order) => order.id === clientId);
    const currentClient = user.clients.find(
      (client) => client.name === completedOrder.client
    );

    updatedInvoicing.push({
      ...completedOrder,
      count: req.body.finalCount,
      rate: req.body.finalRate,
    });

    const updateMongo = await connect
      .db()
      .collection('users')
      .updateOne(
        { email: authenticatedUser },
        { $set: { invoicing: updatedInvoicing } }
      );

    res.status(200).json({
      message: 'Invoicing list successfully updated',
    });
    connect.close();
  } catch (error) {
    res.status(500).json({
      message: error.message || 'Could not update the database',
    });
    connect.close();
  }
}
