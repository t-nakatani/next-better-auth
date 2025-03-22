"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { authClient } from "@/lib/auth-client"
import { GoogleOneTap } from "./google-one-tap"

export function UserAuthForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLogin, setIsLogin] = useState(true)

  // async function onSubmit(event: React.SyntheticEvent) {
  //   event.preventDefault()
  //   setIsLoading(true)
  //   if (!isLogin) {
  //     try {
  //       // 新規ユーザ登録処理
  //       const { data, error } = await authClient.signUp.email(
  //         {
  //           email,
  //           password,
  //           name: email.split("@")[0],
  //         },
  //         {
  //           onRequest: () => {
  //             setIsLoading(true)
  //           },
  //           onSuccess: () => {
  //             router.push("/dashboard")
  //           },
  //           onError: ctx => {
  //             alert(ctx.error.message)
  //           },
  //         }
  //       )
  //     } finally {
  //       setIsLoading(false)
  //     }
  //   } else {
  //     try {
  //       // ユーザーネームとパスワードでログイン処理
  //       const { data, error } = await authClient.signIn.email(
  //         {
  //           email,
  //           password,
  //         },
  //         {
  //           onRequest: () => {
  //             setIsLoading(true)
  //           },
  //           onSuccess: () => {
  //             router.push("/dashboard")
  //           },
  //           onError: ctx => {
  //             alert(ctx.error.message)
  //           },
  //         }
  //       )
  //     } finally {
  //       setIsLoading(false)
  //     }
  //   }
  // }

  async function handleGoogleSignIn() {
    // Google oauth
    try {
      setIsLoading(true)
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/dashboard",
      })
    } catch (error) {
      console.error(error)
      alert("Failed to sign in with Google")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="grid gap-6">
      <GoogleOneTap />
      
      {/* <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label htmlFor="email">メールアドレス</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="password">パスワード</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full p-2 bg-blue-500 text-white rounded"
        >
          {isLoading ? 'ロード中...' : isLogin ? 'ログイン' : '登録'}
        </button>
      </form> */}

      {/* <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2">または</span>
        </div>
      </div> */}

      <button
        type="button"
        onClick={handleGoogleSignIn}
        disabled={isLoading}
        className="w-full p-2 border rounded flex items-center justify-center gap-2"
      >
        <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
          {/* Google アイコンの SVG パス */}
        </svg>
        Googleでログイン
      </button>

      <div className="text-center">
        <button
          type="button"
          onClick={() => setIsLogin(!isLogin)}
          className="text-sm underline"
        >
          {isLogin ? '新規登録はこちら' : 'すでにアカウントをお持ちの方はこちら'}
        </button>
      </div>
    </div>
  )
} 