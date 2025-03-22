"use client"

import { useEffect, useState } from "react"
import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"

export default function Dashboard() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchUser() {
      try {
        const { data } = await authClient.getSession()
        if (data.session) {
          setUser(data.session.user)
        } else {
          router.push("/")
        }
      } catch (error) {
        console.error(error)
        router.push("/")
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [router])

  async function handleLogout() {
    try {
      await authClient.signOut()
      router.push("/")
    } catch (error) {
      console.error(error)
    }
  }

  if (loading) {
    return <div className="flex h-screen items-center justify-center">ロード中...</div>
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">ダッシュボード</h1>
      {user && (
        <div className="bg-white p-6 rounded shadow-sm">
          <h2 className="text-lg font-semibold mb-4">ユーザー情報</h2>
          <p>名前: {user.name || 'N/A'}</p>
          <p>メール: {user.email}</p>
          <button
            onClick={handleLogout}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
          >
            ログアウト
          </button>
        </div>
      )}
    </div>
  )
} 