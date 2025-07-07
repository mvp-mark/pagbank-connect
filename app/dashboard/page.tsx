"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, CreditCard, DollarSign, Activity, LogOut, RefreshCw } from "lucide-react"
import Link from "next/link"

interface AccountInfo {
  id: string
  name: string
  email: string
  status: string
}

export default function DashboardPage() {
  const [accountInfo, setAccountInfo] = useState<AccountInfo | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem("pagbank_access_token")
    console.log("Access Token:", JSON.parse(token!));

    if (!token) {
      router.push("/auth/connect")
      return
    }

    fetchAccountInfo(token)
  }, [router])

  const fetchAccountInfo = async (token: string) => {
    try {
      setIsLoading(true)
      const response = await fetch(`/api/account/info`, {
        headers: {
          account_id: JSON.parse(token!).account_id,
          access_token: JSON.parse(token!).access_token,
        },
      })

      if (response.ok) {
        const data = await response.json()
        setAccountInfo(data)
      } else {
        setError("Falha ao buscar informações da conta")
      }
    } catch (err) {
      setError("Erro ao buscar informações da conta")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDisconnect = () => {
    localStorage.removeItem("pagbank_access_token")
    router.push("/")
  }

  const handleRefresh = () => {
    const token = localStorage.getItem("pagbank_access_token")
    if (token) {
      fetchAccountInfo(token)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto text-blue-600 mb-4" />
          <p>Carregando painel...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Painel do PagBank</h1>
            <p className="text-gray-600">Gerencie sua integração com o PagBank</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleRefresh}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Atualizar
            </Button>
            <Button variant="outline" onClick={handleDisconnect}>
              <LogOut className="h-4 w-4 mr-2" />
              Desconectar
            </Button>
          </div>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Connection Status */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              Status da Conexão
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 bg-green-500 rounded-full"></div>
              <span className="text-sm font-medium">Conectado ao PagBank</span>
              <Badge variant="secondary">Ativo</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Account Information */}
        {accountInfo && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Informações da Conta</CardTitle>
              <CardDescription>Detalhes da sua conta PagBank conectada</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">ID da Conta</label>
                  <p className="text-sm">{accountInfo.id}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Nome</label>
                  <p className="text-sm">{accountInfo.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Email</label>
                  <p className="text-sm">{accountInfo.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Status</label>
                  
                    <Badge variant={accountInfo.status.toLocaleLowerCase() === "active" ? "default" : "secondary"}>
                      {accountInfo.status}
                    </Badge>
                  
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-blue-600" />
                Pagamentos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">Processe e gerencie pagamentos</p>
              <Button variant="outline" className="w-full bg-transparent">
                Ver Pagamentos
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-green-600" />
                Transações
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">Monitore o histórico de transações</p>
              <Button variant="outline" className="w-full bg-transparent">
                Ver Transações
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-purple-600" />
                Análises
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">Veja as métricas de desempenho</p>
              <Button variant="outline" className="w-full bg-transparent">
                Ver Análises
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* API Information */}
        <Card>
          <CardHeader>
            <CardTitle>Integração com a API</CardTitle>
            <CardDescription>Use estes endpoints para integrar com os serviços do PagBank</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <label className="font-medium text-gray-500">URL Base</label>
                  <p className="font-mono bg-gray-100 p-2 rounded">https://api.pagseguro.com</p>
                </div>
                <div>
                  <label className="font-medium text-gray-500">Versão da API</label>
                  <p className="font-mono bg-gray-100 p-2 rounded">v1</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" asChild>
                  <a href="https://developer.pagbank.com.br/docs" target="_blank" rel="noopener noreferrer">
                    Documentação da API
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/docs">Exemplos de Integração</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
