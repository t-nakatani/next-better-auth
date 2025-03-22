import { auth } from "@/app/auth";
// Next.js専用のHandlerを導入する
import { toNextJsHandler } from "better-auth/next-js";
export const { POST, GET } = toNextJsHandler(auth); 