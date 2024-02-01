'use client'

import { uploadImage } from '@/server/upload-image'
import { useDropzone } from 'react-dropzone'

export default function UploadImage() {
  const {} = useDropzone({
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

        //state management to create layers, set the active layer, set the image as the active layer
        const res = await uploadImage({ image: formData })
      }
    },
  })
  return (
    <div>
      <h1>Upload image</h1>
    </div>
  )
}
