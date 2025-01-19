import { useState, useCallback } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { Button } from "@/components/ui/button"
import { ClipboardCopy } from 'lucide-react'

interface CodeBlockProps {
  code: string
}

export default function CodeBlock({ code }: CodeBlockProps) {
  const [isCopied, setIsCopied] = useState(false)

  const copyToClipboard = useCallback(() => {
    navigator.clipboard.writeText(code).then(() => {
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    })
  }, [code])

  return (
    <div className="relative">
      <div className="absolute top-2 right-2 z-10">
        <Button
          variant="outline"
          size="sm"
          onClick={copyToClipboard}
          className="flex items-center gap-2"
        >
          <ClipboardCopy className="h-4 w-4" />
          {isCopied ? 'Copiado!' : 'Copiar'}
        </Button>
      </div>
      {code ? (
        <SyntaxHighlighter 
          language="javascript" 
          style={vscDarkPlus}
          className="rounded-md"
        >
          {code}
        </SyntaxHighlighter>
      ) : (
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md text-gray-500 dark:text-gray-400">
          O código gerado será exibido aqui.
        </div>
      )}
    </div>
  )
}

