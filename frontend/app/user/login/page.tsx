"use client"

import * as React from "react"

import Link from "next/link"
import { useRouter } from "next/navigation"

import { Button, Input } from "@/components/ui"
import { api } from "@/lib/api"
import { useAuth } from "@/lib/auth"

export default function LoginPage() {
  const router = useRouter()
  const { user, login, logout } = useAuth()
  const [form, setForm] = React.useState({ email: "", password: "" })
  const [error, setError] = React.useState<string | null>(null)
  const [loading, setLoading] = React.useState(false)

  const update =
    (key: keyof typeof form) =>
    (event: React.ChangeEvent<HTMLInputElement>) =>
      setForm((prev) => ({ ...prev, [key]: event.target.value }))

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const res = await api.login(form)
      login(res.user)
      router.push("/user/products")
    } catch (err) {
      setError(err instanceof Error ? err.message : "로그인에 실패했습니다.")
    } finally {
      setLoading(false)
    }
  }

  if (user) {
    return (
      <div className="space-y-4">
        <h1 className="text-lg font-semibold">로그인됨</h1>
        <p className="text-sm text-muted-foreground">
          <span className="font-medium text-foreground">{user.name}</span> (
          {user.email})님으로 로그인되어 있습니다.
        </p>
        <div className="flex gap-2">
          <Button
            size="lg"
            className="flex-1"
            onClick={() => router.push("/user/products")}
          >
            상품 등록으로
          </Button>
          <Button size="lg" variant="outline" onClick={logout}>
            로그아웃
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-lg font-semibold">로그인</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Supabase에 저장된 계정으로 로그인합니다.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <label className="block space-y-1.5">
          <span className="text-xs font-medium text-muted-foreground">
            이메일
          </span>
          <Input
            required
            type="email"
            value={form.email}
            onChange={update("email")}
            placeholder="you@example.com"
          />
        </label>
        <label className="block space-y-1.5">
          <span className="text-xs font-medium text-muted-foreground">
            비밀번호
          </span>
          <Input
            required
            type="password"
            value={form.password}
            onChange={update("password")}
          />
        </label>

        {error && <p className="text-sm text-destructive">{error}</p>}

        <Button type="submit" size="lg" className="w-full" disabled={loading}>
          {loading ? "로그인 중..." : "로그인"}
        </Button>
      </form>

      <p className="text-center text-sm text-muted-foreground">
        계정이 없으신가요?{" "}
        <Link href="/user/signup" className="text-foreground underline">
          회원가입
        </Link>
      </p>
    </div>
  )
}
