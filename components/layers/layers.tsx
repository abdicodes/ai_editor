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

export default function Layers() {
  const layers = useLayerStore((state) => state.layers)
  const { name, width, height } = useLayerStore((state) => state.activeLayer)
  const generating = useImageStore((state) => state.generating)

  return (
    <Card
      className=" basis-[320px] shrink-0 scrollbar-thin scrollbar-track-secondary
        overflow-y-scroll scrollbar-thumb-primary scrollbar-thumb-rounded-full
        scrollbar-track-rounded-full overflow-x-hidden relative flex flex-col shadow-2xl"
    >
      <CardHeader>
        <div>
          <CardTitle className="text-sm">{name || 'Layers'}</CardTitle>

          {width && height ? (
            <CardDescription>{`${width}x${height}`}</CardDescription>
          ) : null}
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col ">
        {layers.map((layer) => (
          <div
            key={layer.id}
            className={cn(
              'cursor-pointer ease-in-out hover:bg-secondary border border-transparent',
              { 'animate-pulse': generating }
            )}
          >
            <div className="relative p-4 flex items-center">
              <div className="flex gap-2 items-center h-8 w-full justify-between">
                {!layer.url ? (
                  <p className="text-xs font-medium justify-self-end">
                    New Layer
                  </p>
                ) : null}
              </div>
            </div>
          </div>
        ))}
      </CardContent>
      <div>
        <Button className="w-full flex gap-2" variant={'outline'}>
          <span>Create Layer</span>
          <Layers2 className="text-secondary-foreground" size={18} />
        </Button>
      </div>
    </Card>
  )
}
