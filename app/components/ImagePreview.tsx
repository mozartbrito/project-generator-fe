import Image from 'next/image'

interface ImagePreviewProps {
  images: File[]
}

export default function ImagePreview({ images }: ImagePreviewProps) {
  if (images.length === 0) {
    return <div className="text-sm text-gray-500"></div>
  }

  return (
    <div className="">
      {images.map((image, index) => (
        <div key={index} className="relative h-32 w-32 md:h-48 md:w-48 lg:h-64 lg:w-64">
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

