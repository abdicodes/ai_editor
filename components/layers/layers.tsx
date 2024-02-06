'use client'

import { useLayerStore } from '@/lib/layer-store'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card'
import { cn } from '@/lib/utils'
import { useImageStore } from '@/lib/image-store'
import { Button } from '../ui/button'
import { Layers2 } from 'lucide-react'
import LayerImage from './layer-image'
import LayerInfo from './layer-info'

export default function Layers() {
  const { layers, setActiveLayer, addLayer, activeLayer } = useLayerStore(
    (state) => state
  )
  const { name, width, height, id } = useLayerStore(
    (state) => state.activeLayer
  )
  const generating = useImageStore((state) => state.generating)

  return (
    <Card
      className=" basis-[320px] shrink-0 scrollbar-thin scrollbar-track-secondary
        overflow-y-scroll scrollbar-thumb-primary scrollbar-thumb-rounded-full
        scrollbar-track-rounded-full overflow-x-hidden relative flex flex-col shadow-2xl"
    >
      <CardHeader className="sticky top-0 z-50 px-4 py-6 min-h-24 bg-card shadow-sm">
        <div>
          <CardTitle className="text-sm">{name || 'Layers'}</CardTitle>

          {width && height ? (
            <CardDescription>{`${width}x${height}`}</CardDescription>
          ) : null}
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col ">
        {layers.map((layer, index) => (
          <div
            key={layer.id}
            className={cn(
              'cursor-pointer ease-in-out hover:bg-secondary border border-transparent',
              {
                'animate-pulse': generating,
                'border-primary rounded-lg ': id === layer.id,
              }
            )}
            onClick={() => {
              if (generating) return
              setActiveLayer(layer.id)
            }}
          >
            <div className="relative p-4 flex items-center">
              <div className="flex gap-2 items-center h-8 w-full justify-between">
                {!layer.url ? (
                  <p className="text-xs font-medium justify-self-end">
                    New Layer
                  </p>
                ) : null}
                <LayerImage layer={layer} />
                <LayerInfo layer={layer} layerIndex={index} />
              </div>
            </div>
          </div>
        ))}
      </CardContent>
      <div>
        <Button
          className="w-full flex gap-2"
          variant={'outline'}
          onClick={() => {
            addLayer({
              id: crypto.randomUUID(),
              url: '',
              height: 0,
              width: 0,
              publicId: '',
              name: '',
              format: '',
            })
          }}
        >
          <span>Create Layer</span>
          <Layers2 className="text-secondary-foreground" size={18} />
        </Button>
      </div>
    </Card>
  )
}
