import { createAuthClient } from "better-auth/react"
import { oneTapClient } from "better-auth/client/plugins"

// Client side専用のapiを作成する
export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL!,
  plugins: [
    oneTapClient({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!
    })
  ]
}) 