'use client'

import { uploadImage } from '@/server/upload-image'
import { useDropzone } from 'react-dropzone'
import { Card, CardContent } from '../ui/card'

export default function UploadImage() {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    maxFiles: 1,
    accept: {
      'image/png': ['.png'],
      'image/jpg': ['.jpg'],
      'image/webp': ['.webp'],
      'image/jpeg': ['.jpeg'],
    },
    onDrop: async (acceptFiles, fileRejections) => {
      if (fileRejections) console.log(fileRejections)
      if (acceptFiles.length) {
        const formData = new FormData()
        formData.append('image', acceptFiles[0])
        // const objectUrl = URL.createObjectURL(acceptFiles[0])

        //state management to create layers, set the active layer, set the image as the active layer
        const res = await uploadImage({ image: formData })
        console.log(res)
        console.log(process.env.CLOUDINARY_NAME)
      }
    },
  })
  return (
    <Card {...getRootProps()}>
      <CardContent>
        <input {...getInputProps()} type="text" />
        <div>
          <h1>Cool animation</h1>
          <p>
            {isDragActive
              ? 'drop your image here!'
              : 'Start by uploading an image '}
          </p>
          <p>Supported formats .jpeg .png .webp .jpg</p>
        </div>
      </CardContent>
    </Card>
  )
}
