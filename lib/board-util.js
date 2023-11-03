import { MongoClient } from "mongodb";
export async function getAllBoardDatas() {
  const connectString = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.a9a7kzo.mongodb.net/${process.env.mongodb_noticeboarddata}?retryWrites=true&w=majority`;
  const client = await MongoClient.connect(connectString);
  const db = client.db();
  const boardDataCollection = db.collection("contents");

  const contents = await boardDataCollection.find().toArray();

  client.close();
  return contents;
}
export function getDetailBoardData(array, id) {
  const filteredArray = array.filter((item) => {
    item.id === id;
  });
  const detail = filteredArray[0];
  return detail;
}
