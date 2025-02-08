import type React from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"

interface ExplanationModalProps {
  isOpen: boolean
  onClose: () => void
}

const ExplanationModal: React.FC<ExplanationModalProps> = ({ isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Sobre o projecto</DialogTitle>
          <DialogDescription>Detalhes sobre funcionamento e vantagens</DialogDescription>
        </DialogHeader>
        <div className="markdown prose w-full break-words dark:prose-invert dark text-justify">
            <p><strong>Gerador de Interfaces em HTML com IA</strong></p>
            <p>Este projeto utiliza Inteligência Artificial para criar interfaces HTML a partir de protótipos e descrições de necessidades fornecidas pelos utilizadores. O processo é simples e altamente personalizável:</p>
            <ol>
                <li><strong>Envio do Protótipo</strong>: O utilizador pode fornecer um protótipo (imagem, wireframe ou esboço) como base para a geração do código.</li>
                <li><strong>Anotações em Vermelho</strong>: Caso o protótipo inclua anotações ou observações específicas (como alterações, interacções ou estilos adicionais), estas devem ser feitas na cor vermelha para que o sistema as identifique facilmente.</li>
                <li><strong>Geração Automática</strong>: A IA analisa o protótipo e as descrições associadas, gerando automaticamente o código HTML semântico e estilizado.</li>
                <li><strong>Estilo com TailwindCSS</strong>: Por predefinição, as interfaces geradas utilizam o framework <strong>TailwindCSS</strong> para a estilização, garantindo um design moderno e responsivo.
                    <ul>
                        <li>Caso o utilizador prefira outro framework (como Bootstrap, Material-UI ou Bulma), basta indicar essa necessidade na descrição, e o sistema ajustará o código gerado para usar a biblioteca pretendida.</li>
                    </ul>
                </li>
            </ol>
            
            <h3>Benefícios:</h3>
            
            <ul>
                <li><strong>Rapidez no Desenvolvimento</strong>: Reduz o tempo gasto na criação manual de interfaces.</li>
                <li><strong>Personalização</strong>: Permite ajustes e personalizações específicas de acordo com as preferências do utilizador.</li>
                <li><strong>Flexibilidade</strong>: Compatível com diferentes frameworks CSS e estilos visuais.</li>
                <li><strong>Precisão</strong>: Reconhece e aplica anotações feitas no protótipo para responder às necessidades descritas.</li>
            </ul>
            
            <p>Este gerador de interfaces é ideal para programadores, designers e equipas que pretendem acelerar o desenvolvimento front-end, mantendo um elevado nível de personalização e controlo sobre o design final.</p>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ExplanationModal

