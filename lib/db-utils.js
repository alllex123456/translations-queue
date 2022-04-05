import { MongoClient } from 'mongodb';
import { hash, compare } from 'bcrypt';

const connectionString = `mongodb+srv://${process.env.mongo_user}:${process.env.mongo_pass}@${process.env.mongo_cluster}.vndt4.mongodb.net/${process.env.mongo_database}?retryWrites=true&w=majority`;

export async function connectToDatabase() {
  return await MongoClient.connect(connectionString);
}

export async function hashPassword(password) {
  return await hash(password, 12);
}

export async function comparePasswords(oldPass, newPass) {
  return await compare(oldPass, newPass);
}

export async function getAllClients(email) {
  const connection = await connectToDatabase();
  const user = await connection
    .db()
    .collection('users')
    .findOne({ email: email });
  return user.clients.map((client) => client.id);
}

export async function getClient(email, clientId) {
  const connection = await connectToDatabase();
  const user = await connection
    .db()
    .collection('users')
    .findOne({ email: email });
  return user.clients.find((client) => client.id === clientId);
}
