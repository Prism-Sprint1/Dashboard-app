import Papa from "papaparse"

export function exportToCsv<T extends Record<string, unknown>>(
  rows: T[],
  filename: string
) {
  if (rows.length === 0) return

  // Papa.unparse(rows) 가 객체 배열을 CSV 문자열로 변환합니다. 이때, 객체의 키가 CSV의 헤더로 사용됩니다.
  const csv = Papa.unparse(rows)

  // \uFEFF는 UTF-8 BOM(Byte Order Mark)으로, Excel에서 CSV 파일을 열 때 한글이 깨지지 않도록 하기 위해 추가합니다.
  const blob = new Blob(["\uFEFF" + csv], {
    type: "text/csv;charset=utf-8;",
  })

  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.setAttribute("download", filename)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
