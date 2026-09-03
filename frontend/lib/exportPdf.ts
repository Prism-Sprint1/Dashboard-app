import { jsPDF } from "jspdf"
import autoTable from "jspdf-autotable"

interface Transaction {
  id: string
  product: string
  detail: string
  price: string
  customer: string
  date: string
  method: string
  card: string
  email: string
}
export function exportToPdf(rows: Transaction[], filename: string) {
  const doc = new jsPDF({ orientation: "landscape" })

  doc.setFontSize(14)
  doc.text("Recent Transaction", 14, 15)

  autoTable(doc, {
    startY: 22,
    head: [
      [
        "Order ID",
        "Product",
        "Detail",
        "Price",
        "Customer",
        "Date",
        "Method",
        "Card",
        "Email",
      ],
    ],
    body: rows.map((t) => [
      t.id,
      t.product,
      t.detail,
      `$${t.price}`,
      t.customer,
      t.date,
      t.method,
      `**** ${t.card}`,
      t.email,
    ]),
    styles: { fontSize: 8, cellPadding: 3 },
    headStyles: { fillColor: [32, 33, 42] },
  })

  doc.save(filename)
}
