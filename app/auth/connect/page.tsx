"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2, ExternalLink, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function ConnectPage() {
  const [isConnecting, setIsConnecting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  // PagBank Connect configuration
  const PAGBANK_CLIENT_ID = process.env.NEXT_PUBLIC_PAGBANK_CLIENT_ID || "your_client_id"
  const REDIRECT_URI = process.env.NEXT_PUBLIC_REDIRECT_URI || `${window.location.origin}/auth/callback`
  const SCOPE = "payments.read payments.create payments.refund accounts.read payments.split.read checkout.create checkout.view checkout.update"
  const handleConnect = () => {
    setIsConnecting(true)
    setError(null)

    try {
      // Build PagBank authorization URL
      const authUrl = new URL("https://connect.sandbox.pagbank.com.br/oauth2/authorize")
      authUrl.searchParams.set("response_type", "code")
      authUrl.searchParams.set("client_id", PAGBANK_CLIENT_ID)
      authUrl.searchParams.set("redirect_uri", REDIRECT_URI)
      authUrl.searchParams.set("scope", SCOPE)
      authUrl.searchParams.set("state", generateState())

      // Store state in localStorage for validation
      localStorage.setItem("pagbank_oauth_state", authUrl.searchParams.get("state") || "")

      // Redirect to PagBank authorization
      window.location.href = authUrl.toString()
    } catch (err) {
      setError("Failed to initiate connection. Please try again.")
      setIsConnecting(false)
    }
  }

  const generateState = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Connect to PagBank</CardTitle>
            <CardDescription>Authorize your application to access PagBank services</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-4">
              <div className="text-sm text-gray-600">
                <p className="font-medium mb-2">This integration will allow:</p>
                <ul className="space-y-1 text-xs">
                  <li>• Read payment information</li>
                  <li>• Process payments</li>
                  <li>• Access account details</li>
                  <li>• Receive transaction notifications</li>
                </ul>
              </div>

              <Button
                onClick={handleConnect}
                disabled={isConnecting}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                {isConnecting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Connecting...
                  </>
                ) : (
                  <>
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Authorize with PagBank
                  </>
                )}
              </Button>

              <div className="text-center">
                <Link href="/" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700">
                  <ArrowLeft className="mr-1 h-3 w-3" />
                  Back to home
                </Link>
              </div>
            </div>

            <div className="text-xs text-gray-500 text-center">
              You will be redirected to PagBank's secure authorization page
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
