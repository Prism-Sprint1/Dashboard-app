import React from "react"
import { Users, ArrowUpRight } from "lucide-react"

const customerData = [
  {
    flag: "🇬🇧",
    country: "United Kingdom",
    count: "12,628",
    percent: 80,
    color: "bg-emerald-500",
  },
  {
    flag: "🇺🇸",
    country: "United States",
    count: "10,628",
    percent: 70,
    color: "bg-orange-500",
  },
  {
    flag: "🇸🇪",
    country: "Sweden",
    count: "8,628",
    percent: 60,
    color: "bg-indigo-500",
  },
]

export default function CustomersProgressBar() {
  return (
    <div>
      {customerData.map((customer) => (
        <div key={customer.country}>
          {customer.country} - {customer.percent}%
          <div className="h-2 w-full rounded-full bg-neutral-800">
            <div
              className={`h-full rounded-full ${customer.color}`}
              style={{ width: `${customer.percent}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}
