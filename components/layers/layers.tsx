'use client'

import { useLayerStore } from '@/lib/layer-store'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card'

export default function Layers() {
  const layers = useLayerStore((state) => state.layers)
  const { name, width, height } = useLayerStore((state) => state.activeLayer)

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
      <CardContent>
        {layers.map((layer, index) => (
          <div key={layer.id}>
            <div>
              <div>
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
    </Card>
  )
}
