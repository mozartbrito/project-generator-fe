import Image from 'next/image'

interface ImagePreviewProps {
  images: File[]
}

export default function ImagePreview({ images }: ImagePreviewProps) {
  if (images.length === 0) {
    return <div className="text-sm text-gray-500">Nenhuma imagem selecionada</div>
  }

  return (
    <div className="grid grid-cols-2 gap-2">
      {images.map((image, index) => (
        <div key={index} className="relative h-20 w-full">
          <Image
            src={URL.createObjectURL(image)}
            alt={`Prototype ${index + 1}`}
            layout="fill"
            objectFit="cover"
            className="rounded-md"
          />
        </div>
      ))}
    </div>
  )
}

