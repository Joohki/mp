import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToAuthDatabase } from "../../../lib/authdb";
import { verifyPassword } from "../../../lib/passwordAuth";
import prisma from "@/db";
import GoogleProvider from "next-auth/providers/google";
import NaverProvider from "next-auth/providers/naver";
import KakaoProvider from "next-auth/providers/kakao";

export const authOptions  = {
  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth",
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const client = await connectToAuthDatabase();
        const userCollection = client.db().collection("users");
        const user = await userCollection.findOne({
          email: credentials.email,
        });
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
return;
        // return { email: user.email }; //password는 해싱됐어도 클라이언트 노출 x
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    NaverProvider({
      clientId: process.env.NAVER_CLIENT_ID || "",
      clientSecret: process.env.NAVER_CLIENT_SECRET || "",
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID || "",
      clientSecret: process.env.KAKAO_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      // 사용자 로그인 후의 추가 로직을 작성할 수 있습니다.

      if (account.provider === "credentials") {
        return true;
      }
      if (profile) {
        user.name = profile.response?.name || user.name;
        user.email = profile.response?.email || user.email;
      }

      try {
        // 데이터베이스에 유저가 있는지 확인
        let db_user = await prisma.user.findUnique({
          where: { email: user.email },
        });

        // 없으면 데이터베이스에 유저 추가
        if (!db_user) {
          db_user = await prisma.user.create({
            data: {
              name: user.name,
              email: user.email,
              provider: account.provider,
              emailVerified: new Date(),
              image: user.image,
            },
          });
        } else {
          // 이미 가입된 경우에 대한 처리
          if (db_user.provider !== account.provider) {
            console.log("이미 다른 인증 제공자로 가입된 이메일입니다.");
            // 여기에서 리다이렉트 로직을 추가하면 됩니다.
            return "/error/already-registered";
          }
        }

        // 유저 정보에 데이터베이스 아이디, 역할 연결
        user.id = db_user.id;
        user.provider = account.provider; // 여기서 provider 속성 추가
        return true;
      } catch (error) {
        console.log("로그인 도중 에러가 발생했습니다. " + error);

        // return false;
      }
    },

    session: ({ session, token }) => ({
      ...session,
      user: {
        ...session.user,
        id: token.sub,
        provider: token.provider || "credentials",
      },
    }),
    jwt: async ({ user, token }) => {
      if (user) {
        token.sub = user.id;
        token.provider = user.provider || "credentials";
      }
      return token;
    },
  },
};
export default NextAuth(authOptions);
