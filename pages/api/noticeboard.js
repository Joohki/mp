import { MongoClient } from "mongodb";
async function handler(req, res) {
  if (req.method === "POST") {
    const { email, name, title, category, summary, contents,createdAt } = req.body;

    if (
      !email ||
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !contents ||
      contents.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid input." });
      return;
    }

    const newContents = {
      email,
      name,
      title,
      category,
      summary,
      contents,
      createdAt
    };

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
      const result = await db.collection("contents").insertOne(newContents);
      newContents.id = result.insertedId;
    } catch (error) {
      client.close();
      res.status(500).json({ message: "Storing message failed!" });
      return;
    }

    client.close();

    res
      .status(201)
      .json({ message: "Successfully stored message!", contents: newContents });
  }
}

export default handler;
