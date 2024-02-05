'use client'

import ActiveImage from './active-image'
import Layers from './layers/layers'
import { ModeToggle } from './theme/mode-toggle'
import UploadImage from './upload/upload-image'

const Editor = () => {
  return (
    <div className="flex h-full">
      <div className="py-6 px-4 basis-[240px] shrink-0">
        <div className="pb-12 text-center">
          <ModeToggle />
        </div>
      </div>
      <UploadImage />
      <ActiveImage />
      <Layers />
    </div>
  )
}

export default Editor
