import { MongoClient } from 'mongodb';

const url = 'mongodb://0.0.0.0:27017/';
const dbName = 'events';

export async function connectDatabase() {
  const client = await new MongoClient(url);
  return client;
}

export async function insertDocument(client, collection, document) {
  const db = client.db(dbName);

  const result = await db.collection(collection).insertOne(document);

  return result;
}

export async function getAllDocuments(client, collection, sort) {
  const db = client.db(dbName);
  const result = await db.collection(collection).find().sort(sort).toArray();
  return result;
}
