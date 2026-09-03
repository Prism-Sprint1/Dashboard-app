"use client"

import * as React from "react"

import Link from "next/link"
import { useRouter } from "next/navigation"

import { Button, Input } from "@/components/ui"
import { api, type NotificationItem } from "@/lib/api"
import { useAuth } from "@/lib/auth"

const emptyForm = {
  id: "",
  name: "",
  color: "",
  option: "",
  image: "",
  price: "",
  method: "VISA" as "VISA" | "Master",
  card: "",
}

export default function ProductsPage() {
  const router = useRouter()
  const { user, loading: authLoading, logout } = useAuth()
  const [form, setForm] = React.useState(emptyForm)
  const [items, setItems] = React.useState<NotificationItem[]>([])
  const [error, setError] = React.useState<string | null>(null)
  const [message, setMessage] = React.useState<string | null>(null)
  const [submitting, setSubmitting] = React.useState(false)

  React.useEffect(() => {
    if (!authLoading && !user) router.replace("/user/login")
  }, [authLoading, user, router])

  const refresh = React.useCallback(async () => {
    if (!user) return
    try {
      const res = await api.getPurchases(user.id)
      setItems(res.items)
    } catch (err) {
      setError(err instanceof Error ? err.message : "목록 조회 실패")
    }
  }, [user])

  React.useEffect(() => {
    refresh()
  }, [refresh])

  if (authLoading || !user) {
    return <p className="text-sm text-muted-foreground">불러오는 중...</p>
  }

  const update =
    (key: keyof typeof form) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm((prev) => ({ ...prev, [key]: event.target.value }))

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setError(null)
    setMessage(null)
    setSubmitting(true)
    try {
      const res = await api.createPurchase({
        user_id: user.id,
        product: {
          id: form.id,
          name: form.name,
          color: form.color,
          option: form.option,
          image: form.image,
        },
        price: Number(form.price),
        method: form.method,
        card: form.card,
      })
      setMessage(res.message)
      setForm(emptyForm)
      refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : "등록 실패")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-lg font-semibold">상품 등록</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {user.name} 님이 구매한 상품
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={logout}>
          로그아웃
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <Field label="상품 ID">
            <Input required value={form.id} onChange={update("id")} placeholder="AR-47380416-61" />
          </Field>
          <Field label="상품명">
            <Input required value={form.name} onChange={update("name")} placeholder="MacBook Air M3" />
          </Field>
          <Field label="색상">
            <Input value={form.color} onChange={update("color")} placeholder="White" />
          </Field>
          <Field label="옵션">
            <Input value={form.option} onChange={update("option")} placeholder="512Gb" />
          </Field>
          <Field label="이미지 URL">
            <Input value={form.image} onChange={update("image")} placeholder="https://..." />
          </Field>
          <Field label="가격 (USD)">
            <Input required type="number" min="0" step="0.01" value={form.price} onChange={update("price")} placeholder="499.00" />
          </Field>
          <Field label="결제 수단">
            <select
              value={form.method}
              onChange={update("method")}
              className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none focus-visible:border-ring"
            >
              <option value="VISA">VISA</option>
              <option value="Master">Master</option>
            </select>
          </Field>
          <Field label="카드 뒤 4자리">
            <Input required value={form.card} onChange={update("card")} pattern="\d{4}" maxLength={4} placeholder="4321" />
          </Field>
        </div>

        {error && <p className="text-sm text-destructive">{error}</p>}
        {message && <p className="text-sm text-emerald-600">{message}</p>}

        <Button type="submit" size="lg" className="w-full" disabled={submitting}>
          {submitting ? "등록 중..." : "구매 상품 등록"}
        </Button>
      </form>

      <div className="space-y-2">
        <h2 className="text-sm font-medium">
          등록된 구매 내역 <span className="text-muted-foreground">({items.length})</span>
        </h2>
        {items.length === 0 ? (
          <p className="text-sm text-muted-foreground">아직 등록된 내역이 없습니다.</p>
        ) : (
          <ul className="divide-y rounded-lg border">
            {items.map((item) => (
              <li key={item.id} className="flex items-center justify-between px-3 py-2 text-sm">
                <span>
                  <span className="font-medium">{item.product.name}</span>
                  <span className="ml-2 text-xs text-muted-foreground">
                    {item.method} **** {item.card}
                  </span>
                </span>
                <span className="font-semibold">${item.price}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <p className="text-center text-xs text-muted-foreground">
        <Link href="/" className="underline">
          대시보드로 돌아가기
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
