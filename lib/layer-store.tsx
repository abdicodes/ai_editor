import { createStore } from 'zustand/vanilla'
import { useStore } from 'zustand'
import React from 'react'
import { persist } from 'zustand/middleware'
import { createZustandContext } from './zustand-context'

export type Layer = {
  publicId?: string
  width?: number
  height?: number
  url?: string
  id: string
  name?: string
  format?: string
  poster?: string
  resourceType?: string
  transcriptionURL?: string
}

type State = {
  layers: Layer[]
  addLayer: (later: Layer) => void
  removeLayer: (id: string) => void
  setActiveLayer: (id: string) => void
  activeLayer: Layer
  updateLayer: (layer: Layer) => void
  setPoster: (id: string, posterUrl: string) => void
  setTranscription: (id: string, transcriptionURL: string) => void
  layerComparisonMode: boolean
  setLayerComparisonMode: (mode: boolean) => void
  comparedLayers: string[]
  setComparedLayers: (layers: string[]) => void
  toggleComparedLayer: (id: string) => void
}

const getStore = (initialState: {
  layers: Layer[]
  layerComparisonMode: boolean
}) => {
  return createStore<State>()(
    persist(
      (set) => ({
        layers: initialState.layers,

        addLayer: (layer) =>
          set((state) => ({
            layers: [...state.layers, { ...layer }],
          })),

        removeLayer: (id: string) =>
          set((state) => ({
            layers: state.layers.filter((e) => e.id !== id),
          })),

        setActiveLayer: (id: string) =>
          set((state) => {
            const layer = state.layers.find((e) => e.id === id)
            return {
              activeLayer: layer || state.layers[0], // Fallback to the first layer if not found
            }
          }),

        activeLayer: initialState.layers[0],

        updateLayer: (layer) =>
          set((state) => ({
            layers: state.layers.map((e) => (e.id === layer.id ? layer : e)),
          })),

        setPoster: (id: string, posterUrl: string) =>
          set((state) => ({
            layers: state.layers.map((e) =>
              e.id === id ? { ...e, poster: posterUrl } : e
            ),
          })),

        setTranscription: (id: string, transcriptionURL: string) =>
          set((state) => ({
            layers: state.layers.map((e) =>
              e.id === id ? { ...e, transcriptionURL: transcriptionURL } : e
            ),
          })),

        layerComparisonMode: initialState.layerComparisonMode,

        setLayerComparisonMode: (mode: boolean) =>
          set(() => ({
            layerComparisonMode: mode,
            comparedLayers: mode ? [] : [],
          })),

        comparedLayers: [],

        setComparedLayers: (layers: string[]) =>
          set(() => ({
            comparedLayers: layers,
            layerComparisonMode: layers.length > 0,
          })),

        toggleComparedLayer: (id: string) =>
          set((state) => {
            const newComparedLayers = state.comparedLayers.includes(id)
              ? state.comparedLayers.filter((layerId) => layerId !== id)
              : [...state.comparedLayers, id].slice(-2)
            return {
              comparedLayers: newComparedLayers,
              layerComparisonMode: newComparedLayers.length > 0,
            }
          }),
      }),
      { name: 'layer-storage' }
    )
  )
}

export const LayerStore = createZustandContext(getStore)

export function useLayerStore<T>(selector: (state: State) => T) {
  const store = React.useContext(LayerStore.Context)
  if (!store) {
    throw new Error('Missing layer store provider')
  }
  return useStore(store, selector)
}
