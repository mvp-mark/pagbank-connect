import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Shield, Zap, CreditCard } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <CreditCard className="h-8 w-8 text-green-600" />
            <h1 className="text-3xl font-bold text-gray-900">PagBank Connect</h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Integre sua aplicação com os serviços de pagamento do PagBank de forma segura e eficiente
          </p>
        </header>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Authorization Card */}
            <Card className="border-2 border-green-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-green-600" />
                  Conecte sua conta
                </CardTitle>
                <CardDescription>Autorize sua aplicação a acessar os serviços do PagBank</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Badge variant="secondary" className="mb-2">
                    OAuth 2.0
                  </Badge>
                  <p className="text-sm text-gray-600">
                    Autorização segura utilizando o protocolo OAuth 2.0 padrão do mercado
                  </p>
                </div>
                <Link href="/auth/connect">
                  <Button className="w-full bg-green-600 hover:bg-green-700">Conectar com o PagBank</Button>
                </Link>
              </CardContent>
            </Card>

            {/* Features Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-blue-600" />
                  Recursos da Integração
                </CardTitle>
                <CardDescription>O que você recebe com o PagBank Connect</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Processamento de pagamentos</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Gerenciamento de transações</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Informações da conta</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Notificações em tempo real</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Status Section */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Status da Integração</CardTitle>
              <CardDescription>Estado atual da conexão com os serviços do PagBank</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 bg-red-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Não conectado</span>
              </div>
              <p className="text-sm text-gray-500 mt-2">Clique em "Conectar com o PagBank" para autorizar sua aplicação</p>
            </CardContent>
          </Card>

          {/* Documentation */}
          <Card>
            <CardHeader>
              <CardTitle>Documentação</CardTitle>
              <CardDescription>Saiba mais sobre a integração do PagBank Connect</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 gap-4">
                <Button variant="outline" asChild>
                  <a
                    href="https://connect.sandbox.pagseguro.uol.com.br/oauth2/authorize"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Documentação da API
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/docs">Guia de Integração</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
