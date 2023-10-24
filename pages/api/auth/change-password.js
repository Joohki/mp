
import { hashPassword, verifyPassword } from "../../../lib/passwordAuth";

import { getServerSession } from "next-auth/next";
import {authOptions} from './[...nextauth]'
import { connectToAuthDatabase } from "../../../lib/authdb";
async function handler(req, res) {
  if (req.method !== "PATCH") {
    return;
  }
  const session = await getServerSession(req,res, authOptions);
  if (!session) {
    res.status(401).json({ message: "Not Authenticated" });
    return;
  }
  const userEmail = session.user.email;
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;
  const newHashedPassword = await hashPassword(newPassword);
  const client = await connectToAuthDatabase();
  const db = client.db();
  const usersCollection = db.collection("users");
  const user = await usersCollection.findOne({ email: userEmail });
  if (!user) {
    res.status(404).json({ message: "가입되지 않은 이메일입니다" });
    client.close();
    return;
  }
  const databaseCurrentPassword = user.password;
  const isCorrectPassword = await verifyPassword(
    oldPassword,
    databaseCurrentPassword
  );
  if (!isCorrectPassword) {
    res.status(403).json({ message: "비밀번호를 확인해주세요" });
    client.close();
    return;
  }
  const result = usersCollection.updateOne(
    { email: userEmail },
    { $set: { password: newHashedPassword } }
  );
  client.close();
  res.status(200).json({ message: "Password updated" });
}
export default handler;
