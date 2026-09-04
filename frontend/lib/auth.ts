"use client"

import * as React from "react"

import type { User } from "@/lib/api"

const STORAGE_KEY = "dashboard.auth.user"

export function getStoredUser(): User | null {
  if (typeof window === "undefined") return null
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as User) : null
  } catch {
    return null
  }
}

export function setStoredUser(user: User | null) {
  if (typeof window === "undefined") return
  try {
    if (user) window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
    else window.localStorage.removeItem(STORAGE_KEY)
    window.dispatchEvent(new Event("auth-change"))
  } catch {
    /* ignore */
  }
}

export function useAuth() {
  const [user, setUser] = React.useState<User | null>(null)
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    setUser(getStoredUser())
    setLoading(false)
    const sync = () => setUser(getStoredUser())
    window.addEventListener("auth-change", sync)
    window.addEventListener("storage", sync)
    return () => {
      window.removeEventListener("auth-change", sync)
      window.removeEventListener("storage", sync)
    }
  }, [])

  return {
    user,
    loading,
    login: (u: User) => setStoredUser(u),
    logout: () => setStoredUser(null),
  }
}
