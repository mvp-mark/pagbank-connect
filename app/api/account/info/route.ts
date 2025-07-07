import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const access_token = request.headers.get("access_token")
    const account_id = request.headers.get("account_id")

    // if (!authorization || !authorization.startsWith("Bearer ")) {
    //   return NextResponse.json({ error: "Authorization token required" }, { status: 401 })
    // }

    const token = process.env.TOKEN

    // Fetch account information from PagBank API
    const headers: Record<string, string> = {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    }
    if (access_token) {
      headers['x-client-token'] = access_token
    }

    const accountResponse = await fetch("https://sandbox.api.pagseguro.com/accounts/"+ account_id, {
      headers,
    })

    if (!accountResponse.ok) {
      return NextResponse.json({ error: "Failed to fetch account information" }, { status: accountResponse.status })
    }

    const accountData = await accountResponse.json()

    // Return formatted account information
    return NextResponse.json({
      id: accountData.id || "N/A",
      name: accountData.person.name || "N/A",
      email: accountData.email || "N/A",
      status: accountData.status || "active",
    })
  } catch (error) {
    console.error("Account info error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
