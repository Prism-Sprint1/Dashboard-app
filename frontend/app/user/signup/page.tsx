"use client"

import * as React from "react"

import Link from "next/link"
import { useRouter } from "next/navigation"

import { Button, Input } from "@/components/ui"
import { api } from "@/lib/api"

export default function SignupPage() {
  const router = useRouter()
  const [form, setForm] = React.useState({
    name: "",
    email: "",
    password: "",
    profile_img: "",
  })
  const [error, setError] = React.useState<string | null>(null)
  const [done, setDone] = React.useState(false)
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
      await api.signup({
        name: form.name,
        email: form.email,
        password: form.password,
        profile_img: form.profile_img || undefined,
      })
      setDone(true)
      setTimeout(() => router.push("/user/login"), 1200)
    } catch (err) {
      setError(err instanceof Error ? err.message : "회원가입에 실패했습니다.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-lg font-semibold">회원가입</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          이메일로 새 계정을 만듭니다.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <Field label="이름">
          <Input
            required
            value={form.name}
            onChange={update("name")}
            placeholder="Liam Smith"
          />
        </Field>
        <Field label="이메일">
          <Input
            required
            type="email"
            value={form.email}
            onChange={update("email")}
            placeholder="you@example.com"
          />
        </Field>
        <Field label="비밀번호">
          <Input
            required
            type="password"
            minLength={8}
            value={form.password}
            onChange={update("password")}
            placeholder="8자 이상"
          />
        </Field>
        <Field label="프로필 이미지 URL (선택)">
          <Input
            type="url"
            value={form.profile_img}
            onChange={update("profile_img")}
            placeholder="https://..."
          />
        </Field>

        {error && <p className="text-sm text-destructive">{error}</p>}
        {done && (
          <p className="text-sm text-emerald-600">
            가입 완료! 로그인 페이지로 이동합니다.
          </p>
        )}

        <Button
          type="submit"
          size="lg"
          className="w-full"
          disabled={loading || done}
        >
          {loading ? "처리 중..." : "가입하기"}
        </Button>
      </form>

      <p className="text-center text-sm text-muted-foreground">
        이미 계정이 있으신가요?{" "}
        <Link href="/user/login" className="text-foreground underline">
          로그인
        </Link>
      </p>
    </div>
  )
}

function Field({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <label className="block space-y-1.5">
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      {children}
    </label>
  )
}
