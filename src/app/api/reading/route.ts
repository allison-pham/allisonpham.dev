import { google } from "googleapis"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\n/g, "\n"),
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    })

    const sheets = google.sheets({ version: "v4", auth })
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEETS_SHEET_ID,
      range: "Sheet1!A2:K",
    })

    const books = (res.data.values ?? []).map(row => ({
      id: row[0]?.toLowerCase().replace(/\s+/g, "-") ?? "",
      title:       row[0] ?? "",
      author:      row[1] ?? "",
      status:      row[2] ?? "queue",
      progress:    Number(row[3]) || 0,
      rating:      row[4] ? Number(row[4]) : null,
      category:    row[5] ?? "",
      started:     row[6] ?? null,
      finished:    row[7] ?? null,
      coverColor:  row[8] || "#a8d8ea",
      note:        row[9] ?? "",
      environment: row[10] ?? null,
      concepts:    row[11] ? row[11].split(",").map((s: string) => s.trim()) : [],
    }))

    return NextResponse.json(books, {
      headers: { "Cache-Control": "s-maxage=60, stale-while-revalidate" }
    })
  } catch (e) {
    return NextResponse.json([], { status: 500 })
  }
}