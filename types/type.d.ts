import { DefaultSession } from "next-auth";
import NextAuth from "next-auth/next";

declare module "next-auth" {
  interface Session {
    user: {
      provider?: string | undefined | null;
    } & DefaultSession["user"];
  }
//   interface Profile {
//     response: {
//       name?: string;
//       email?: string;
//     };
//   }
//   interface User {
//     id?: number;
//     provider?: string;
  
//   }
 
 
}
