'use client'

import { Layer } from '@/lib/layer-store'
import Image from 'next/image'

export default function LayerImage({ layer }: { layer: Layer }) {
  if (layer.url && layer.name)
    return (
      <div className="w-12 h-12 flex items-center justify-center">
        <Image
          className="w-12 h12 object-contain h-full rounded-sm"
          alt={layer.name}
          src={layer.format === 'mp4' ? layer.poster || layer.url : layer.url}
          width={50}
          height={50}
        />
      </div>
    )
}
