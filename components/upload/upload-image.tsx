'use client'

import { uploadImage } from '@/server/upload-image'
import { useDropzone } from 'react-dropzone'
import { Card, CardContent } from '../ui/card'
import { cn } from '@/lib/utils'
import { useImageStore } from '@/lib/image-store'
import { useLayerStore } from '@/lib/layer-store'

export default function UploadImage() {
  const { setGenerating } = useImageStore((state) => state)
  const { activeLayer, updateLayer, setActiveLayer } = useLayerStore(
    (state) => state
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    maxFiles: 1,
    accept: {
      'image/png': ['.png'],
      'image/jpg': ['.jpg'],
      'image/webp': ['.webp'],
      'image/jpeg': ['.jpeg'],
    },
    onDrop: async (acceptFiles, fileRejections) => {
      if (acceptFiles.length) {
        const formData = new FormData()
        formData.append('image', acceptFiles[0])
        const objectUrl = URL.createObjectURL(acceptFiles[0])
        setGenerating(true)
        updateLayer({
          id: activeLayer.id,
          url: objectUrl,
          width: 0,
          height: 0,
          name: 'uploading',
          publicId: '',
          format: '',
          resourceType: 'image',
        })
        setActiveLayer(activeLayer.id)

        //state management to create layers, set the active layer, set the image as the active layer
        const res = await uploadImage({ image: formData })
        if (res?.data?.success) {
          const updatedLayer = res.data.success
          updateLayer({
            id: activeLayer.id,
            url: updatedLayer.url,
            width: updatedLayer.width,
            height: updatedLayer.height,
            name: updatedLayer.original_filename,
            publicId: updatedLayer.public_id,
            format: updatedLayer.format,
            resourceType: updatedLayer.resource_type,
          })
          setActiveLayer(activeLayer.id)
          setGenerating(false)
        }

        if (res?.data?.error) {
          setGenerating(false)
        }
      }
    },
  })
  return (
    <Card
      className={cn(
        'hover:cursor-pointer hover:bg-secondary hover:border-rpimary transition-all ease-in-out',
        `${isDragActive ? 'animate-pulse border-primary bg-secondary' : ''}`
      )}
      {...getRootProps()}
    >
      <CardContent className="flex flex-col h-full items-center justify-center px-2 py-24 text-xs">
        <input {...getInputProps()} type="text" />
        <div className="flex items-center flex-col justify-center gap-2">
          <p className="text-muted-foreground text-2xl">
            {isDragActive
              ? 'drop your image here!'
              : 'Start by uploading an image '}
          </p>
          <p className="text-muted-foreground">
            Supported formats .jpeg .png .webp .jpg
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
