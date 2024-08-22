import { MongoClient } from "mongodb";
import { IPostFormData } from "@/types";
export async function getAllBoardDatas() {
  const connectString = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.a9a7kzo.mongodb.net/${process.env.mongodb_noticeboarddata}?retryWrites=true&w=majority`;
  const client = await MongoClient.connect(connectString);
  const db = client.db();
  const boardDataCollection = db.collection("contents");

  const contents: IPostFormData[] = await boardDataCollection.find().toArray();

  client.close();
  return contents;
}
export function getDetailBoardData(array: IPostFormData[], id: string) {
  const filteredArray = array.filter((item) => {
    if (item._id) {
      item._id = item._id.toString();
      return item._id === id;
    }
  });
  const detail = filteredArray[0];
  return detail;
}
