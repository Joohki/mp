import { connectToAuthDatabase } from "../../../lib/authdb";
import { hashPassword } from "../../../lib/passwordAuth";
import { NextApiRequest, NextApiResponse } from "next";
interface userData {
  email: string;
  password: string;
  userType: string;
}
async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const data: userData = req.body;
    const { email, password, userType } = data;
    if (
      !email ||
      !email.includes("@") ||
      !password ||
      password.trim().length < 7
    ) {
      res.status(422).json({
        message:
          "Invalid input - password should also be at least 7 chararaters long.",
      });
      return;
    }
    const client = await connectToAuthDatabase();
    const db = client.db();
    const existingUser = await db.collection("users").findOne({ email: email });
    if (existingUser) {
      res.status(422).json({ message: "user exists already" });
      client.close();
      return;
    }
    const hashedPassword = await hashPassword(password);
    const result = await db.collection("users").insertOne({
      email: email,
      password: hashedPassword,
      userType: userType,
    });
    res.status(201).json({ message: "Created User!" });
    client.close();
  }
}
export default handler;
