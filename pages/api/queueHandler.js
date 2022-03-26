import { MongoClient } from 'mongodb';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  const { client, pages, received, deadline } = req.body;
  const newOrder = {
    client,
    pages,
    received,
    deadline,
  };

  let connect;

  try {
    connect = await MongoClient.connect(
      'mongodb+srv://alex:andaluzia231178@cluster0.vndt4.mongodb.net/translationsQueue?retryWrites=true&w=majority'
    );
  } catch (error) {
    res
      .status(500)
      .json({ message: error.message || 'Could not connect to the database' });
    connect.close();
  }

  const db = connect.db();
  if (req.method === 'POST') {
    try {
      await db.collection('translationsQueue').insertOne(newOrder);
      const orders = await db.collection('translationsQueue').find().toArray();
      res.status(200).json({ message: orders });
      connect.close();
    } catch (error) {
      res.status(500).json({
        message: error.message || 'Could not register the order',
      });
      connect.close();
    }
  }

  if (req.method === 'GET') {
    try {
      const orders = await db
        .collection('translationsQueue')
        .find()
        .sort({ deadline: 1 })
        .toArray();
      const objectOrder = orders.map((order) => ({
        _id: order._id.toString(),
        ...order,
      }));
      res.status(200).json({ message: objectOrder });
      connect.close();
    } catch (error) {
      res.status(500).json({
        message:
          error.message ||
          'Connected to the database, but could not fetch data',
      });
      connect.close();
    }
  }

  if (req.method === 'DELETE') {
    try {
      const toRemove = await db
        .collection('translationsQueue')
        .find({ _id: ObjectId(req.body.id) })
        .toArray();
      await db.collection('translationsQueue').deleteOne(toRemove[0]);
      const updatedCollection = await db
        .collection('translationsQueue')
        .find()
        .toArray();
      const objectOrder = updatedCollection.map((order) => ({
        _id: order._id.toString(),
        ...order,
      }));
      res.status(200).json({ message: objectOrder });
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
