import { connectToDatabase, hashPassword } from '../../lib/db-utils';

export default async function handler(req, res) {
  if (req.method !== 'POST') return;
  let client;
  const { email, password, checkPassword } = req.body;
  const hashedPassword = await hashPassword(password);
  if (password !== checkPassword) {
    res.status(500).json({ message: 'The two passwords do not match!' });
  }

  try {
    client = await connectToDatabase();
  } catch (error) {
    res.status(500).json({ message: 'Could not connect to database' });
    client.close();
    return;
  }

  try {
    const collection = client.db().collection('users');
    const newUser = await collection.insertOne({
      email,
      password: hashedPassword,
      orders: [],
    });
    res
      .status(201)
      .json({ message: 'Account successfully created. Please log in.' });
    client.close();
  } catch (error) {
    res.status(500).json({ message: 'Could not fetch the data' });
    client.close();
    return;
  }
}
