import {
  CalendarDays,
  CreditCard,
  Hash,
  Mail,
  SlidersHorizontal,
  UserRound,
} from "lucide-react"

export const tableColumns = [
  [Hash, "ORDER ID"],
  [SlidersHorizontal, "PRODUCT ITEM"],
  [CreditCard, "PRICE"],
  [UserRound, "CUSTOMER"],
  [CalendarDays, "DATE CHECKOUT"],
  [CreditCard, "PAYMENT METHOD"],
  [Mail, "EMAIL"],
] as const
