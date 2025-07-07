import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    // console.log("Webhook received", request);
    // make a console.log of request body
    const body = await request.json()
    console.log("Webhook body:", body)


      return NextResponse.json({ message: "ok"}, { status: 200 })
  } catch (error) {


  }
}
