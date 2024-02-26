import { MongoClient } from "mongodb";
export async function connectToAuthDatabase() {
  const connectString = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.a9a7kzo.mongodb.net/${process.env.mongodb_authdata}?retryWrites=true&w=majority`;
  const client = await MongoClient.connect(connectString);
  return client;
}
