"use client"

import type React from "react"

import { useState, useCallback, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import dynamic from "next/dynamic"
import { Login } from "./components/Login"
import { History } from "./components/History"
import { Navbar } from "./components/Navbar"
import { Maximize2, Minimize2, Trash2 } from "lucide-react"

const CodeBlock = dynamic(() => import("./components/CodeBlock"), { ssr: false })
const ImagePreview = dynamic(() => import("./components/ImagePreview"), { ssr: false })

interface User {
  username: string
  token: string
}

interface HistoryItem {
  id: number
  prompt: string
  generated_code: string
  image_path: string | null
  created_at: string
}

export default function AICodeGenerator() {
  const [user, setUser] = useState<User | null>(null)
  const [prompt, setPrompt] = useState("")
  const [images, setImages] = useState<File[]>([])
  const [generatedCode, setGeneratedCode] = useState("")
  const [iframeContent, setIframeContent] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("generator")
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isPreviewLoading, setIsPreviewLoading] = useState(false)
  const [isCodeLoading, setIsCodeLoading] = useState(false)

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const handleLogin = (username: string, token: string) => {
    const newUser = { username, token }
    setUser(newUser)
    localStorage.setItem("user", JSON.stringify(newUser))
  }

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  const handlePromptChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(e.target.value)
  }, [])

  const handleImageUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files))
    }
  }, [])

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      if (!user) {
        alert("Please log in first")
        return
      }
      setIsLoading(true)
      setIsPreviewLoading(true)
      setIsCodeLoading(true)
      try {
        const formData = new FormData()
        formData.append("prompt", prompt)
        if (images.length > 0) {
          formData.append("image", images[0])
        }

        const response = await fetch("http://localhost:3001/api/code-generation/generate", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
          body: formData,
        })
        if (response.ok) {
          const data = await response.json()
          
          const trimmedCode = data.code
          .trim()
          .replace(/^```html\n/, "")
          .replace(/```$/, "")
          setIframeContent(trimmedCode)
          
          setGeneratedCode(' ' + trimmedCode)
        } else {
          alert("Failed to generate code")
        }
      } catch (error) {
        console.error("Error generating code:", error)
        alert("An error occurred while generating code")
      } finally {
        setIsLoading(false)
        setIsPreviewLoading(false)
        setIsCodeLoading(false)
      }
    },
    [prompt, images, user],
  )

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  const clearForm = () => {
    setPrompt("")
    setImages([])
    setGeneratedCode("")
    setIframeContent("")
  }

  const handleHistoryItemClick = (item: HistoryItem) => {
    setPrompt(item.prompt)
    setGeneratedCode(
      item.generated_code
      .trim()
      .replace(/^```html\n/, "")
      .replace(/```$/, ""),
    )
    setIframeContent(
      item.generated_code
        .trim()
        .replace(/^```html\n/, "")
        .replace(/```$/, ""),
    )
    setActiveTab("generator")
  }

  if (!user) {
    return <Login onLogin={handleLogin} />
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar username={user.username} onLogout={handleLogout} />
      <div className={`flex-grow container mx-auto p-4 ${isFullscreen ? "fixed inset-0 z-50 bg-background" : ""}`}>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="generator">Gerador de Código</TabsTrigger>
            <TabsTrigger value="history">Histórico</TabsTrigger>
          </TabsList>
          <TabsContent value="generator">
            <div className={`grid ${isFullscreen ? "grid-cols-1" : "grid-cols-1 lg:grid-cols-2"} gap-4`}>
              {!isFullscreen && (
                <Card className="w-full">
                  <CardHeader>
                    <CardTitle>Gerador de Código IA</CardTitle>
                  </CardHeader>
                  <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <label htmlFor="prompt" className="text-sm font-medium">
                          Descreva suas necessidades:
                        </label>
                        <Textarea
                          id="prompt"
                          placeholder="Digite aqui as especificações do software..."
                          value={prompt}
                          onChange={handlePromptChange}
                          className="min-h-[100px]"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="image-upload" className="text-sm font-medium">
                          Upload de Protótipos:
                        </label>
                        <div className="flex flex-col sm:flex-row gap-4">
                          <input
                            id="image-upload"
                            type="file"
                            accept="image/*"
                            name="image"
                            onChange={handleImageUpload}
                            className="w-full sm:w-1/2 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                          />
                          <div className="w-full sm:w-1/2">
                            <ImagePreview images={images} />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button type="submit" disabled={isLoading} className="w-full">
                        {isLoading ? "Gerando Código..." : "Gerar Código"}
                      </Button>
                      <Button type="button" variant="outline" onClick={clearForm} className="w-full">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Limpar Formulário
                      </Button>
                    </CardFooter>
                  </form>
                </Card>
              )}
              <Card className="w-full">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Resultado</CardTitle>
                  <Button variant="ghost" size="icon" onClick={toggleFullscreen}>
                    {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                  </Button>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="preview">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="preview">Preview</TabsTrigger>
                      <TabsTrigger value="code">Código</TabsTrigger>
                    </TabsList>
                    <TabsContent value="preview">
                      {isPreviewLoading ? (
                        <div className="w-full h-screen flex items-center justify-center">
                          <span className="loading loading-spinner loading-lg"></span>
                        </div>
                      ) : (
                        iframeContent ?
                        <iframe
                          srcDoc={iframeContent}
                          title="Preview"
                          className={`w-full border-2 border-gray-200 rounded-md ${iframeContent ? "h-screen" : ""}`}
                        /> : <img src="/placeholder.jpg" alt="Placeholder" className="mx-auto" width={200} />
                      )}
                    </TabsContent>
                    <TabsContent value="code">
                      {isCodeLoading ? (
                        <div className="w-full h-screen flex items-center justify-center">
                          <span className="loading loading-spinner loading-lg"></span>
                        </div>
                      ) : (
                        <CodeBlock code={generatedCode} />
                      )}
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="history">
            <History token={user.token} onItemClick={handleHistoryItemClick} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

