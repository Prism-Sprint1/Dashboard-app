// FastAPI 백엔드 (Supabase Postgres 연결) 호출 클라이언트

import type { Transaction } from "@/lib/types"

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000"

export type User = {
  id: string
  email: string
  name: string
  profile_img: string
  created_at: string
}

export type LoginResponse = {
  message: string
  user: User
}

type Method = "VISA" | "Master"

export type PurchasePayload = {
  user_id: string
  product: {
    id: string
    name: string
    color?: string
    option?: string
    image?: string
  }
  price: number
  method: Method
  card: string
}

export type NotificationItem = {
  id: string
  product: {
    id: string
    name: string
    color: string
    option: string
    image: string
  }
  price: number
  customer: string
  date: string
  method: Method
  card: string
  email: string
  profile: string
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...init,
  })

  const data = await res.json().catch(() => null)

  if (!res.ok) {
    const detail =
      (data && (data.detail as string)) || `요청 실패 (${res.status})`
    throw new Error(
      Array.isArray(detail) ? detail.map((d) => d.msg).join(", ") : detail
    )
  }

  return data as T
}

export const api = {
  signup: (body: {
    email: string
    password: string
    name: string
    profile_img?: string
  }) =>
    request<User>("/users/signup", {
      method: "POST",
      body: JSON.stringify(body),
    }),

  login: (body: { email: string; password: string }) =>
    request<LoginResponse>("/users/login", {
      method: "POST",
      body: JSON.stringify(body),
    }),

  createPurchase: (body: PurchasePayload) =>
    request<{ message: string; item: NotificationItem }>("/users/purchases", {
      method: "POST",
      body: JSON.stringify(body),
    }),

  getPurchases: (userId: string) =>
    request<{ user_id: string; count: number; items: NotificationItem[] }>(
      `/notification/${userId}`
    ),

  // Recent Transaction 테이블용 - 전체 거래 내역
  getTransactions: () => request<Transaction[]>("/notification"),
}
