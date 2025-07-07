"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, XCircle, Loader2 } from "lucide-react"
import Link from "next/link"

export default function CallbackPage() {
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading")
  const [message, setMessage] = useState("")
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const handleCallback = async () => {
      const code = searchParams.get("code")
      const state = searchParams.get("state")
      const error = searchParams.get("error")
      const storedState = localStorage.getItem("pagbank_oauth_state")

      // Handle authorization error
      if (error) {
        setStatus("error")
        setMessage(`Falha na autorização: ${error}`)
        return
      }

      // Validate state parameter
      if (!state || state !== storedState) {
        setStatus("error")
        setMessage("Parâmetro de estado inválido. Possível ataque CSRF.")
        return
      }

      // Handle missing authorization code
      if (!code) {
        setStatus("error")
        setMessage("Código de autorização não recebido.")
        return
      }

      try {
        // Exchange authorization code for access token
        const response = await fetch("/api/auth/token", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ code }),
        })

        const data = await response.json()

        if (response.ok) {
          setStatus("success")
          setMessage("Conexão com o PagBank realizada com sucesso!")
          setAccessToken(data.access_token)

          // Store token securely (in a real app, use httpOnly cookies)
          localStorage.setItem("pagbank_access_token", JSON.stringify(data))

          // Clean up state
          localStorage.removeItem("pagbank_oauth_state")

          // Redirect to dashboard after 3 seconds
          setTimeout(() => {
            router.push("/dashboard")
          }, 3000)
        } else {
          setStatus("error")
          setMessage(data.error || "Falha ao trocar o código de autorização")
        }
      } catch (err) {
        setStatus("error")
        setMessage("Ocorreu um erro de rede durante a troca do token")
      }
    }

    handleCallback()
  }, [searchParams, router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Status da Autorização</CardTitle>
            <CardDescription>Processando sua conexão com o PagBank</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {status === "loading" && (
              <div className="text-center space-y-4">
                <Loader2 className="h-8 w-8 animate-spin mx-auto text-blue-600" />
                <p className="text-sm text-gray-600">Processando autorização...</p>
              </div>
            )}

            {status === "success" && (
              <div className="text-center space-y-4">
                <CheckCircle className="h-8 w-8 mx-auto text-green-600" />
                <Alert className="border-green-200 bg-green-50">
                  <AlertDescription className="text-green-800">{message}</AlertDescription>
                </Alert>
                <p className="text-sm text-gray-600">Redirecionando para o painel...</p>
                <Link href="/dashboard">
                  <Button className="w-full bg-green-600 hover:bg-green-700">Ir para o Painel</Button>
                </Link>
              </div>
            )}

            {status === "error" && (
              <div className="text-center space-y-4">
                <XCircle className="h-8 w-8 mx-auto text-red-600" />
                <Alert variant="destructive">
                  <AlertDescription>{message}</AlertDescription>
                </Alert>
                <div className="space-y-2">
                  <Link href="/auth/connect">
                    <Button variant="outline" className="w-full bg-transparent">
                      Tentar Novamente
                    </Button>
                  </Link>
                  <Link href="/">
                    <Button variant="ghost" className="w-full">
                      Voltar para a Página Inicial
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
