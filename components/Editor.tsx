'use client'

import Layers from './layers/layers'
import UploadImage from './upload/upload-image'

const Editor = () => {
  return (
    <div>
      <h1>Editor</h1>
      <UploadImage />
      <Layers />
    </div>
  )
}

export default Editor
