import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const authorization = request.headers.get("authorization")

    if (!authorization || !authorization.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Authorization token required" }, { status: 401 })
    }

    const token = authorization.split(" ")[1] || process.env.TOKEN

    // Fetch account information from PagBank API
    const accountResponse = await fetch("https://sandbox.api.pagseguro.com/accounts/me", {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    })

    if (!accountResponse.ok) {
      return NextResponse.json({ error: "Failed to fetch account information" }, { status: accountResponse.status })
    }

    const accountData = await accountResponse.json()

    // Return formatted account information
    return NextResponse.json({
      id: accountData.id || "N/A",
      name: accountData.name || "N/A",
      email: accountData.email || "N/A",
      status: accountData.status || "active",
    })
  } catch (error) {
    console.error("Account info error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
