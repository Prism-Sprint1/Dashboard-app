"use client"

import * as React from "react"

import { Download, EyeOff, Search, X, SlidersHorizontal } from "lucide-react"

import Image from "next/image"

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Input,
  Table as ShadcnTable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui"

import { data } from "@/lib/mockData"
import { exportToCsv } from "@/lib/exportCsv"
import { tableColumns } from "./table.constants"

const columns = tableColumns

export default function OrderTable() {
  const [selected, setSelected] = React.useState<string[]>([])
  const [query, setQuery] = React.useState("")
  const visibleTransactions = data.transactions.filter((transaction) =>
    `${transaction.id} ${transaction.product} ${transaction.customer} ${transaction.email}`
      .toLowerCase()
      .includes(query.toLowerCase())
  )
  const allVisibleSelected =
    visibleTransactions.length > 0 &&
    visibleTransactions.every((transaction) =>
      selected.includes(transaction.id)
    )
  const toggleRow = (id: string) =>
    setSelected((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    )
  const toggleAll = () =>
    setSelected(
      allVisibleSelected
        ? selected.filter(
            (id) =>
              !visibleTransactions.some((transaction) => transaction.id === id)
          )
        : [
            ...new Set([
              ...selected,
              ...visibleTransactions.map((transaction) => transaction.id),
            ]),
          ]
    )

  const handleExportCsv = () => {
    // 선택된 행이 있으면 선택된 것만, 없으면 현재 검색 필터가 적용된 전체를 내보냄
    const rowsToExport =
      selected.length > 0
        ? visibleTransactions.filter((t) => selected.includes(t.id))
        : visibleTransactions

    const csvRows = rowsToExport.map((t) => ({
      "Order ID": t.id,
      Product: t.product,
      Detail: t.detail,
      Price: t.price,
      Customer: t.customer,
      "Date Checkout": t.date,
      "Payment Method": t.method,
      Card: `**** ${t.card}`,
      Email: t.email,
    }))

    exportToCsv(csvRows, `transactions_${Date.now()}.csv`)
  }

  return (
    <section className="border-bd-black w-full rounded-2xl border p-4 shadow-[0_12px_40px_rgba(25,28,27,0.04)] md:p-6">
      <div className="mb-6 flex flex-col justify-between gap-4 xl:flex-row xl:items-center">
        <div>
          <h1 className="flex items-center gap-2 text-xl font-semibold tracking-[-0.02em]">
            Recent Transaction
            <span className="min-w-5 rounded-lg bg-[#23272A] px-1 text-center text-sm font-normal text-[#696D72]">
              {data.transactions.length}
            </span>
          </h1>
          <p className="mt-1 text-sm text-[#8b928d]">
            Monitor your latest orders and payment activity.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative w-full sm:w-56">
            <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-[#8b928d]" />
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search"
              className="border-bd-black2 h-9 bg-[#111317] pr-7 pl-9 text-sm"
            />
            {query && (
              <button
                aria-label="Clear search"
                onClick={() => setQuery("")}
                className="absolute top-1/2 right-2 -translate-y-1/2 text-[#8b928d]"
              >
                <X className="size-4" />
              </button>
            )}
          </div>
          <Button
            variant="outline"
            size="sm"
            className="border-bd-black2 h-9 bg-[#111317] text-[#8b928d]"
          >
            <EyeOff /> Hide filter
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="border-bd-black2 h-9 bg-[#111317] text-[#8b928d]"
          >
            <SlidersHorizontal /> Customize
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <Button
                  size="sm"
                  className="hover:-bg-[#111317] border-bd-black2 h-9 bg-[#20212A] text-[#8b928d] hover:text-white"
                >
                  <Download /> Export
                </Button>
              }
            />
            <DropdownMenuContent align="end" className="w-36">
              <DropdownMenuItem onClick={handleExportCsv}>
                Export CSV
              </DropdownMenuItem>
              <DropdownMenuItem>Export PDF</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="-mx-4 overflow-x-auto md:-mx-6">
        <div className="px-4 md:px-6">
          <ShadcnTable className="min-w-275">
            <TableHeader>
              <TableRow className="border-bd-black hover:bg-transparent">
                <TableHead className="w-10">
                  <input
                    type="checkbox"
                    aria-label="Select all transactions"
                    checked={allVisibleSelected}
                    onChange={toggleAll}
                    className="accent-bd-black size-4"
                  />
                </TableHead>
                {columns.map(([Icon, label]) => (
                  <TableHead
                    key={label}
                    className="h-11 text-[11px] tracking-[0.08em] text-[#8b928d]"
                  >
                    <span className="flex items-center gap-2">
                      <Icon className="size-3.5" />
                      {label}
                    </span>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {visibleTransactions.map((transaction) => (
                <TableRow
                  key={transaction.id}
                  data-state={
                    selected.includes(transaction.id) ? "selected" : undefined
                  }
                  className="border-bd-black h-19"
                >
                  <TableCell>
                    <input
                      type="checkbox"
                      aria-label={`Select ${transaction.id}`}
                      checked={selected.includes(transaction.id)}
                      onChange={() => toggleRow(transaction.id)}
                      className="accent-bd-black size-4"
                    />
                  </TableCell>
                  <TableCell className="font-mono text-xs font-medium text-white">
                    {transaction.id}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Image
                        width={40}
                        height={40}
                        src={transaction.image ? transaction.image : ""}
                        alt=""
                        className="size-10 rounded-lg object-cover"
                      />
                      <div>
                        <p className="font-medium text-white">
                          {transaction.product}
                        </p>
                        <p className="mt-1 text-xs text-[#aaa]">
                          {transaction.detail}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="font-semibold">
                    $<span>{transaction.price.split(".")[0]}</span>
                    <span className="text-[#a2a8a3]">
                      .{transaction.price.split(".")[1]}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2.5">
                      <span className="flex size-8 items-center justify-center rounded-full bg-[#dfe8e1] text-xs font-semibold text-[#526358]">
                        {transaction.initials}
                      </span>
                      <span className="font-medium">
                        {transaction.customer}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-[#aaa]">
                    {transaction.date}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-xs font-bold italic ${transaction.method === "VISA" ? "text-[#3157a6]" : "text-[#c35a45]"}`}
                      >
                        {transaction.method}
                      </span>
                      <span className="text-sm text-[#aaa]">
                        **** {transaction.card}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-white">
                    {transaction.email}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </ShadcnTable>
        </div>
      </div>
      {visibleTransactions.length === 0 && (
        <p className="py-12 text-center text-sm text-[#aaa]">
          No transactions found.
        </p>
      )}
    </section>
  )
}
