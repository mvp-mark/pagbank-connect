import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Code, ExternalLink, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-4">
            <ArrowLeft className="mr-1 h-3 w-3" />
            Voltar para o início
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Documentação de Integração</h1>
          <p className="text-gray-600">Aprenda como integrar com o PagBank Connect</p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Getting Started */}
          <Card>
            <CardHeader>
              <CardTitle>Primeiros Passos</CardTitle>
              <CardDescription>Siga estes passos para configurar a integração com o PagBank Connect</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="font-semibold">1. Cadastre sua aplicação</h3>
                  <p className="text-sm text-gray-600">
                    Crie uma nova aplicação no Portal do Desenvolvedor PagBank para obter suas credenciais de cliente.
                  </p>
                </div>
                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="font-semibold">2. Configure as variáveis de ambiente</h3>
                  <p className="text-sm text-gray-600">
                    Configure suas variáveis de ambiente com o client ID e o secret.
                  </p>
                </div>
                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="font-semibold">3. Implemente o fluxo OAuth</h3>
                  <p className="text-sm text-gray-600">Use o fluxo de código de autorização para obter tokens de acesso.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Environment Variables */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5" />
                Variáveis de Ambiente
              </CardTitle>
              <CardDescription>Variáveis de ambiente necessárias para sua aplicação</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-gray-100 p-4 rounded-lg font-mono text-sm">
                  <div className="space-y-1">
                    <div>PAGBANK_CLIENT_ID=seu_client_id</div>
                    <div>PAGBANK_CLIENT_SECRET=seu_client_secret</div>
                    <div>PAGBANK_REDIRECT_URI=http://localhost:3000/auth/callback</div>
                    <div>NEXT_PUBLIC_PAGBANK_CLIENT_ID=seu_client_id</div>
                    <div>NEXT_PUBLIC_REDIRECT_URI=http://localhost:3000/auth/callback</div>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  Substitua os valores de exemplo pelas credenciais reais da sua aplicação PagBank.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* API Endpoints */}
          <Card>
            <CardHeader>
              <CardTitle>Endpoints da API</CardTitle>
              <CardDescription>Principais endpoints da API PagBank usados nesta integração</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary">GET</Badge>
                    <code className="text-sm">https://connect.pagseguro.uol.com.br/oauth2/authorize</code>
                  </div>
                  <p className="text-sm text-gray-600">Endpoint de autorização para o fluxo OAuth</p>
                </div>
                <div className="border rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary">POST</Badge>
                    <code className="text-sm">https://api.pagseguro.com/oauth2/token</code>
                  </div>
                  <p className="text-sm text-gray-600">Endpoint de troca de token</p>
                </div>
                <div className="border rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary">GET</Badge>
                    <code className="text-sm">https://api.pagseguro.com/accounts/me</code>
                  </div>
                  <p className="text-sm text-gray-600">Obter informações da conta</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Code Examples */}
          <Card>
            <CardHeader>
              <CardTitle>Exemplos de Código</CardTitle>
              <CardDescription>Código de exemplo para cenários comuns de integração</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Fazendo Requisições à API</h3>
                  <div className="bg-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                    <pre>{`const response = await fetch('https://api.pagseguro.com/accounts/me', {
  headers: {
    'Authorization': \`Bearer \${accessToken}\`,
    'Accept': 'application/json',
  },
})

const accountData = await response.json()`}</pre>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Tratando Webhooks</h3>
                  <div className="bg-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                    <pre>{`export async function POST(request: NextRequest) {
  const signature = request.headers.get('x-pagbank-signature')
  const payload = await request.text()
  
  // Verificar assinatura do webhook
  if (!verifySignature(payload, signature)) {
    return NextResponse.json({ error: 'Assinatura inválida' }, { status: 401 })
  }
  
  // Processar dados do webhook
  const data = JSON.parse(payload)
  // Lidar com o evento do webhook...
  
  return NextResponse.json({ received: true })
}`}</pre>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* External Resources */}
          <Card>
            <CardHeader>
              <CardTitle>Recursos Externos</CardTitle>
              <CardDescription>Recursos e documentações adicionais</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 gap-4">
                <Button variant="outline" asChild>
                  <a
                    href="https://developer.pagbank.com.br/docs/connect-authorization"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Documentação Oficial
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <a
                    href="https://developer.pagbank.com.br/reference"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Referência da API
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <a
                    href="https://developer.pagbank.com.br/docs/webhooks"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Guia de Webhooks
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <a
                    href="https://developer.pagbank.com.br/support"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Central de Suporte
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
