export type Transaction = {
  id: string
  product: string
  detail: string
  price: string
  customer: string
  initials: string
  date: string
  method: "VISA" | "Master"
  card: string
  email: string
  image: string
}
