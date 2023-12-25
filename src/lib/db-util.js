import { MongoClient } from 'mongodb';

const url = 'mongodb://localhost:27017';
const dbName = 'auth-demo';

export async function connectDatabase() {
  const client = await new MongoClient(url);
  return client;
}

export async function getAllDocuments(client, collection) {
  const db = client.db(dbName);
  const result = await db.collection(collection).find().toArray();
  return result;
}

export async function getDocumentById(client, collection, id) {
  const db = client.db(dbName);
  const allDocuments = await db.collection(collection);
  const result = await allDocuments.findOne({ slug: id });
  return result;
}

export async function insertDocument(client, collection, document) {
  const db = client.db(dbName);
  const result = await db.collection(collection).insertOne(document);
  return result;
}

export async function getDocumentByEmail(client, collection, email) {
  const db = client.db(dbName);
  const allDocuments = await db.collection(collection);
  const result = await allDocuments.findOne({ email: email });
  return result;
}

