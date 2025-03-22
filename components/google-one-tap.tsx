"use client"
import { useEffectOnce } from 'react-use'
import { authClient } from '@/lib/auth-client'
import { useRouter } from 'next/navigation'

export const GoogleOneTap = () => {
  const router = useRouter()
  useEffectOnce(() => {
    try {
      authClient.oneTap({
        fetchOptions: {
          onSuccess: () => {
            router.push("/dashboard")
          },
          onError: (error) => {
            // AbortErrorは無視（一般的にユーザーによるキャンセルや
            // ブラウザの仕様によるものなので、エラーとして扱わない）
            if (error.name !== 'AbortError') {
              console.error('Google One Tap error:', error)
            }
          }
        }
      })
    } catch (error) {
      console.error('Failed to initialize Google One Tap:', error)
    }
  })
  return null
} 