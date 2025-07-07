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
            Integrate your application with PagBank's payment services securely and efficiently
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
                  Connect Your Account
                </CardTitle>
                <CardDescription>Authorize your application to access PagBank services</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Badge variant="secondary" className="mb-2">
                    OAuth 2.0
                  </Badge>
                  <p className="text-sm text-gray-600">
                    Secure authorization using industry-standard OAuth 2.0 protocol
                  </p>
                </div>
                <Link href="/auth/connect">
                  <Button className="w-full bg-green-600 hover:bg-green-700">Connect with PagBank</Button>
                </Link>
              </CardContent>
            </Card>

            {/* Features Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-blue-600" />
                  Integration Features
                </CardTitle>
                <CardDescription>What you get with PagBank Connect</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Payment processing</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Transaction management</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Account information</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Real-time notifications</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Status Section */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Integration Status</CardTitle>
              <CardDescription>Current connection status with PagBank services</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 bg-red-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Not connected</span>
              </div>
              <p className="text-sm text-gray-500 mt-2">Click "Connect with PagBank" to authorize your application</p>
            </CardContent>
          </Card>

          {/* Documentation */}
          <Card>
            <CardHeader>
              <CardTitle>Documentation</CardTitle>
              <CardDescription>Learn more about PagBank Connect integration</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 gap-4">
                <Button variant="outline" asChild>
                  <a
                    href="https://connect.sandbox.pagseguro.uol.com.br/oauth2/authorize"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    API Documentation
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/docs">Integration Guide</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
