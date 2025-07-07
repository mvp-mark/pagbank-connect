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
            Back to home
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Integration Documentation</h1>
          <p className="text-gray-600">Learn how to integrate with PagBank Connect</p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Getting Started */}
          <Card>
            <CardHeader>
              <CardTitle>Getting Started</CardTitle>
              <CardDescription>Follow these steps to set up PagBank Connect integration</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="font-semibold">1. Register Your Application</h3>
                  <p className="text-sm text-gray-600">
                    Create a new application in the PagBank Developer Portal to get your client credentials.
                  </p>
                </div>
                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="font-semibold">2. Configure Environment Variables</h3>
                  <p className="text-sm text-gray-600">
                    Set up your environment variables with the client ID and secret.
                  </p>
                </div>
                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="font-semibold">3. Implement OAuth Flow</h3>
                  <p className="text-sm text-gray-600">Use the authorization code flow to obtain access tokens.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Environment Variables */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5" />
                Environment Variables
              </CardTitle>
              <CardDescription>Required environment variables for your application</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-gray-100 p-4 rounded-lg font-mono text-sm">
                  <div className="space-y-1">
                    <div>PAGBANK_CLIENT_ID=your_client_id</div>
                    <div>PAGBANK_CLIENT_SECRET=your_client_secret</div>
                    <div>PAGBANK_REDIRECT_URI=http://localhost:3000/auth/callback</div>
                    <div>NEXT_PUBLIC_PAGBANK_CLIENT_ID=your_client_id</div>
                    <div>NEXT_PUBLIC_REDIRECT_URI=http://localhost:3000/auth/callback</div>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  Replace the placeholder values with your actual PagBank application credentials.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* API Endpoints */}
          <Card>
            <CardHeader>
              <CardTitle>API Endpoints</CardTitle>
              <CardDescription>Key PagBank API endpoints used in this integration</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary">GET</Badge>
                    <code className="text-sm">https://connect.pagseguro.uol.com.br/oauth2/authorize</code>
                  </div>
                  <p className="text-sm text-gray-600">Authorization endpoint for OAuth flow</p>
                </div>
                <div className="border rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary">POST</Badge>
                    <code className="text-sm">https://api.pagseguro.com/oauth2/token</code>
                  </div>
                  <p className="text-sm text-gray-600">Token exchange endpoint</p>
                </div>
                <div className="border rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary">GET</Badge>
                    <code className="text-sm">https://api.pagseguro.com/accounts/me</code>
                  </div>
                  <p className="text-sm text-gray-600">Get account information</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Code Examples */}
          <Card>
            <CardHeader>
              <CardTitle>Code Examples</CardTitle>
              <CardDescription>Sample code for common integration scenarios</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Making API Requests</h3>
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
                  <h3 className="font-semibold mb-2">Handling Webhooks</h3>
                  <div className="bg-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                    <pre>{`export async function POST(request: NextRequest) {
  const signature = request.headers.get('x-pagbank-signature')
  const payload = await request.text()
  
  // Verify webhook signature
  if (!verifySignature(payload, signature)) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
  }
  
  // Process webhook data
  const data = JSON.parse(payload)
  // Handle the webhook event...
  
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
              <CardTitle>External Resources</CardTitle>
              <CardDescription>Additional resources and documentation</CardDescription>
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
                    Official Documentation
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
                    API Reference
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
                    Webhooks Guide
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
                    Support Center
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
