import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const { email, name, title, category, summary, contents, createdAt, date,file,filename } =
      req.body;
    const userIp = req.connection.remoteAddress;

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

    const connectString = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.a9a7kzo.mongodb.net/${process.env.mongodb_noticeboarddata}?retryWrites=true&w=majority`;

    let client;

    try {
      client = await MongoClient.connect(connectString);
    } catch (error) {
      res.status(500).json({ message: "Could not connect to database." });
      return;
    }

    const db = client.db();

    try {
      const currentDate = new Date();
      const currentDateString = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate()
      );

      const userPostCount = await db
        .collection("userPosts")
        .findOne({ ip: userIp, date: currentDateString });

      if (userPostCount && userPostCount.postCount >= 5) {
        res.status(403).json({ message: "하루에 게시글 5개까지 작성이 가능합니다." });
        return;
      }

      await db
        .collection("userPosts")
        .updateOne(
          { ip: userIp, date:currentDateString},
          { $inc: { postCount: 1 }, $setOnInsert: { ip: userIp, date:currentDateString } },
          { upsert: true }
        );

      const newContents = {
        email,
        name,
        title,
        category,
        summary,
        contents,
        createdAt,
        date,
        userIp,
        file,
        filename
      };

      const result = await db.collection("contents").insertOne(newContents);
      newContents.id = result.insertedId;

      res.status(201).json({
        message: "Successfully stored message!",
        contents: newContents,
      });
    } catch (error) {
      res.status(500).json({ message: "Storing message failed!" });
    } finally {
      client.close();
    }
  }
}

export default handler;
