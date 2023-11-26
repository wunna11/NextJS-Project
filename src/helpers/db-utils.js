import { MongoClient } from 'mongodb';

const url = 'mongodb://0.0.0.0:27017/';
const dbName = 'events';
export const client = new MongoClient(url);
export const db = client.db(dbName);
