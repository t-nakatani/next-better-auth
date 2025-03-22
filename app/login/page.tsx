import { UserAuthForm } from "@/components/user-auth-form"

export default function LoginPage() {
  return (
    <div className="container mx-auto max-w-md p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">ログイン / 登録</h1>
      <UserAuthForm />
    </div>
  )
} 