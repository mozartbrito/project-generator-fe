import type React from "react"
import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import config from "@/config"

const apiUrl = config.apiBaseUrl;
interface LoginProps {
  onLogin: (username: string, token: string) => void
}

export function Login({ onLogin }: LoginProps) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const response = await fetch(`${apiUrl}/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      })
      if (response.ok) {
        const data = await response.json()
        onLogin(data.username, data.token)
      } else {
        const data = await response.json()
        setError(data.error || "Credenciais inválidas. Por favor, tente novamente.")
      }
    } catch (error) {
        console.error("Login error:", error)
        setError("Ocorreu um erro durante o login. Por favor, tente novamente.")
    } finally {
        setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen w-full flex">
      <div className="hidden lg:flex lg:w-1/2 relative bg-muted">
        <Image src="/photo-cabedelo.jpg?height=1080&width=1920" alt="Background" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-white text-center space-y-4">
            <h1 className="text-4xl font-bold">Generator Project <small>(Using AI)</small></h1>
            <p className="text-lg">Transforme suas ideias em código com IA</p>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center space-y-2 flex justify-center items-center gap-2">
            <Image src="/icon.png?&width=200" alt="Icon" width={50} height={50}  className="object-cover" priority />
            <h2 className="text-3xl font-bold">Generator Project</h2>
            <p className="text-muted-foreground">(Using AI)</p>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "A iniciar sessão..." : "Login"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

