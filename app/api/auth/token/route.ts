import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { code } = await request.json()

    if (!code) {
      return NextResponse.json({ error: "Authorization code is required" }, { status: 400 })
    }

    // PagBank token exchange configuration
    const CLIENT_ID = process.env.PAGBANK_CLIENT_ID
    const CLIENT_SECRET = process.env.PAGBANK_CLIENT_SECRET
    const REDIRECT_URI = process.env.PAGBANK_REDIRECT_URI
    const TOKEN = process.env.TOKEN

    if (!CLIENT_ID || !CLIENT_SECRET || !REDIRECT_URI) {
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 })
    }
    console.log({
      CLIENT_ID,
      CLIENT_SECRET,
      REDIRECT_URI
    });


    // Exchange authorization code for access token
    const tokenResponse = await fetch("https://sandbox.api.pagseguro.com/oauth2/token", {
      method: "POST",
      headers: {
        'content-type': 'application/json',
        accept: "application/json",
        Authorization: 'Bearer ' + TOKEN,
        'X_CLIENT_ID': CLIENT_ID,
        'client_id': CLIENT_ID,
        'client-secret': CLIENT_SECRET,
        'X_CLIENT_SECRET': CLIENT_SECRET,
      },
      body: JSON.stringify({
        grant_type: 'authorization_code',
        client_secret: CLIENT_SECRET,
        code: code,
        redirect_uri: REDIRECT_URI,
      })

    })

    const tokenData = await tokenResponse.json()
    console.log({ tokenData: tokenData });


    if (!tokenResponse.ok) {
      return NextResponse.json({ error: tokenData.error_description || "Token exchange failed" }, { status: 400 })
    }

    // Return the access token (in production, consider storing securely)
    return NextResponse.json({
      account_id: tokenData.account_id,
      access_token: tokenData.access_token,
      token_type: tokenData.token_type,
      expires_in: tokenData.expires_in,
      scope: tokenData.scope,
    })
  } catch (error) {
    console.error("Token exchange error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
