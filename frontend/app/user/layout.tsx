import Link from "next/link"

export default function UserLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 py-10">
      <div className="w-full max-w-sm">
        <Link
          href="/"
          className="mb-6 block text-center text-lg font-semibold tracking-tight"
        >
          Dashboard
        </Link>
        <div className="rounded-2xl border bg-card p-6 shadow-sm">{children}</div>
        <nav className="mt-4 flex justify-center gap-4 text-xs text-muted-foreground">
          <Link href="/user/login" className="hover:text-foreground">
            로그인
          </Link>
          <Link href="/user/signup" className="hover:text-foreground">
            회원가입
          </Link>
          <Link href="/user/products" className="hover:text-foreground">
            상품 등록
          </Link>
        </nav>
      </div>
    </div>
  )
}
