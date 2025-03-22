import { betterAuth } from "better-auth";
import { oneTap } from "better-auth/plugins";
/* 
本文はPrismaを使ってデーターベースを操作しています、Prismaを使わなくても動けます、詳細は
https://www.prisma.io/
と
https://www.better-auth.com/docs/installation
にて確認してください
*/
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  // ユーザーネームとパスワード認証をONにする
  emailAndPassword: {
    enabled: true,
  },
  // Google oauthを設定する
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },
  // Google one tapのプラグインをONにする
  plugins: [oneTap()],
});