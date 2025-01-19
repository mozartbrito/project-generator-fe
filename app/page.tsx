'use client'

import { useState, useCallback } from 'react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CodeBlock from './components/CodeBlock'
import ImagePreview from './components/ImagePreview'

export default function AICodeGenerator() {
  const [prompt, setPrompt] = useState('')
  const [images, setImages] = useState<File[]>([])
  const [generatedCode, setGeneratedCode] = useState('')
  const [iframeContent, setIframeContent] = useState('')

  const handlePromptChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(e.target.value)
  }, [])

  const handleImageUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files))
    }
  }, [])

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Simular a geração de código e conteúdo do iframe
    // Na prática, você faria uma chamada para sua API de IA aqui
    setGeneratedCode(`function App() {
  return <h1>Hello, ${prompt}</h1>;
}`)
    setIframeContent(`<html><body><h1>Hello, ${prompt}</h1></body></html>`)
  }, [prompt])

  return (
    <div className="container mx-auto p-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
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
                  multiple
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
            <Button type="submit" className="w-full">
              Gerar Código
            </Button>
          </CardFooter>
        </form>
      </Card>

      <Card className="w-full">
        <CardHeader>
          <CardTitle>Resultado</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="code">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="code">Código</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
            </TabsList>
            <TabsContent value="code">
              <CodeBlock code={generatedCode} />
            </TabsContent>
            <TabsContent value="preview">
              <iframe
                srcDoc={iframeContent}
                title="Preview"
                className="w-full h-64 border-2 border-gray-200 rounded-md"
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

