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
