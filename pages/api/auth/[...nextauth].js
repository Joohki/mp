import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToAuthDatabase } from "../../../lib/authdb";
import { verifyPassword } from "../../../lib/passwordAuth";
export const authOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const client = await connectToAuthDatabase();
        const userCollection = client.db().collection("users");
        const user = await userCollection.findOne({ email: credentials.email });
        if (!user) {
          client.close();
          throw new Error("no user found");
        }
        const isValid = await verifyPassword(
          credentials.password,
          user.password
        );
        if (!isValid) {
          client.close();
          throw new Error("couldnt log in");
        }
        client.close();
        return { email: user.email }; //password는 해싱됐어도 클라이언트 노출 x
      },
    }),
  ],
};
export default NextAuth(authOptions);
