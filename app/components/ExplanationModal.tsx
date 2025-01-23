import type React from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import ReactMarkdown from "react-markdown"

interface ExplanationModalProps {
  isOpen: boolean
  onClose: () => void
  explanation: string
}

const ExplanationModal: React.FC<ExplanationModalProps> = ({ isOpen, onClose, explanation }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Explicação da Solução</DialogTitle>
          <DialogDescription>Detalhes sobre o código gerado</DialogDescription>
        </DialogHeader>
        <div className="mt-4 prose prose-sm max-w-none">
          <ReactMarkdown>{explanation}</ReactMarkdown>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ExplanationModal

