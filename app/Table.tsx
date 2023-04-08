import { use } from "react"
import { readFile, utils } from "xlsx"


type Table = string[][]


async function getData(): Promise<Table> {
  const workbook = readFile("public/spreadsheet.xlsx")
  const worksheet = workbook.Sheets[workbook.SheetNames[0]]

  return utils.sheet_to_json(worksheet, { header: 1 })
}


export default function Table() {
  const data = use(getData())

  return (
    <table>
      <tbody>
        {data.map((row, i) => (
          <tr key={i}>
            {row.map((col, i) => (
              <td key={i}>{col}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
