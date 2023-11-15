import { MongoClient,ObjectId } from "mongodb";

async function handler(req, res) {
  if (req.method === "DELETE") {
    const { id } = req.body;
   
    const objectIdToDelete = new ObjectId(id);
    let client;
    const connectString = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.a9a7kzo.mongodb.net/${process.env.mongodb_noticeboarddata}?retryWrites=true&w=majority`
    
    try {
      client = await MongoClient.connect(
        connectString
      );
    } catch (error) {
      res.status(500).json({ message: "Could not connect to database." });
      return;
    }

    const db = client.db();

    try {
      const result = await db.collection("contents").deleteOne({ _id: objectIdToDelete });
      if(!(result.deletedCount === 1)){
          throw new Error('삭제가 이뤄지지 않았습니다!')
      }
    } catch (error) {
      client.close();
      res.status(500).json({ message: error.message });
      
      return;
    }

    client.close();

    res
      .status(201)
      .json({ message: "Successfully stored message!"});
    
  }
}

export default handler;
